import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  // Update this with your actual backend URL

export interface FeedbackSubmission {
  text: string;
  screenshot?: File;
  userId?: string;
}

export interface FeedbackResponse {
  id: string;
  text: string;
  aiSummary: string;
  rootCause: string;
  department: string;
  status: 'new' | 'in-progress' | 'resolved';
  urgency: 1 | 2 | 3;
  category: string;
  workflowFault?: string;
  actionableAdvice?: string;
  createdAt: string;
}

export const feedbackService = {
  // Submit new feedback
  async submitFeedback(data: FeedbackSubmission): Promise<FeedbackResponse> {
    const formData = new FormData();
    formData.append('text', data.text);
    if (data.screenshot) {
      formData.append('screenshot', data.screenshot);
    }
    if (data.userId) {
      formData.append('userId', data.userId);
    }

    try {
      const response = await axios.post(`${API_URL}/feedback`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  },

  // Get all feedback
  async getFeedback(): Promise<FeedbackResponse[]> {
    try {
      const response = await axios.get(`${API_URL}/feedback`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  },

  // Get feedback analytics
  async getFeedbackAnalytics() {
    try {
      const response = await axios.get(`${API_URL}/feedback/analytics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },
};