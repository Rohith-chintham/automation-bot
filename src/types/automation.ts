
export interface AutomationTask {
  id: string;
  name: string;
  description: string;
  code: string;
  status: 'idle' | 'running' | 'success' | 'error';
  lastRun?: string;
  lastRunDuration?: number;
  schedule?: string;
  logs: TaskLog[];
  createdAt: string;
}

export interface TaskLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  category: string;
}
