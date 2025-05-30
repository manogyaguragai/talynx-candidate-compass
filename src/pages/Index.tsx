
import React from 'react';
import { Header } from '../components/Layout/Header';
import { JobDescriptionInput } from '../components/JobDescription/JobDescriptionInput';
import { FileUploadZone } from '../components/FileUpload/FileUploadZone';
import { LoadingScreen } from '../components/Processing/LoadingScreen';
import { ProcessingButton } from '../components/Dashboard/ProcessingButton';
import { TopCandidateSpotlight } from '../components/Results/TopCandidateSpotlight';
import { CandidateTable } from '../components/Results/CandidateTable';
import { CandidateDetailPanel } from '../components/Results/CandidateDetailPanel';
import { useDashboardStore } from '../store/dashboardStore';
import { Sparkles, Users, FileSearch } from 'lucide-react';

const Index = () => {
  const { candidates, processing } = useDashboardStore();

  const showResults = candidates.length > 0 && !processing.isProcessing;
  const showLoading = processing.isProcessing;
  const showInput = !processing.isProcessing && candidates.length === 0;

  // Show loading screen when processing
  if (showLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col w-full">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-success/6 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/4 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-secondary/3 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-secondary/4 to-primary/4 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #2563eb 1px, transparent 1px),
              linear-gradient(to bottom, #2563eb 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Subtle moving particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-secondary/25 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/15 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-secondary/20 rounded-full animate-bounce" style={{ animationDelay: '3s', animationDuration: '4.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {showInput && (
              /* Header Section - Only show on input view */
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full mb-4 animate-scale-in shadow-lg">
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
            )}

            {showResults ? (
              /* Results View */
              <div className="space-y-8 animate-fade-in">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl hover:bg-white/90 transition-all duration-300 animate-scale-in">
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
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl hover:bg-white/90 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
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
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl hover:bg-white/90 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
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
            ) : showInput ? (
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
            ) : null}

            {/* Reset Button for Results */}
            {showResults && (
              <div className="flex justify-center py-6 animate-fade-in">
                <button
                  onClick={() => {
                    const { resetState } = useDashboardStore.getState();
                    resetState();
                  }}
                  className="group inline-flex items-center space-x-2 px-8 py-3 text-sm font-medium font-ibm text-slate-600 bg-white/80 backdrop-blur-sm border-2 border-slate-300/50 rounded-xl hover:bg-white/90 hover:border-primary transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                  <span>Start New Analysis</span>
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-white/60 backdrop-blur-sm border-t border-slate-200/50 px-6 py-6 animate-fade-in relative z-10">
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
      </div>

      {/* Candidate Detail Panel */}
      <CandidateDetailPanel />
    </div>
  );
};

export default Index;
