import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { Send, AttachFile, Mic } from '@mui/icons-material';

const ChatInput = ({ onSendMessage, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const textFieldRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      textFieldRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e0e0e0',
        p: 2,
        zIndex: 1000,
      }}
      className="chat-input-container"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '25px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          '&:focus-within': {
            border: '2px solid #1976d2',
            boxShadow: '0 4px 16px rgba(25,118,210,0.2)',
          },
        }}
        className="transition-all duration-200"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
            p: 1,
          }}
        >
          {/* Attachment Button */}
          <Tooltip title="Attach file">
            <IconButton
              size="small"
              disabled={disabled}
              sx={{
                color: '#757575',
                '&:hover': { color: '#1976d2' },
                mb: 0.5,
              }}
            >
              <AttachFile />
            </IconButton>
          </Tooltip>

          {/* Text Input */}
          <TextField
            ref={textFieldRef}
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={disabled}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: '1rem',
                lineHeight: 1.5,
                p: 1,
                '& .MuiInputBase-input': {
                  '&::placeholder': {
                    color: '#9e9e9e',
                    opacity: 1,
                  },
                },
              },
            }}
            sx={{
              flexGrow: 1,
              '& .MuiInputBase-root': {
                minHeight: '40px',
              },
            }}
            className="chat-text-field"
          />

          {/* Voice Button */}
          <Tooltip title="Voice input">
            <IconButton
              size="small"
              disabled={disabled}
              sx={{
                color: '#757575',
                '&:hover': { color: '#f50057' },
                mb: 0.5,
              }}
            >
              <Mic />
            </IconButton>
          </Tooltip>

          {/* Send Button */}
          <Tooltip title="Send message">
            <span>
              <IconButton
                type="submit"
                disabled={!message.trim() || isLoading || disabled}
                sx={{
                  bgcolor: message.trim() && !isLoading && !disabled ? '#1976d2' : '#e0e0e0',
                  color: message.trim() && !isLoading && !disabled ? 'white' : '#9e9e9e',
                  width: 40,
                  height: 40,
                  mb: 0.5,
                  '&:hover': {
                    bgcolor: message.trim() && !isLoading && !disabled ? '#1565c0' : '#e0e0e0',
                  },
                  transition: 'all 0.2s ease',
                }}
                className="send-button"
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: 'white' }} />
                ) : (
                  <Send sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Paper>


    </Box>
  );
};

export default ChatInput;