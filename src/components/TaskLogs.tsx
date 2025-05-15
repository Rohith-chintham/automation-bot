
import React from 'react';
import { TaskLog } from '@/types/automation';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

interface TaskLogsProps {
  logs: TaskLog[];
}

const TaskLogs: React.FC<TaskLogsProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 border border-dashed rounded-lg">
        No logs available for this task.
      </div>
    );
  }
  
  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };
  
  return (
    <ScrollArea className="h-80 w-full border rounded-lg bg-slate-50">
      <div className="p-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="py-2 flex items-start border-b border-gray-100 last:border-0"
          >
            <div className="mr-3 mt-1">{getLogIcon(log.level)}</div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">
                {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
              </div>
              <div className="text-sm">{log.message}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TaskLogs;
