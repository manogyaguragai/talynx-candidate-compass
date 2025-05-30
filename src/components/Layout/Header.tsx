import React from 'react';
import { Brain } from 'lucide-react';
export const Header: React.FC = () => {
  return <header className="bg-white border-b border-slate-200 px-6 py-[10px]">
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
      </div>
    </header>;
};