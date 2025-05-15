
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Wand2, Layout, Zap, Bot } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-automation-500 to-automation-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-4">
              <Code2 className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Python Automation Bot
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
            Create, manage, and run Python automation tasks with a beautiful interface
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="default" className="bg-white text-automation-700 hover:bg-white/90">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Create New Task
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-secondary p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-automation-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Python Powered</h3>
              <p className="text-gray-600">
                Write and execute Python scripts directly from your browser with a clean code editor interface.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-secondary p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-automation-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Dashboard</h3>
              <p className="text-gray-600">
                Monitor all your automation tasks in a central dashboard with status updates and execution logs.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-secondary p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-automation-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Templates</h3>
              <p className="text-gray-600">
                Start quickly with pre-built templates for common automation tasks like file management or web scraping.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-secondary p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-automation-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Execution</h3>
              <p className="text-gray-600">
                Run tasks instantly with a single click and see real-time execution status and results.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-secondary p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-automation-600">
                  <path d="M12 6V2h4v4M20 6h-4m4 14v-6m0 6h-4M4 10v4M12 22v-4m0 4H8M22 10v4m-8 0h4m-4 0V6M12 2h4M2 10h4m-4 0h-.01M6 22H2v-4M2 18v-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Logs</h3>
              <p className="text-gray-600">
                Track every step of your automation with comprehensive execution logs and error reporting.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-secondary p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-automation-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scheduled Tasks</h3>
              <p className="text-gray-600">
                Set up recurring automations using cron expressions to run tasks on your desired schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to automate with Python?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get started now and save hours with automated Python tasks.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-automation-600 hover:bg-automation-700">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
