
import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { FileText, Brain, Sparkles } from 'lucide-react';

const LOADING_STAGES = [
  {
    id: 'parsing',
    title: 'Parsing Each Resume',
    description: 'Extracting text and structure from uploaded documents',
    duration: 3000,
  },
  {
    id: 'skills',
    title: 'Extracting Hard and Soft Skills',
    description: 'Identifying technical competencies and interpersonal abilities',
    duration: 3500,
  },
  {
    id: 'requirements',
    title: 'Understanding Job Requirements',
    description: 'Analyzing role expectations and required qualifications',
    duration: 2800,
  },
  {
    id: 'ai',
    title: 'Asking AI for Help',
    description: 'Leveraging machine learning for intelligent matching',
    duration: 4000,
  },
  {
    id: 'ranking',
    title: 'Ranking Candidates',
    description: 'Calculating fit scores and generating recommendations',
    duration: 3200,
  }
];

const PROCESS_STEPS = [
  {
    id: 'initial-rank',
    title: 'Initial AI Ranking',
    description: 'First AI model ranks top 10 candidates from the entire pool',
  },
  {
    id: 'llm-analysis',
    title: 'Advanced LLM Analysis',
    description: 'Second LLM performs deep analysis and computes precise fit scores',
  },
  {
    id: 'final-ranking',
    title: 'Final Ranking',
    description: 'Candidates ranked by comprehensive fit scores and recommendations',
  }
];

export const LoadingScreen: React.FC = () => {
  const { processing, candidates } = useDashboardStore();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!processing.isProcessing) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentStageIndex(prev => (prev + 1) % LOADING_STAGES.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [processing.isProcessing]);

  // Timeline progress animation - continuous loop
  useEffect(() => {
    if (!processing.isProcessing) return;

    const progressInterval = setInterval(() => {
      setTimelineProgress(prev => {
        const newProgress = prev + 0.5;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [processing.isProcessing]);

  // Reset when processing starts
  useEffect(() => {
    if (processing.isProcessing && processing.currentStage === 'upload') {
      setCurrentStageIndex(0);
      setTimelineProgress(0);
      setIsTransitioning(false);
    }
  }, [processing.isProcessing, processing.currentStage]);

  if (!processing.isProcessing || candidates.length > 0) {
    return null;
  }

  const currentStage = LOADING_STAGES[currentStageIndex];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0">
        {/* Subtle floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/6 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-24 h-24 bg-purple-500/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-secondary/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-primary/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Large gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-secondary/3 to-blue-500/3 rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Current Stage - Large Display */}
        <div className="mb-16 relative">
          <div className={`bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto transition-all duration-700 ${
            isTransitioning 
              ? 'transform scale-95 opacity-80' 
              : 'transform scale-100 opacity-100'
          }`}>
            <div className="text-center mb-6">
              <h1 className={`text-3xl font-bold font-inter text-slate-900 mb-3 transition-all duration-500 ${
                isTransitioning ? 'opacity-70' : 'opacity-100'
              }`}>{currentStage.title}</h1>
              <p className={`text-lg text-slate-600 font-ibm transition-all duration-500 ${
                isTransitioning ? 'opacity-60' : 'opacity-100'
              }`}>{currentStage.description}</p>
            </div>
            
            {/* Simple loading indicator */}
            <div className="flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ 
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Timeline Process Flow */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold font-inter text-slate-900 mb-12">How We Process Your Resumes</h2>
          
          {/* Timeline Container with proper spacing */}
          <div className="relative max-w-4xl mx-auto px-8">
            {/* Main Timeline Line */}
            <div className="absolute top-20 left-16 right-16 h-0.5 bg-slate-300 rounded-full">
              {/* Animated Progress Line */}
              <div 
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-300 relative"
                style={{ width: `${timelineProgress}%` }}
              >
                {/* Moving dot */}
                <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-white rounded-full shadow-md border-2 border-primary"></div>
              </div>
            </div>

            {/* Timeline Steps - Clean and spaced */}
            <div className="relative flex justify-between items-start">
              {PROCESS_STEPS.map((step, index) => {
                const currentPosition = (timelineProgress / 100) * 2; // Convert to 0-2 range
                const stepPosition = index; // 0, 1, 2
                const isActive = Math.abs(currentPosition - stepPosition) < 0.3;
                
                return (
                  <div 
                    key={step.id} 
                    className="flex flex-col items-center relative w-1/3 px-4"
                  >
                    {/* Timeline Point */}
                    <div className={`relative z-10 w-8 h-8 rounded-full border-3 flex items-center justify-center mb-8 transition-all duration-500 ${
                      isActive 
                        ? 'bg-primary border-primary scale-125 shadow-lg' 
                        : 'bg-white border-slate-300'
                    }`}>
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-white' : 'bg-slate-400'
                      }`}></div>
                      
                      {/* Pulsing ring for active step */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40"></div>
                      )}
                    </div>
                    
                    {/* Step Card - Clean design */}
                    <div className={`bg-white rounded-xl p-6 shadow-md border transition-all duration-500 w-full max-w-xs ${
                      isActive 
                        ? 'border-primary shadow-lg transform scale-105' 
                        : 'border-slate-200'
                    }`}>
                      <div className="text-center">
                        <h3 className={`text-lg font-bold font-inter mb-3 transition-all duration-500 ${
                          isActive ? 'text-slate-900' : 'text-slate-700'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm font-ibm leading-relaxed transition-all duration-500 ${
                          isActive ? 'text-slate-600' : 'text-slate-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats - Clean design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold font-fira text-slate-900">{processing.uploadedFiles || 0}</p>
                <p className="text-sm text-slate-500 font-ibm">Resumes Uploaded</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-bold font-fira text-slate-900">2</p>
                <p className="text-sm text-slate-500 font-ibm">AI Models Used</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold font-fira text-slate-900">AI</p>
                <p className="text-sm text-slate-500 font-ibm">Powered Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clean info tip */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-600 font-ibm">
              💡 Our dual-AI approach first identifies the top 10 candidates from your entire pool, then uses advanced LLM analysis to compute precise fit scores and generate detailed insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
