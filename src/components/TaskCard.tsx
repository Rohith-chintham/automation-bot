
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AutomationTask } from '@/types/automation';
import { formatDistanceToNow } from 'date-fns';
import { Play, Square, Trash2, InfoIcon } from 'lucide-react';
import { useAutomation } from '@/context/AutomationContext';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: AutomationTask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { runTask, stopTask, deleteTask } = useAutomation();
  const navigate = useNavigate();
  
  const statusColors = {
    idle: 'bg-gray-200 text-gray-800',
    running: 'bg-blue-100 text-blue-800 animate-pulse-light',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };
  
  const handleRunClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    runTask(task.id);
  };
  
  const handleStopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopTask(task.id);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };
  
  const handleCardClick = () => {
    navigate(`/task/${task.id}`);
  };
  
  return (
    <Card 
      className="automation-card cursor-pointer h-full flex flex-col" 
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="font-medium text-lg">{task.name}</CardTitle>
          <Badge className={statusColors[task.status]}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-gray-600">{task.description}</p>
        
        {task.lastRun && (
          <div className="mt-3 flex items-center text-xs text-gray-500">
            <InfoIcon size={14} className="mr-1" />
            Last run: {formatDistanceToNow(new Date(task.lastRun), { addSuffix: true })}
            {task.lastRunDuration && ` (${task.lastRunDuration.toFixed(1)}s)`}
          </div>
        )}
        
        {task.schedule && (
          <div className="mt-1 text-xs text-gray-500">
            Schedule: {task.schedule}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-end gap-2">
        {task.status === 'running' ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStopClick}
          >
            <Square size={16} className="mr-1" />
            Stop
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRunClick}
          >
            <Play size={16} className="mr-1" />
            Run
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleDeleteClick}
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
