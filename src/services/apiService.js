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
      
      // Extract text from Gemini response structure
      let extractedText = 'Sorry, I couldn\'t process your request.';
      
      if (data.candidates && 
          data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
        
        extractedText = data.candidates[0].content.parts[0].text;
      }

      // Create properly structured AI message object
      const aiMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: extractedText,
        isUser: false,
        timestamp: new Date().toISOString(),
        metadata: {
          modelVersion: data.modelVersion || 'unknown',
          finishReason: data.candidates?.[0]?.finishReason || 'unknown',
          tokenCount: data.usageMetadata?.totalTokenCount || 0
        }
      };

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