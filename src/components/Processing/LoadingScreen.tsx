
import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { FileText, Brain, Search, Sparkles, Users, CheckCircle, Clock, ArrowRight, Trophy, Zap } from 'lucide-react';

const LOADING_STAGES = [
  {
    id: 'parsing',
    icon: FileText,
    title: 'Parsing Each Resume',
    description: 'Extracting text and structure from uploaded documents',
    duration: 3000,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'skills',
    icon: Search,
    title: 'Extracting Hard and Soft Skills',
    description: 'Identifying technical competencies and interpersonal abilities',
    duration: 3500,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'requirements',
    icon: Brain,
    title: 'Understanding Job Requirements',
    description: 'Analyzing role expectations and required qualifications',
    duration: 2800,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 'ai',
    icon: Sparkles,
    title: 'Asking AI for Help',
    description: 'Leveraging machine learning for intelligent matching',
    duration: 4000,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    id: 'ranking',
    icon: Users,
    title: 'Ranking Candidates',
    description: 'Calculating fit scores and generating recommendations',
    duration: 3200,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  }
];

const PROCESS_STEPS = [
  {
    id: 'initial-rank',
    icon: Trophy,
    title: 'Initial AI Ranking',
    description: 'First AI model ranks top 10 candidates from the entire pool',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    position: 20
  },
  {
    id: 'llm-analysis',
    icon: Brain,
    title: 'Advanced LLM Analysis',
    description: 'Second LLM performs deep analysis and computes precise fit scores',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    position: 50
  },
  {
    id: 'final-ranking',
    icon: Zap,
    title: 'Final Ranking',
    description: 'Candidates ranked by comprehensive fit scores and recommendations',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    position: 80
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

  // Timeline progress animation
  useEffect(() => {
    if (!processing.isProcessing) return;

    const progressInterval = setInterval(() => {
      setTimelineProgress(prev => {
        const newProgress = prev + 1;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 80);

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
        {/* Multiple floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-500/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-yellow-500/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Large gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/4 to-purple-500/4 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-green-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
        
        {/* Moving particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce`}
            style={{
              top: `${20 + (i * 8)}%`,
              left: `${15 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Current Stage - Large Display */}
        <div className="mb-20 relative">
          <div className={`bg-white rounded-3xl shadow-xl border border-slate-200 p-12 max-w-3xl mx-auto transition-all duration-700 ${
            isTransitioning 
              ? 'transform scale-95 opacity-80 translate-y-4' 
              : 'transform scale-105 opacity-100 translate-y-0'
          }`}>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className={`w-20 h-20 ${currentStage.bgColor} rounded-3xl flex items-center justify-center shadow-lg transition-all duration-700 ${
                isTransitioning ? 'scale-90 rotate-12' : 'scale-110 rotate-0 animate-pulse'
              }`}>
                <currentStage.icon className={`w-10 h-10 ${currentStage.color} transition-all duration-500 ${
                  isTransitioning ? 'scale-75' : 'scale-110'
                }`} />
              </div>
              <div className="text-left">
                <h1 className={`text-4xl font-bold font-inter text-slate-900 mb-2 transition-all duration-500 ${
                  isTransitioning ? 'opacity-70 translate-x-2' : 'opacity-100 translate-x-0'
                }`}>{currentStage.title}</h1>
                <p className={`text-xl text-slate-600 font-ibm transition-all duration-500 ${
                  isTransitioning ? 'opacity-60 translate-x-1' : 'opacity-100 translate-x-0'
                }`}>{currentStage.description}</p>
              </div>
            </div>
            
            {/* Animated dots to show progress */}
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 bg-primary rounded-full transition-all duration-300 ${
                    isTransitioning ? 'animate-none opacity-50' : 'animate-pulse'
                  }`}
                  style={{ 
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Timeline Process Flow */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-inter text-slate-900 mb-12">How We Process Your Resumes</h2>
          
          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Timeline Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-slate-200 rounded-full">
              {/* Animated Progress Line */}
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${timelineProgress}%` }}
              >
                {/* Moving Sparkle */}
                <div className="absolute -right-2 -top-1 w-3 h-3 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="relative flex justify-between items-start">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = timelineProgress >= step.position - 10 && timelineProgress <= step.position + 10;
                const isPassed = timelineProgress > step.position + 10;
                
                return (
                  <div 
                    key={step.id} 
                    className="flex flex-col items-center relative"
                    style={{ width: '30%' }}
                  >
                    {/* Timeline Point */}
                    <div className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center mb-6 transition-all duration-500 ${
                      isPassed 
                        ? 'bg-green-500 border-green-500 scale-110' 
                        : isActive 
                          ? 'bg-white border-primary scale-125 shadow-lg animate-pulse' 
                          : 'bg-white border-slate-300'
                    }`}>
                      {isPassed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 transition-all duration-500 ${
                          isActive ? step.color + ' scale-110' : 'text-slate-400'
                        }`} />
                      )}
                      
                      {/* Pulsing Ring for Active Step */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75"></div>
                      )}
                    </div>
                    
                    {/* Step Card */}
                    <div className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-500 w-full max-w-xs ${
                      isActive 
                        ? 'border-primary scale-105 shadow-xl' 
                        : isPassed
                          ? 'border-green-200 bg-green-50'
                          : 'border-slate-200'
                    }`}>
                      <div className="text-center">
                        <h3 className={`text-lg font-bold font-inter mb-2 transition-all duration-500 ${
                          isPassed 
                            ? 'text-green-700' 
                            : isActive 
                              ? 'text-slate-900' 
                              : 'text-slate-600'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm font-ibm leading-relaxed transition-all duration-500 ${
                          isPassed 
                            ? 'text-green-600' 
                            : isActive 
                              ? 'text-slate-700' 
                              : 'text-slate-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Active indicator glow */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 animate-pulse pointer-events-none"></div>
                      )}
                    </div>
                    
                    {/* Floating particles for active step */}
                    {isActive && (
                      <>
                        <div className="absolute top-2 left-1/2 w-2 h-2 bg-primary/40 rounded-full animate-ping"></div>
                        <div className="absolute top-4 right-1/4 w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-green-500/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className={`bg-white rounded-xl p-6 border border-slate-200 shadow-lg transition-all duration-500 ${
            isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-fira text-slate-900">{processing.uploadedFiles || 0}</p>
                <p className="text-sm text-slate-500 font-ibm">Resumes Uploaded</p>
              </div>
            </div>
          </div>
          
          <div className={`bg-white rounded-xl p-6 border border-slate-200 shadow-lg transition-all duration-500 ${
            isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
          }`} style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-fira text-slate-900">2</p>
                <p className="text-sm text-slate-500 font-ibm">AI Models Used</p>
              </div>
            </div>
          </div>
          
          <div className={`bg-white rounded-xl p-6 border border-slate-200 shadow-lg transition-all duration-500 ${
            isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
          }`} style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-fira text-slate-900">AI</p>
                <p className="text-sm text-slate-500 font-ibm">Powered Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun fact or tip */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className={`bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 border border-primary/20 transition-all duration-500 ${
            isTransitioning ? 'opacity-70 scale-98' : 'opacity-100 scale-100'
          }`}>
            <p className="text-sm text-slate-600 font-ibm italic">
              💡 Our dual-AI approach first identifies the top 10 candidates from your entire pool, then uses advanced LLM analysis to compute precise fit scores and generate detailed insights for each candidate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
