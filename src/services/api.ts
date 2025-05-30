// src/services/api.ts
import axios from 'axios';
import JSZip from 'jszip';
import { Candidate } from '../store/dashboardStore';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

export interface RankRequest {
  job_desc: string;
  files: File[];
}

export const rankCandidates = async (request: RankRequest): Promise<Candidate[]> => {
  const formData = new FormData();
  formData.append('job_desc', request.job_desc);

  // Create zip only if files are provided
  if (request.files.length > 0) {
    const zip = new JSZip();
    
    // Add each file to the zip
    for (const file of request.files) {
      const arrayBuffer = await file.arrayBuffer();
      zip.file(file.name, arrayBuffer);
    }
    
    // Generate zip file
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'STORE', // Use STORE compression for better compatibility
    });
    
    const zipFile = new File([zipBlob], 'resumes.zip', {
      type: 'application/zip',
    });
    
    // Append zip to form data with the correct field name
    formData.append('files', zipFile);
  }

  try {
    // Debug: Log form data keys and file info
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: ${value.name} (${value.type}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const response = await axios.post(`${API_BASE_URL}/rank/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      timeout: 300000,
    });
    
    console.log('API response received:', response.data);
    
    if (!Array.isArray(response.data)) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format: Expected array of candidates');
    }
    
    // Transform backend response to match frontend Candidate interface
    return response.data.map((candidate: any) => ({
      id: candidate.id,
      name: candidate.name,
      fitScore: candidate.fitScore,
      overall_similarity: candidate.overall_similarity,
      llm_fit_score: candidate.llm_fit_score,
      skills: {
        exact_matches: candidate.skills.exact_matches || [],
        transferable: candidate.skills.transferable || [],
        non_technical: candidate.skills.non_technical || [],
      },
      education_highlights: candidate.education_highlights,
      experience_highlights: candidate.experience_highlights,
      summary: candidate.summary,
      justification: candidate.justification,
      email: candidate.email,
      mobile_number: candidate.mobile_number
    }));
  } catch (error: any) {
    console.error('API error details:');
    console.error('URL:', `${API_BASE_URL}/rank/`);
    
    if (error.response) {
      // Server responded with error status
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
      
      let errorMessage = `Server error: ${error.response.status}`;
      if (error.response.data && typeof error.response.data === 'object') {
        errorMessage += ` - ${JSON.stringify(error.response.data)}`;
      } else if (error.response.data) {
        errorMessage += ` - ${error.response.data}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Check your network connection.');
    } else {
      // Other errors
      console.error('Request setup error:', error.message);
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};