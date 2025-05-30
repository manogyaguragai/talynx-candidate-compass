import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { rankCandidates } from '../../services/api';
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

  const handleProcessing = async () => {
    if (!canProcess) return;

    const startTime = Date.now();
    
    setProcessing({
      isProcessing: true,
      currentStage: 'upload',
      progress: 0,
      uploadedFiles: uploadedFiles.length,
      timings: { upload: 0, screening: 0, analysis: 0, total: 0 }
    });

    try {
      const uploadStart = Date.now();
      
      const candidates = await rankCandidates({
        job_desc: jobDescription,
        files: uploadedFiles,
      });

      const uploadTime = (Date.now() - uploadStart) / 1000;
      
      setCandidates(candidates);

      const totalTime = (Date.now() - startTime) / 1000;
      const screeningTime = uploadTime * 1.5;
      const analysisTime = totalTime - uploadTime - screeningTime;

      setProcessing({
        isProcessing: false,
        currentStage: 'complete',
        progress: 100,
        uploadedFiles: uploadedFiles.length,
        timings: { 
          upload: parseFloat(uploadTime.toFixed(2)),
          screening: parseFloat(screeningTime.toFixed(2)),
          analysis: parseFloat(analysisTime.toFixed(2)),
          total: parseFloat(totalTime.toFixed(2))
        }
      });
    } catch (error) {
      console.error('Processing error:', error);
      
      setProcessing({
        isProcessing: false,
        currentStage: 'error',
        progress: 0,
        uploadedFiles: uploadedFiles.length,
        timings: { upload: 0, screening: 0, analysis: 0, total: 0 }
      });
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleProcessing}
        disabled={!canProcess}
        className={`inline-flex items-center space-x-3 px-8 py-4 rounded-lg font-medium font-inter text-lg transition-all transform ${
          canProcess 
            ? 'bg-primary hover:bg-blue-600 text-white hover:scale-105 shadow-lg hover:shadow-xl' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        {processing.isProcessing ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : processing.currentStage === 'error' ? (
          <span className="text-red-500">!</span>
        ) : (
          <Play className="w-6 h-6" />
        )}
        <span>
          {processing.currentStage === 'error' 
            ? 'Processing Failed - Try Again' 
            : processing.isProcessing 
              ? 'Processing Candidates...' 
              : 'Start AI Analysis'
          }
        </span>
      </button>
    </div>
  );
};