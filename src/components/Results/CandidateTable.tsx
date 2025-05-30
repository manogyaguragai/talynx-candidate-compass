import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Eye, Star } from 'lucide-react';

export const CandidateTable: React.FC = () => {
  const { 
    candidates, 
    selectedCandidates, 
    toggleCandidateSelection, 
    setSelectedCandidate 
  } = useDashboardStore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success bg-green-50 border-green-200';
    if (score >= 60) return 'text-warning bg-yellow-50 border-yellow-200';
    return 'text-danger bg-red-50 border-red-200';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-success shadow-green-200';
    if (score >= 60) return 'bg-warning shadow-yellow-200';
    return 'bg-danger shadow-red-200';
  };

  const getRankBadgeStyle = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-200';
      case 1: return 'bg-gradient-to-r from-slate-300 to-slate-500 shadow-lg shadow-slate-200';
      case 2: return 'bg-gradient-to-r from-amber-500 to-amber-700 shadow-lg shadow-amber-200';
      default: return 'bg-gradient-to-r from-slate-200 to-slate-400 shadow-md';
    }
  };

  if (candidates.length === 0) {
    return null;
  }

  // Show all top 10 candidates
  const tableCandidates = candidates.slice(0, 10);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-inter text-slate-900 animate-slide-in-right">
              Candidate Rankings
            </h2>
            <p className="text-sm text-slate-500 font-ibm mt-1 animate-fade-in">
              Top {tableCandidates.length} candidates ranked by AI analysis
            </p>
          </div>
          <div className="flex items-center space-x-2 animate-scale-in">
            <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-600">Best Matches</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 hover:border-primary transition-colors"
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = tableCandidates.slice(0, 3).map(c => c.id);
                      allIds.forEach(id => {
                        if (!selectedCandidates.includes(id)) {
                          toggleCandidateSelection(id);
                        }
                      });
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">Rank</th>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">Name</th>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">
                <div className="flex items-center space-x-1 group">
                  <span>Fit Score</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">Overall Similarity</th>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">Key Skills</th>
              <th className="text-left p-4 text-sm font-semibold font-inter text-slate-700">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {tableCandidates.map((candidate, index) => (
              <tr 
                key={candidate.id} 
                className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td className="p-4">
                  <input 
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => toggleCandidateSelection(candidate.id)}
                    disabled={!selectedCandidates.includes(candidate.id) && selectedCandidates.length >= 3}
                    className="rounded border-slate-300 hover:border-primary transition-colors"
                  />
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white transform transition-transform hover:scale-110 ${getRankBadgeStyle(index)}`}>
                      {index + 1} {/* Show actual rank starting from 1 */}
                    </div>
                    {index < 3 && ( // Show pulse for top 3 candidates
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="group-hover:translate-x-1 transition-transform">
                    <p className="font-semibold font-inter text-slate-900">{candidate.name}</p>
                    <p className="text-sm text-slate-500 font-ibm">{candidate.id}</p>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border transition-all hover:scale-105 ${getScoreColor(candidate.fitScore)}`}>
                      {candidate.fitScore.toFixed(1)}%
                    </span>
                    <div className={`w-3 h-3 rounded-full transition-all hover:scale-125 shadow-md ${getScoreBadgeColor(candidate.fitScore)}`}></div>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="w-24 h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 hover:from-secondary hover:to-primary"
                        style={{ 
                          width: `${candidate.overall_similarity * 100}%`,
                          animation: 'progress 2s ease-in-out'
                        }}
                      />
                    </div>
                    <span className="text-sm font-fira text-slate-600">
                      {(candidate.overall_similarity * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.exact_matches.slice(0, 3).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-success/10 text-success text-xs rounded-full font-ibm hover:bg-success/20 transition-all hover:scale-105 animate-scale-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.exact_matches.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-ibm hover:bg-slate-200 transition-colors">
                        +{candidate.skills.exact_matches.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all hover:scale-110"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a 
                      href={`mailto:${candidate.email}`}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all hover:scale-110"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a 
                      href={`tel:${candidate.mobile_number}`}
                      className="p-2 text-slate-400 hover:text-success hover:bg-success/10 rounded-lg transition-all hover:scale-110"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a 
                      href={`sms:${candidate.mobile_number}`}
                      className="p-2 text-slate-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all hover:scale-110"
                      title="Send SMS"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};