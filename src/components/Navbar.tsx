
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, LayoutDashboard, Code2 } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-automation-500 to-automation-700 p-2 rounded">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl">PyAutomate</h1>
            <p className="text-xs text-gray-500">Python Automation Bot</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
          <Link to="/create">
            <Button className="gap-2">
              <Plus size={18} />
              <span className="hidden sm:inline">New Task</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
