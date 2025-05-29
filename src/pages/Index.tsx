
import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { JobDescriptionInput } from '../components/JobDescription/JobDescriptionInput';
import { FileUploadZone } from '../components/FileUpload/FileUploadZone';
import { ProcessingPipeline } from '../components/Processing/ProcessingPipeline';
import { ProcessingButton } from '../components/Dashboard/ProcessingButton';
import { TopCandidateSpotlight } from '../components/Results/TopCandidateSpotlight';
import { CandidateTable } from '../components/Results/CandidateTable';
import { CandidateDetailPanel } from '../components/Results/CandidateDetailPanel';
import { useDashboardStore } from '../store/dashboardStore';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { candidates, processing } = useDashboardStore();

  const showResults = candidates.length > 0 || processing.currentStage === 'complete';

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-inter text-slate-900 mb-2">
                AI-Powered Resume Screening
              </h1>
              <p className="text-lg text-slate-600 font-ibm">
                Upload resumes and get intelligent candidate rankings powered by advanced AI analysis
              </p>
            </div>

            {/* Processing Pipeline */}
            <ProcessingPipeline />

            {showResults ? (
              /* Results View */
              <div className="space-y-6">
                <TopCandidateSpotlight />
                <CandidateTable />
              </div>
            ) : (
              /* Input View */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <JobDescriptionInput />
                <FileUploadZone />
              </div>
            )}

            {/* Action Button */}
            {!showResults && (
              <div className="py-8">
                <ProcessingButton />
              </div>
            )}

            {/* Reset Button for Results */}
            {showResults && (
              <div className="flex justify-center py-4">
                <button
                  onClick={() => {
                    const { resetState } = useDashboardStore.getState();
                    resetState();
                  }}
                  className="px-6 py-2 text-sm font-medium font-ibm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Start New Analysis
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-500 font-ibm">
            <span>© 2024 Talynx AI-Powered HR System</span>
            <div className="flex items-center space-x-4">
              {processing.timings.total > 0 && (
                <span>Last processing: {processing.timings.total}s</span>
              )}
              {candidates.length > 0 && (
                <span>{candidates.length} candidates analyzed</span>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Candidate Detail Panel */}
      <CandidateDetailPanel />
    </div>
  );
};

export default Index;
