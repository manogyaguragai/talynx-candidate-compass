
import { create } from 'zustand';

export interface Candidate {
  id: string;
  name: string;
  fitScore: number;
  overall_similarity: number;
  llm_fit_score: number;
  skills: {
    exact_matches: string[];
    transferable: string[];
    non_technical: string[];
  };
  education_highlights: string;
  experience_highlights: string;
  summary: string;
  justification: string;
  email: string;
  mobile_number: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  currentStage: 'upload' | 'screening' | 'analysis' | 'complete';
  progress: number;
  timings: {
    upload: number;
    screening: number;
    analysis: number;
    total: number;
  };
}

interface DashboardState {
  jobDescription: string;
  uploadedFiles: File[];
  candidates: Candidate[];
  selectedCandidates: string[];
  processing: ProcessingState;
  selectedCandidate: string | null;
  showComparison: boolean;
  setJobDescription: (desc: string) => void;
  setUploadedFiles: (files: File[]) => void;
  addUploadedFile: (file: File) => void;
  removeUploadedFile: (fileName: string) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidates: (ids: string[]) => void;
  setProcessing: (processing: ProcessingState) => void;
  setSelectedCandidate: (id: string | null) => void;
  setShowComparison: (show: boolean) => void;
  toggleCandidateSelection: (id: string) => void;
  resetState: () => void;
}

const initialProcessingState: ProcessingState = {
  isProcessing: false,
  currentStage: 'upload',
  progress: 0,
  timings: {
    upload: 0,
    screening: 0,
    analysis: 0,
    total: 0,
  },
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  jobDescription: '',
  uploadedFiles: [],
  candidates: [],
  selectedCandidates: [],
  processing: initialProcessingState,
  selectedCandidate: null,
  showComparison: false,

  setJobDescription: (desc) => set({ jobDescription: desc }),
  
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
  
  addUploadedFile: (file) => set((state) => ({
    uploadedFiles: [...state.uploadedFiles, file]
  })),
  
  removeUploadedFile: (fileName) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter(f => f.name !== fileName)
  })),
  
  setCandidates: (candidates) => set({ candidates }),
  
  setSelectedCandidates: (ids) => set({ selectedCandidates: ids }),
  
  setProcessing: (processing) => set({ processing }),
  
  setSelectedCandidate: (id) => set({ selectedCandidate: id }),
  
  setShowComparison: (show) => set({ showComparison: show }),
  
  toggleCandidateSelection: (id) => set((state) => {
    const isSelected = state.selectedCandidates.includes(id);
    const newSelection = isSelected 
      ? state.selectedCandidates.filter(cId => cId !== id)
      : state.selectedCandidates.length < 3 
        ? [...state.selectedCandidates, id] 
        : state.selectedCandidates;
    
    return { selectedCandidates: newSelection };
  }),
  
  resetState: () => set({
    jobDescription: '',
    uploadedFiles: [],
    candidates: [],
    selectedCandidates: [],
    processing: initialProcessingState,
    selectedCandidate: null,
    showComparison: false,
  }),
}));
