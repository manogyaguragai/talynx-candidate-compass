
import React from 'react';
import { Header } from '../components/Layout/Header';
import { JobDescriptionInput } from '../components/JobDescription/JobDescriptionInput';
import { FileUploadZone } from '../components/FileUpload/FileUploadZone';
import { ProcessingPipeline } from '../components/Processing/ProcessingPipeline';
import { ProcessingButton } from '../components/Dashboard/ProcessingButton';
import { TopCandidateSpotlight } from '../components/Results/TopCandidateSpotlight';
import { CandidateTable } from '../components/Results/CandidateTable';
import { CandidateDetailPanel } from '../components/Results/CandidateDetailPanel';
import { useDashboardStore } from '../store/dashboardStore';
import { Sparkles, Users, FileSearch } from 'lucide-react';

const Index = () => {
  const { candidates, processing } = useDashboardStore();

  const showResults = candidates.length > 0 || processing.currentStage === 'complete';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col w-full">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4 animate-scale-in">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary font-ibm">AI-Powered Talent Discovery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-inter text-slate-900 mb-4 animate-slide-in-right">
              Resume Screening
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Reimagined</span>
            </h1>
            <p className="text-xl text-slate-600 font-ibm max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Upload resumes and get intelligent candidate rankings powered by advanced AI analysis. 
              Find the perfect match for your team in seconds, not hours.
            </p>
          </div>

          {/* Processing Pipeline */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ProcessingPipeline />
          </div>

          {showResults ? (
            /* Results View */
            <div className="space-y-8 animate-fade-in">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow animate-scale-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-fira text-slate-900">{candidates.length}</p>
                      <p className="text-sm text-slate-500 font-ibm">Candidates Analyzed</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                      <FileSearch className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-fira text-slate-900">
                        {candidates.filter(c => c.fitScore >= 80).length}
                      </p>
                      <p className="text-sm text-slate-500 font-ibm">High Match Candidates</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-fira text-slate-900">
                        {processing.timings.total > 0 ? `${processing.timings.total}s` : '--'}
                      </p>
                      <p className="text-sm text-slate-500 font-ibm">Processing Time</p>
                    </div>
                  </div>
                </div>
              </div>

              <TopCandidateSpotlight />
              <CandidateTable />
            </div>
          ) : (
            /* Input View */
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="animate-slide-in-right">
                  <JobDescriptionInput />
                </div>
                <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                  <FileUploadZone />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center py-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <ProcessingButton />
              </div>
            </div>
          )}

          {/* Reset Button for Results */}
          {showResults && (
            <div className="flex justify-center py-6 animate-fade-in">
              <button
                onClick={() => {
                  const { resetState } = useDashboardStore.getState();
                  resetState();
                }}
                className="group inline-flex items-center space-x-2 px-8 py-3 text-sm font-medium font-ibm text-slate-600 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-primary transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                <span>Start New Analysis</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 px-6 py-6 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 font-ibm space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span>© 2024 Talynx AI-Powered HR System</span>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <span className="text-primary font-medium">Powered by Advanced AI</span>
            </div>
            <div className="flex items-center space-x-6">
              {processing.timings.total > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Last processing: {processing.timings.total}s</span>
                </div>
              )}
              {candidates.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>{candidates.length} candidates analyzed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Candidate Detail Panel */}
      <CandidateDetailPanel />
    </div>
  );
};

export default Index;
