
import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { FileText, Sparkles } from 'lucide-react';

const JOB_TEMPLATES = [
  {
    title: "Software Engineer",
    description: "Full-stack developer position",
    content: `We are seeking a talented Software Engineer to join our dynamic team. The ideal candidate will have 3+ years of experience in full-stack development with expertise in modern web technologies.

Key Requirements:
• Bachelor's degree in Computer Science or related field
• Proficiency in JavaScript, React, Node.js
• Experience with cloud platforms (AWS, Azure, or GCP)
• Strong understanding of database technologies (SQL and NoSQL)
• Excellent problem-solving and communication skills
• Experience with Agile development methodologies

Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Write clean, maintainable code
• Participate in code reviews and technical discussions
• Contribute to architectural decisions`
  },
  {
    title: "Medical Officer",
    description: "Healthcare professional position",
    content: `We are looking for a qualified Medical Officer to provide comprehensive medical care and support our healthcare initiatives.

Key Requirements:
• Medical degree (MBBS/MD) from accredited institution
• Valid medical license and board certification
• 2+ years of clinical experience
• Strong diagnostic and treatment skills
• Excellent communication and interpersonal skills
• Commitment to patient-centered care

Responsibilities:
• Conduct patient examinations and diagnoses
• Develop and implement treatment plans
• Maintain accurate medical records
• Collaborate with healthcare team members
• Stay updated with latest medical practices and research`
  }
];

export const JobDescriptionInput: React.FC = () => {
  const { jobDescription, setJobDescription } = useDashboardStore();
  const characterCount = jobDescription.length;
  const minChars = 500;
  const isValid = characterCount >= minChars;

  const handleTemplateSelect = (template: typeof JOB_TEMPLATES[0]) => {
    setJobDescription(template.content);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold font-inter text-slate-900">Job Description</h2>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium font-ibm text-slate-700">Quick Templates</span>
        </div>
        <div className="flex space-x-2">
          {JOB_TEMPLATES.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateSelect(template)}
              className="px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <div className="font-medium font-inter">{template.title}</div>
              <div className="text-xs text-slate-500 font-ibm">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter detailed job description including requirements, responsibilities, and qualifications..."
          className="w-full h-64 p-4 border border-slate-200 rounded-lg font-ibm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <span className={`text-xs font-fira ${
            isValid ? 'text-success' : characterCount > 0 ? 'text-warning' : 'text-slate-400'
          }`}>
            {characterCount}/{minChars} min
          </span>
          {isValid && (
            <div className="w-2 h-2 bg-success rounded-full"></div>
          )}
        </div>
      </div>

      {characterCount > 0 && !isValid && (
        <p className="mt-2 text-sm text-warning font-ibm">
          Please provide at least {minChars - characterCount} more characters for better analysis.
        </p>
      )}
    </div>
  );
};
