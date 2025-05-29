
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { Star, Mail, Phone, MessageSquare, Trophy, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export const TopCandidateSpotlight: React.FC = () => {
  const { candidates } = useDashboardStore();
  
  if (candidates.length === 0) {
    return null;
  }

  const topCandidate = candidates[0];

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-2xl text-white p-8 mb-8 overflow-hidden animate-fade-in">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 animate-slide-in-right">
            <div className="relative">
              <Trophy className="w-8 h-8 text-yellow-300 animate-bounce" />
              <Sparkles className="w-4 h-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold font-inter">Top Candidate</h2>
          </div>
          <div className="flex items-center space-x-2 animate-scale-in">
            <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
            <span className="text-2xl font-bold font-fira">{topCandidate.fitScore}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Candidate Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <h3 className="text-3xl font-bold font-inter mb-2">{topCandidate.name}</h3>
              <p className="text-blue-100 font-ibm text-lg leading-relaxed">{topCandidate.summary}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-inter text-blue-100 mb-1">Education</p>
                    <p className="text-sm font-ibm">{topCandidate.education_highlights}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-inter text-blue-100 mb-1">Experience</p>
                    <p className="text-sm font-ibm">{topCandidate.experience_highlights}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm font-semibold font-inter text-blue-100 mb-3">Key Skills</p>
              <div className="flex flex-wrap gap-2">
                {topCandidate.skills.exact_matches.slice(0, 8).map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-ibm hover:bg-white/30 transition-all hover:scale-105 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
                {topCandidate.skills.exact_matches.length > 8 && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-ibm hover:bg-white/30 transition-all">
                    +{topCandidate.skills.exact_matches.length - 8} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions & Metrics */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300 animate-scale-in">
              <p className="text-sm font-semibold font-inter text-blue-100 mb-4">Match Metrics</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center group">
                  <span className="text-sm font-ibm">Fit Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-1000"
                        style={{ width: `${topCandidate.fitScore}%` }}
                      />
                    </div>
                    <span className="font-bold font-fira text-yellow-300">{topCandidate.fitScore}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-ibm">Similarity</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-300 to-blue-500 transition-all duration-1000"
                        style={{ width: `${topCandidate.overall_similarity * 100}%` }}
                      />
                    </div>
                    <span className="font-bold font-fira">{Math.round(topCandidate.overall_similarity * 100)}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-ibm">LLM Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-300 to-purple-500 transition-all duration-1000"
                        style={{ width: `${topCandidate.llm_fit_score}%` }}
                      />
                    </div>
                    <span className="font-bold font-fira text-purple-300">{topCandidate.llm_fit_score}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href={`mailto:${topCandidate.email}`}
                className="w-full flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-105 rounded-xl py-3 px-4 group animate-slide-in-right"
                style={{ animationDelay: '0.1s' }}
              >
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span className="text-sm font-medium font-ibm">Send Email</span>
              </a>
              
              <a 
                href={`tel:${topCandidate.mobile_number}`}
                className="w-full flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-105 rounded-xl py-3 px-4 group animate-slide-in-right"
                style={{ animationDelay: '0.2s' }}
              >
                <Phone className="w-5 h-5 group-hover:animate-bounce" />
                <span className="text-sm font-medium font-ibm">Call Now</span>
              </a>
              
              <a 
                href={`sms:${topCandidate.mobile_number}`}
                className="w-full flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-105 rounded-xl py-3 px-4 group animate-slide-in-right"
                style={{ animationDelay: '0.3s' }}
              >
                <MessageSquare className="w-5 h-5 group-hover:animate-bounce" />
                <span className="text-sm font-medium font-ibm">Send SMS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
