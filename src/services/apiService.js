// API service for communicating with the chatbot backend
const API_BASE_URL = 'http://localhost:8080/api/ai';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async sendMessage(message) {
    try {
      const response = await fetch(`${this.baseUrl}/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Change "message" to "question" to match the backend
        body: JSON.stringify({
          question: message, // <-- CORRECTED KEY
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        response: data.response || 'No response received', // <-- Ensure you get the 'response' field
        timestamp: data.timestamp || new Date().toISOString()
      };
    } catch (error) {
      console.error('API Service Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send message',
        response: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getChatHistory() {
    try {
      const response = await fetch(`${this.baseUrl}/chat/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        history: data.history || []
      };
    } catch (error) {
      console.error('Get History Error:', error);
      return {
        success: false,
        error: error.message,
        history: []
      };
    }
  }

  // Health check for the backend
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default new ApiService();