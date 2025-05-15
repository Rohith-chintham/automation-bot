
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AutomationTask, TaskTemplate } from '../types/automation';
import { sampleTasks, taskTemplates } from '../data/sampleTasks';
import { useToast } from '@/components/ui/use-toast';

interface AutomationContextType {
  tasks: AutomationTask[];
  templates: TaskTemplate[];
  addTask: (task: Omit<AutomationTask, 'id' | 'createdAt' | 'logs'>) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<AutomationTask>) => void;
  runTask: (id: string) => void;
  stopTask: (id: string) => void;
  getTaskById: (id: string) => AutomationTask | undefined;
}

const AutomationContext = createContext<AutomationContextType | undefined>(undefined);

export const AutomationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<AutomationTask[]>(sampleTasks);
  const [templates] = useState<TaskTemplate[]>(taskTemplates);
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addTask = (task: Omit<AutomationTask, 'id' | 'createdAt' | 'logs'>) => {
    const newTask: AutomationTask = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      logs: [],
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Task created",
      description: `${task.name} has been added to your tasks.`,
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `${taskToDelete.name} has been removed.`,
      });
    }
  };

  const updateTask = (id: string, updates: Partial<AutomationTask>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const addLogToTask = (
    taskId: string, 
    level: 'info' | 'warning' | 'error' | 'success', 
    message: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              logs: [
                ...task.logs,
                {
                  id: generateId(),
                  timestamp: new Date().toISOString(),
                  level,
                  message,
                },
              ],
            }
          : task
      )
    );
  };

  const runTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Set task to running state
    updateTask(id, { status: 'running' });
    addLogToTask(id, 'info', 'Task execution started');
    
    // Simulate Python code execution
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        updateTask(id, { 
          status: 'success',
          lastRun: new Date().toISOString(),
          lastRunDuration: Math.random() * 10 + 2 // Random duration between 2-12 seconds
        });
        addLogToTask(id, 'success', 'Task completed successfully');
        
        toast({
          title: "Task completed",
          description: `${task.name} ran successfully.`,
        });
      } else {
        updateTask(id, { 
          status: 'error',
          lastRun: new Date().toISOString(),
          lastRunDuration: Math.random() * 5 + 1
        });
        addLogToTask(id, 'error', 'Error: Execution failed (simulated error)');
        
        toast({
          title: "Task failed",
          description: `${task.name} encountered an error.`,
          variant: "destructive"
        });
      }
    }, 3000); // Simulate a 3-second execution
  };

  const stopTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    updateTask(id, { status: 'idle' });
    addLogToTask(id, 'warning', 'Task execution stopped by user');
    
    toast({
      title: "Task stopped",
      description: `${task.name} was stopped.`,
    });
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <AutomationContext.Provider
      value={{
        tasks,
        templates,
        addTask,
        deleteTask,
        updateTask,
        runTask,
        stopTask,
        getTaskById,
      }}
    >
      {children}
    </AutomationContext.Provider>
  );
};

export const useAutomation = () => {
  const context = useContext(AutomationContext);
  if (context === undefined) {
    throw new Error('useAutomation must be used within an AutomationProvider');
  }
  return context;
};
