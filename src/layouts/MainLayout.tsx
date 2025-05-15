
import React from 'react';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="py-6 px-4 border-t text-center text-gray-500 text-sm">
        <div className="container mx-auto">
          PyAutomate &copy; {new Date().getFullYear()} - Python Automation Tool
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
