
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Eye } from 'lucide-react';

export const CandidateTable: React.FC = () => {
  const { 
    candidates, 
    selectedCandidates, 
    toggleCandidateSelection, 
    setSelectedCandidate 
  } = useDashboardStore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success bg-green-50';
    if (score >= 60) return 'text-warning bg-yellow-50';
    return 'text-danger bg-red-50';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  if (candidates.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold font-inter text-slate-900">Candidate Rankings</h2>
        <p className="text-sm text-slate-500 font-ibm mt-1">
          Top {candidates.length} candidates ranked by AI analysis
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = candidates.slice(0, 3).map(c => c.id);
                      allIds.forEach(id => {
                        if (!selectedCandidates.includes(id)) {
                          toggleCandidateSelection(id);
                        }
                      });
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">Rank</th>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">Name</th>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">
                <div className="flex items-center space-x-1">
                  <span>Fit Score</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">Overall Similarity</th>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">Key Skills</th>
              <th className="text-left p-4 text-sm font-medium font-inter text-slate-900">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-200">
            {candidates.map((candidate, index) => (
              <tr key={candidate.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <input 
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => toggleCandidateSelection(candidate.id)}
                    disabled={!selectedCandidates.includes(candidate.id) && selectedCandidates.length >= 3}
                    className="rounded border-slate-300"
                  />
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-600' : 'bg-slate-300'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                </td>
                
                <td className="p-4">
                  <div>
                    <p className="font-medium font-inter text-slate-900">{candidate.name}</p>
                    <p className="text-sm text-slate-500 font-ibm">{candidate.id}</p>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-bold ${getScoreColor(candidate.fitScore)}`}>
                      {candidate.fitScore}%
                    </span>
                    <div className={`w-2 h-2 rounded-full ${getScoreBadgeColor(candidate.fitScore)}`}></div>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${candidate.overall_similarity * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-fira text-slate-600">
                    {Math.round(candidate.overall_similarity * 100)}%
                  </span>
                </td>
                
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.exact_matches.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-success/10 text-success text-xs rounded-full font-ibm">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.exact_matches.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-ibm">
                        +{candidate.skills.exact_matches.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className="p-1 text-slate-400 hover:text-primary transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a 
                      href={`mailto:${candidate.email}`}
                      className="p-1 text-slate-400 hover:text-primary transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a 
                      href={`tel:${candidate.mobile_number}`}
                      className="p-1 text-slate-400 hover:text-success transition-colors"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a 
                      href={`sms:${candidate.mobile_number}`}
                      className="p-1 text-slate-400 hover:text-secondary transition-colors"
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
