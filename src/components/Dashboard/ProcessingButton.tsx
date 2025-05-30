
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { mockCandidates } from '../../services/api';
import { Play, Loader2 } from 'lucide-react';

export const ProcessingButton: React.FC = () => {
  const { 
    jobDescription, 
    uploadedFiles, 
    processing, 
    setProcessing, 
    setCandidates 
  } = useDashboardStore();

  const canProcess = jobDescription.length >= 500 && uploadedFiles.length > 0 && !processing.isProcessing;

  const simulateProcessing = async () => {
    if (!canProcess) return;

    // Start processing with file count
    setProcessing({
      isProcessing: true,
      currentStage: 'upload',
      progress: 0,
      uploadedFiles: uploadedFiles.length,
      timings: { upload: 0, screening: 0, analysis: 0, total: 0 }
    });

    // Simulate longer processing time to show the loading stages
    await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds total

    // Complete processing
    setCandidates(mockCandidates);
    setProcessing({
      isProcessing: false,
      currentStage: 'complete',
      progress: 100,
      uploadedFiles: uploadedFiles.length,
      timings: { upload: 1.2, screening: 3.2, analysis: 28.7, total: 34.4 }
    });
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={simulateProcessing}
        disabled={!canProcess}
        className={`inline-flex items-center space-x-3 px-8 py-4 rounded-lg font-medium font-inter text-lg transition-all transform ${
          canProcess 
            ? 'bg-primary hover:bg-blue-600 text-white hover:scale-105 shadow-lg hover:shadow-xl' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {processing.isProcessing ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Play className="w-6 h-6" />
        )}
        <span>
          {processing.isProcessing 
            ? 'Processing Candidates...' 
            : 'Start AI Analysis'
          }
        </span>
      </button>
    </div>
  );
};
