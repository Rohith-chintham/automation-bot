
import React, { useState } from 'react';
import { useAutomation } from '@/context/AutomationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CodeEditor from './CodeEditor';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Wand } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateTaskForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('# Write your Python automation code here\n\n');
  const [schedule, setSchedule] = useState('');
  const { addTask, templates } = useAutomation();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTask({
      name,
      description,
      code,
      status: 'idle',
      schedule: schedule || undefined,
    });
    
    navigate('/');
  };
  
  const handleTemplateSelect = (templateCode: string) => {
    setCode(templateCode);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="gap-1"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Tasks
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Wand className="w-4 h-4" />
              Use Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Choose a Template</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => handleTemplateSelect(template.code)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule (Optional)</Label>
            <Input
              id="schedule"
              placeholder="Cron expression (e.g., 0 9 * * *)"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Format: min hour day month weekday
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what this task does"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="code">Python Code</Label>
          <CodeEditor code={code} onChange={setCode} />
          <p className="text-xs text-gray-500">
            Write Python code that will be executed when this task runs.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Save className="w-4 h-4" />
            Save Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
