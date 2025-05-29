
import React from 'react';
import { Brain, Sun, Moon } from 'lucide-react';
import { useTheme } from '../Theme/ThemeProvider';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-inter text-slate-900 dark:text-white">Talynx</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 font-ibm">AI-Powered HR System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-slate-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
      </div>
    </header>
  );
};
