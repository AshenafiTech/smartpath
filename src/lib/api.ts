import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const apiEndpoints = {
  submitGPA: (gpa: number) => api.post('/submit-gpa', { gpa }),
  submitInterestQuiz: (answers: Record<string, string>) => api.post('/submit-interest-quiz', answers),
  getRecommendations: () => api.get('/recommendations'),
  getCutoffs: () => api.get('/cutoffs'),
  getTestimonials: () => api.get('/testimonials'),
};

// Types
export interface Department {
  id: string;
  name: string;
  description: string;
  matchPercentage: number;
  cutoff: number;
}

export interface CutoffData {
  year: number;
  department: string;
  cutoff: number;
}

export interface Testimonial {
  id: string;
  department: string;
  quote: string;
  studentName: string;
  year: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}