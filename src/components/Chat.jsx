import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Alert,
  Fade,
} from '@mui/material';
import {
  Settings,
  DarkMode,
  LightMode,
  Refresh,
  AutoAwesome,
} from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import apiService from '../services/apiService';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check backend health on component mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      const health = await apiService.checkHealth();
      setIsOnline(health);
    };
    checkBackendHealth();
  }, []);

  // Load chat history on first load
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const historyResponse = await apiService.getChatHistory();
        if (historyResponse.success && historyResponse.history.length > 0) {
          setMessages(historyResponse.history);
        } else {
          // Add welcome message if no history
          const welcomeMessage = {
            id: 'welcome',
            message: "Hello! I'm your AI assistant. How can I help you today?",
            isUser: false,
            timestamp: new Date().toISOString(),
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
        // Add welcome message on error
        const welcomeMessage = {
          id: 'welcome',
          message: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    };
    
    loadChatHistory();
  }, []);

  // ... other imports and component setup ...

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      // Use a temporary ID for the user's message for the key
      id: `user-${Date.now()}`,
      message: messageText,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.sendMessage(messageText);

      if (response.success) {
        setMessages(prev => [...prev, response.aiMessage]);
      } else {
        // Add error message to chat if API call fails
        setMessages(prev => [...prev, response.aiMessage]);
        setError('Failed to get response from AI. Please try again.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Network error. Please check your connection and try again.');
      
      // Add fallback error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        message: 'Sorry, I encountered a network error. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

// ... the rest of the file is correct ...
  const handleRefresh = async () => {
    setMessages([]);
    setError('');
    setIsLoading(true);
    
    try {
      // Reload chat history from backend
      const historyResponse = await apiService.getChatHistory();
      if (historyResponse.success && historyResponse.history.length > 0) {
        setMessages(historyResponse.history);
      } else {
        // Add welcome message if no history
        const welcomeMessage = {
          id: 'welcome-' + Date.now(),
          message: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Failed to refresh chat:', error);
      setError('Failed to refresh chat history');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDarkMode ? '#121212' : '#f8f9fa',
        transition: 'background-color 0.3s ease',
      }}
      className="chat-container"
    >
      {/* App Bar */}
      <AppBar
        position="static"
        elevation={2}
        sx={{
          bgcolor: isDarkMode ? '#1e1e1e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#2c2c2c',
          borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AutoAwesome sx={{ color: '#f50057', fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #f50057)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Gemini Chat
            </Typography>
            <Chip
              label={isOnline ? 'Online' : 'Offline'}
              size="small"
              color={isOnline ? 'success' : 'error'}
              variant="outlined"
              className="animate-pulse"
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleRefresh}
              sx={{ color: isDarkMode ? '#ffffff' : '#2c2c2c' }}
            >
              <Refresh />
            </IconButton>
            <IconButton
              onClick={toggleTheme}
              sx={{ color: isDarkMode ? '#ffffff' : '#2c2c2c' }}
            >
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton
              sx={{ color: isDarkMode ? '#ffffff' : '#2c2c2c' }}
            >
              <Settings />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Error Alert */}
      {error && (
        <Fade in={!!error}>
          <Alert
            severity="error"
            onClose={() => setError('')}
            sx={{ m: 1, borderRadius: 2 }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Chat Messages Container */}
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: isDarkMode ? '#121212' : 'transparent',
        }}
        className="messages-container custom-scrollbar"
      >
        <Container
          maxWidth="md"
          sx={{
            flexGrow: 1,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#757575',
                  fontWeight: 300,
                }}
              >
                Start a conversation with Gemini
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  metadata={message.metadata}
                  isError={message.isError}
                />
              ))}
              
              {/* Show typing indicator when loading */}
              {isLoading && <TypingIndicator />}
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Container>
      </Box>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={!isOnline}
      />
    </Box>
  );
};

export default Chat;