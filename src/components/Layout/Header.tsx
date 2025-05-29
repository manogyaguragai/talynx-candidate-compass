
import React from 'react';
import { Brain, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-inter text-slate-900">Talynx</h1>
            <p className="text-sm text-slate-500 font-ibm">AI-Powered HR System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
      </div>
    </header>
  );
};
