
import React, { useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { Upload, Search, Brain, CheckCircle, Clock } from 'lucide-react';

const STAGES = [
  {
    id: 'upload',
    icon: Upload,
    label: 'File Upload',
    description: 'Processing uploaded resumes'
  },
  {
    id: 'screening',
    icon: Search,
    label: 'Initial Screening',
    description: 'Extracting candidate information'
  },
  {
    id: 'analysis',
    icon: Brain,
    label: 'LLM Analysis',
    description: 'AI-powered skill matching'
  },
  {
    id: 'complete',
    icon: CheckCircle,
    label: 'Results Ready',
    description: 'Ranking complete'
  }
];

export const ProcessingPipeline: React.FC = () => {
  const { processing } = useDashboardStore();

  const getStageStatus = (stageId: string) => {
    const stageIndex = STAGES.findIndex(s => s.id === stageId);
    const currentIndex = STAGES.findIndex(s => s.id === processing.currentStage);
    
    if (stageIndex < currentIndex) return 'complete';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  if (!processing.isProcessing && processing.currentStage === 'upload') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-inter text-slate-900">Processing Pipeline</h2>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-fira text-slate-600">
            {processing.timings.total > 0 ? `${processing.timings.total.toFixed(1)}s` : 'Processing...'}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${processing.progress}%` }}
          />
        </div>

        {/* Stages */}
        <div className="flex justify-between">
          {STAGES.map((stage, index) => {
            const status = getStageStatus(stage.id);
            const StageIcon = stage.icon;
            
            return (
              <div key={stage.id} className="flex flex-col items-center relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  status === 'complete' 
                    ? 'bg-success border-success text-white' 
                    : status === 'active'
                    ? 'bg-primary border-primary text-white animate-pulse'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  <StageIcon className="w-5 h-5" />
                </div>
                
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium font-inter text-slate-900">{stage.label}</p>
                  <p className="text-xs text-slate-500 font-ibm">{stage.description}</p>
                  
                  {status === 'complete' && processing.timings[stage.id as keyof typeof processing.timings] > 0 && (
                    <p className="text-xs font-fira text-success mt-1">
                      {processing.timings[stage.id as keyof typeof processing.timings].toFixed(1)}s
                    </p>
                  )}
                  
                  {status === 'active' && (
                    <div className="flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {processing.isProcessing && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-ibm text-primary">
              Processing {processing.currentStage}... This may take a few minutes.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
