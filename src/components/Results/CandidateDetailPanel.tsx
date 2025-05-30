import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { X, User, Star, GraduationCap, Briefcase, CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export const CandidateDetailPanel: React.FC = () => {
  const { selectedCandidate, candidates, setSelectedCandidate } = useDashboardStore();
  
  const candidate = candidates.find(c => c.id === selectedCandidate);
  
  if (!candidate) {
    return null;
  }

  return (
    <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader className="animate-fade-in">
          <DialogTitle className="text-2xl font-bold font-inter text-slate-900">
            Candidate Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white animate-slide-in-right">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-scale-in">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-inter">{candidate.name}</h3>
                <p className="text-blue-100 font-ibm">{candidate.id}</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
                <span className="text-2xl font-bold font-fira">{candidate.fitScore.toFixed(1)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                <p className="text-sm font-ibm text-blue-100">Fit Score</p>
                <p className="text-xl font-bold font-fira">{candidate.fitScore.toFixed(1)}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                <p className="text-sm font-ibm text-blue-100">Similarity</p>
                <p className="text-xl font-bold font-fira">{(candidate.overall_similarity * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                <p className="text-sm font-ibm text-blue-100">LLM Score</p>
                <p className="text-xl font-bold font-fira">{candidate.llm_fit_score.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <a 
              href={`mailto:${candidate.email}`}
              className="flex items-center justify-center space-x-2 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium font-ibm">Send Email</span>
            </a>
            <a 
              href={`tel:${candidate.mobile_number}`}
              className="flex items-center justify-center space-x-2 bg-success text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium font-ibm">Call Now</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
                <h4 className="text-lg font-semibold font-inter text-slate-900 mb-3">Summary</h4>
                <p className="text-slate-600 font-ibm leading-relaxed">{candidate.summary}</p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold font-inter text-slate-900">Education</h4>
                </div>
                <p className="text-slate-600 font-ibm">{candidate.education_highlights}</p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold font-inter text-slate-900">Experience</h4>
                </div>
                <p className="text-slate-600 font-ibm">{candidate.experience_highlights}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
                <h4 className="text-lg font-semibold font-inter text-slate-900 mb-4">Skills Analysis</h4>
                
                <div className="space-y-4">
                  <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium font-inter text-success">
                        Exact Matches ({candidate.skills.exact_matches.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.exact_matches.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-success/10 text-success text-sm rounded-full font-ibm hover:bg-success/20 transition-colors animate-scale-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <ArrowRight className="w-5 h-5 text-warning" />
                      <span className="text-sm font-medium font-inter text-warning">
                        Transferable ({candidate.skills.transferable.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.transferable.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-warning/10 text-warning text-sm rounded-full font-ibm hover:bg-warning/20 transition-colors animate-scale-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium font-inter text-secondary">
                        Soft Skills ({candidate.skills.non_technical.length})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.non_technical.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full font-ibm hover:bg-secondary/20 transition-colors animate-scale-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
                <h4 className="text-lg font-semibold font-inter text-slate-900 mb-3">AI Analysis</h4>
                <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-slate-600 font-ibm leading-relaxed">{candidate.justification}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
                <h4 className="text-lg font-semibold font-inter text-slate-900 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span className="font-ibm text-slate-600">{candidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span className="font-ibm text-slate-600">{candidate.mobile_number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};