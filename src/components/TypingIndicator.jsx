import React from 'react';
import { Box, Paper, Avatar, Typography } from '@mui/material';
import { SmartToy } from '@mui/icons-material';

const TypingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 2,
        mb: 3,
        px: 2,
      }}
      className="animate-fade-in"
    >
      {/* AI Avatar */}
      <Avatar
        sx={{
          bgcolor: '#f50057',
          width: 40,
          height: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
        className="flex-shrink-0"
      >
        <SmartToy />
      </Avatar>

      {/* Typing Bubble */}
      <Box sx={{ maxWidth: '70%', minWidth: '120px' }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: '20px 20px 20px 4px',
            bgcolor: '#ffffff',
            border: '1px solid #e0e0e0',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -8,
              bottom: 8,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '8px 12px 8px 0',
              borderColor: 'transparent #ffffff transparent transparent',
            },
          }}
          className="typing-indicator-bubble"
        >
          <Box className="typing-indicator">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </Box>
        </Paper>
        
        <Typography
          variant="caption"
          sx={{
            color: '#757575',
            mt: 0.5,
            fontSize: '0.75rem',
            fontStyle: 'italic',
          }}
          className="opacity-70"
        >
          Gemini is thinking...
        </Typography>
      </Box>
    </Box>
  );
};

export default TypingIndicator;