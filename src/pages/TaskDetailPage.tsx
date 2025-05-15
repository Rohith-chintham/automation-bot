
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAutomation } from '@/context/AutomationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeEditor from '@/components/CodeEditor';
import TaskLogs from '@/components/TaskLogs';
import { formatDistanceToNow, format } from 'date-fns';
import { ChevronLeft, Play, Square, Calendar, Clock, AlarmClock } from 'lucide-react';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, runTask, stopTask } = useAutomation();
  
  const task = getTaskById(id || '');
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Task not found</h2>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  const statusColors = {
    idle: 'bg-gray-200 text-gray-800',
    running: 'bg-blue-100 text-blue-800 animate-pulse-light',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };
  
  const handleRunClick = () => {
    runTask(task.id);
  };
  
  const handleStopClick = () => {
    stopTask(task.id);
  };
  
  return (
    <div className="animate-fade-in">
      <Button
        variant="ghost"
        className="gap-1 mb-6"
        onClick={() => navigate('/')}
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Tasks
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{task.name}</h1>
            <Badge className={statusColors[task.status]}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-600">{task.description}</p>
        </div>
        
        <div>
          {task.status === 'running' ? (
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={handleStopClick}
            >
              <Square className="w-4 h-4" />
              Stop Task
            </Button>
          ) : (
            <Button
              size="lg"
              className="gap-2"
              onClick={handleRunClick}
            >
              <Play className="w-4 h-4" />
              Run Task
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 border rounded-lg bg-slate-50 flex items-center gap-3">
          <Calendar className="text-automation-500 w-5 h-5" />
          <div>
            <div className="text-sm text-gray-500">Created</div>
            <div className="font-medium">
              {format(new Date(task.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
        
        {task.lastRun && (
          <div className="p-4 border rounded-lg bg-slate-50 flex items-center gap-3">
            <Clock className="text-automation-500 w-5 h-5" />
            <div>
              <div className="text-sm text-gray-500">Last Run</div>
              <div className="font-medium">
                {formatDistanceToNow(new Date(task.lastRun), { addSuffix: true })}
              </div>
            </div>
          </div>
        )}
        
        {task.schedule && (
          <div className="p-4 border rounded-lg bg-slate-50 flex items-center gap-3">
            <AlarmClock className="text-automation-500 w-5 h-5" />
            <div>
              <div className="text-sm text-gray-500">Schedule</div>
              <div className="font-medium">{task.schedule}</div>
            </div>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="logs">Execution Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="mt-6">
          <CodeEditor code={task.code} readonly />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-6">
          <TaskLogs logs={task.logs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskDetailPage;
