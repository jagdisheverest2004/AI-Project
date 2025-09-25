import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 2,
        mb: 3,
        px: 2,
      }}
      className={`animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: isUser ? '#1976d2' : '#f50057',
          width: 40,
          height: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
        className="flex-shrink-0"
      >
        {isUser ? <Person /> : <SmartToy />}
      </Avatar>

      {/* Message Content */}
      <Box
        sx={{
          maxWidth: '70%',
          minWidth: '200px',
        }}
        className="flex flex-col"
      >
        {/* Message Bubble */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            bgcolor: isUser ? '#e3f2fd' : '#f5f5f5',
            border: isUser ? '1px solid #bbdefb' : '1px solid #e0e0e0',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: 0,
              borderStyle: 'solid',
              ...(isUser
                ? {
                    right: -8,
                    bottom: 8,
                    borderWidth: '8px 0 8px 12px',
                    borderColor: `transparent transparent transparent #e3f2fd`,
                  }
                : {
                    left: -8,
                    bottom: 8,
                    borderWidth: '8px 12px 8px 0',
                    borderColor: `transparent #f5f5f5 transparent transparent`,
                  }),
            },
          }}
          className="message-bubble hover:shadow-md transition-shadow duration-200"
        >
          <Typography
            variant="body1"
            sx={{
              color: '#2c2c2c',
              lineHeight: 1.6,
              fontSize: '0.95rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {message}
          </Typography>
        </Paper>

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            color: '#757575',
            mt: 0.5,
            fontSize: '0.75rem',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
          }}
          className="opacity-70"
        >
          {new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;