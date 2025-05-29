
import axios from 'axios';
import { Candidate } from '../store/dashboardStore';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes timeout for processing
});

export interface RankRequest {
  job_desc: string;
  files: File[];
}

export const rankCandidates = async (request: RankRequest): Promise<Candidate[]> => {
  const formData = new FormData();
  formData.append('job_desc', request.job_desc);
  
  request.files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post('/api/rank', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Mock data for development
export const mockCandidates: Candidate[] = [
  {
    id: "john_doe_resume.pdf",
    name: "John Doe",
    fitScore: 92,
    overall_similarity: 0.85,
    llm_fit_score: 92.0,
    skills: {
      exact_matches: ["Python", "AWS", "Docker", "React"],
      transferable: ["Project Management", "Team Leadership"],
      non_technical: ["Communication", "Problem Solving"]
    },
    education_highlights: "MS in Computer Science, Stanford University",
    experience_highlights: "5+ years at TechCorp as Senior Developer",
    summary: "Experienced full-stack developer with strong cloud architecture skills",
    justification: "Strong technical match with excellent leadership experience and proven track record in similar technologies.",
    email: "john.doe@example.com",
    mobile_number: "+1-555-0123"
  },
  {
    id: "sarah_wilson_cv.pdf",
    name: "Sarah Wilson",
    fitScore: 88,
    overall_similarity: 0.82,
    llm_fit_score: 88.0,
    skills: {
      exact_matches: ["JavaScript", "Node.js", "MongoDB"],
      transferable: ["Agile Methodologies", "Code Review"],
      non_technical: ["Mentoring", "Public Speaking"]
    },
    education_highlights: "BS in Software Engineering, MIT",
    experience_highlights: "4 years at StartupXYZ as Lead Frontend Developer",
    summary: "Frontend specialist with strong backend knowledge and mentoring experience",
    justification: "Excellent frontend skills with growing full-stack capabilities and proven mentoring abilities.",
    email: "sarah.wilson@example.com",
    mobile_number: "+1-555-0456"
  },
  {
    id: "mike_chen_resume.pdf",
    name: "Mike Chen",
    fitScore: 75,
    overall_similarity: 0.68,
    llm_fit_score: 75.0,
    skills: {
      exact_matches: ["Java", "Spring Boot"],
      transferable: ["System Design", "Database Optimization"],
      non_technical: ["Documentation", "Cross-team Collaboration"]
    },
    education_highlights: "MS in Information Systems, UC Berkeley",
    experience_highlights: "3 years at Enterprise Corp as Backend Developer",
    summary: "Backend focused developer with strong enterprise experience",
    justification: "Solid backend foundation with enterprise experience, though may need frontend skill development.",
    email: "mike.chen@example.com",
    mobile_number: "+1-555-0789"
  }
];
