// API service for communicating with the chatbot backend
const API_BASE_URL = 'http://localhost:8080/api/ai';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // ... constructor ...

  async sendMessage(message) {
    try {
      const response = await fetch(`${this.baseUrl}/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle your backend's response format: { id, message, timestamp, user }
      let extractedText = 'Sorry, I couldn\'t process your request.';
      
      if (data.message) {
        // Your backend returns the message directly in the 'message' field
        extractedText = data.message;
      }

      // Create properly structured AI message object
      const aiMessage = {
        id: `ai-${data.id || Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: extractedText,
        isUser: false,
        timestamp: data.timestamp || new Date().toISOString(),
        metadata: {
          backendId: data.id,
          responseTime: new Date().toISOString(),
          source: 'backend-api'
        }
      };

      console.log('AI Message:', aiMessage);
      console.log('Raw API Response:', data);

      return {
        success: true,
        aiMessage: aiMessage,
        rawResponse: data // Keep raw response for debugging if needed
      };
    } catch (error) {
      console.error('API Service Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send message',
        aiMessage: {
          id: `error-${Date.now()}`,
          message: 'Sorry, I encountered an error while processing your request. Please try again.',
          isUser: false,
          timestamp: new Date().toISOString(),
          isError: true
        }
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
      
      // Convert your backend's history format to frontend format
      const formattedHistory = data.map(item => ({
        id: `history-${item.id}`,
        message: item.message,
        isUser: item.user,
        timestamp: item.timestamp,
        metadata: {
          backendId: item.id,
          source: 'chat-history'
        }
      }));

      return {
        success: true,
        history: formattedHistory
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