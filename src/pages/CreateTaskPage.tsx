
import React from 'react';
import CreateTaskForm from '@/components/CreateTaskForm';

const CreateTaskPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Create New Task</h1>
      <p className="text-gray-600 mb-6">
        Set up a new Python automation task
      </p>
      
      <CreateTaskForm />
    </div>
  );
};

export default CreateTaskPage;
