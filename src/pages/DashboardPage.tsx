
import React from 'react';
import { useAutomation } from '@/context/AutomationContext';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { tasks } = useAutomation();
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Automation Tasks</h1>
          <p className="text-gray-600">
            Manage and run your Python automation tasks
          </p>
        </div>
        
        <Link to="/create">
          <Button className="gap-2">
            <Plus size={18} />
            New Task
          </Button>
        </Link>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
          <p className="text-gray-600 mb-4">
            Create your first automation task to get started
          </p>
          <Link to="/create">
            <Button className="gap-2">
              <Plus size={18} />
              Create Task
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
