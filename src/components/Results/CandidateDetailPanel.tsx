
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { X, User, Star, GraduationCap, Briefcase, CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';

export const CandidateDetailPanel: React.FC = () => {
  const { selectedCandidate, candidates, setSelectedCandidate } = useDashboardStore();
  
  const candidate = candidates.find(c => c.id === selectedCandidate);
  
  if (!candidate) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-slate-200 z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold font-inter text-slate-900">Candidate Details</h2>
          <button 
            onClick={() => setSelectedCandidate(null)}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Info */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-inter text-slate-900">{candidate.name}</h3>
              <p className="text-sm text-slate-500 font-ibm">{candidate.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-bold font-fira text-slate-900">{candidate.fitScore}%</span>
            </div>
            <div className="text-sm text-slate-500 font-ibm">
              Overall: {Math.round(candidate.overall_similarity * 100)}%
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <a 
              href={`mailto:${candidate.email}`}
              className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium font-ibm">Email</span>
            </a>
            <a 
              href={`tel:${candidate.mobile_number}`}
              className="flex-1 flex items-center justify-center space-x-2 bg-success text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium font-ibm">Call</span>
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h4 className="text-sm font-medium font-inter text-slate-900 mb-2">Summary</h4>
          <p className="text-sm text-slate-600 font-ibm">{candidate.summary}</p>
        </div>

        {/* Education */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-medium font-inter text-slate-900">Education</h4>
          </div>
          <p className="text-sm text-slate-600 font-ibm">{candidate.education_highlights}</p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-medium font-inter text-slate-900">Experience</h4>
          </div>
          <p className="text-sm text-slate-600 font-ibm">{candidate.experience_highlights}</p>
        </div>

        {/* Skills Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium font-inter text-slate-900 mb-3">Skills Analysis</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-xs font-medium font-inter text-success">Exact Matches ({candidate.skills.exact_matches.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.exact_matches.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-success/10 text-success text-xs rounded-full font-ibm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <ArrowRight className="w-4 h-4 text-warning" />
                <span className="text-xs font-medium font-inter text-warning">Transferable ({candidate.skills.transferable.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.transferable.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full font-ibm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-secondary" />
                <span className="text-xs font-medium font-inter text-secondary">Soft Skills ({candidate.skills.non_technical.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.non_technical.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-ibm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Justification */}
        <div className="mb-6">
          <h4 className="text-sm font-medium font-inter text-slate-900 mb-2">AI Analysis</h4>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 font-ibm">{candidate.justification}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-sm font-medium font-inter text-slate-900 mb-2">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-ibm text-slate-600">{candidate.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-ibm text-slate-600">{candidate.mobile_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
