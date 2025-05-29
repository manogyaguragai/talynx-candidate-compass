
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { Star, Mail, Phone, MessageSquare, Trophy, GraduationCap, Briefcase } from 'lucide-react';

export const TopCandidateSpotlight: React.FC = () => {
  const { candidates } = useDashboardStore();
  
  if (candidates.length === 0) {
    return null;
  }

  const topCandidate = candidates[0];

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg text-white p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-300" />
          <h2 className="text-xl font-bold font-inter">Top Candidate</h2>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-5 h-5 text-yellow-300 fill-current" />
          <span className="text-lg font-bold">{topCandidate.fitScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Info */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold font-inter mb-2">{topCandidate.name}</h3>
          <p className="text-blue-100 font-ibm mb-4">{topCandidate.summary}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-blue-200 mt-1" />
              <div>
                <p className="text-sm font-medium font-inter text-blue-100">Education</p>
                <p className="text-sm font-ibm">{topCandidate.education_highlights}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Briefcase className="w-5 h-5 text-blue-200 mt-1" />
              <div>
                <p className="text-sm font-medium font-inter text-blue-100">Experience</p>
                <p className="text-sm font-ibm">{topCandidate.experience_highlights}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="text-sm font-medium font-inter text-blue-100 mb-2">Key Skills</p>
            <div className="flex flex-wrap gap-2">
              {topCandidate.skills.exact_matches.slice(0, 6).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-ibm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions & Metrics */}
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm font-medium font-inter text-blue-100 mb-2">Match Metrics</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-ibm">Fit Score</span>
                <span className="font-bold font-fira">{topCandidate.fitScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-ibm">Similarity</span>
                <span className="font-bold font-fira">{Math.round(topCandidate.overall_similarity * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-ibm">LLM Score</span>
                <span className="font-bold font-fira">{topCandidate.llm_fit_score}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <a 
              href={`mailto:${topCandidate.email}`}
              className="w-full flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg py-2 px-4"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium font-ibm">Send Email</span>
            </a>
            
            <a 
              href={`tel:${topCandidate.mobile_number}`}
              className="w-full flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg py-2 px-4"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium font-ibm">Call Now</span>
            </a>
            
            <a 
              href={`sms:${topCandidate.mobile_number}`}
              className="w-full flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg py-2 px-4"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium font-ibm">Send SMS</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
