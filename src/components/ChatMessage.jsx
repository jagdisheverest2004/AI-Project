import React from 'react';
import { Box, Avatar, Typography, Paper, Chip, Fade } from '@mui/material';
import { Person, SmartToy, Error, AutoAwesome } from '@mui/icons-material';

// Helper function to format message text with better readability
const formatMessageText = (text) => {
  if (!text) return '';
  
  // Split text into paragraphs and format
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    // Handle bullet points
    if (paragraph.includes('*   ') || paragraph.includes('* ')) {
      const items = paragraph.split(/\*\s+/).filter(item => item.trim());
      return (
        <ul key={index} style={{ margin: '8px 0', paddingLeft: '16px' }}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex} style={{ marginBottom: '4px' }}>
              {item.trim()}
            </li>
          ))}
        </ul>
      );
    }
    
    // Handle numbered lists
    if (/^\d+\.\s/.test(paragraph.trim())) {
      const items = paragraph.split(/\n(?=\d+\.\s)/).filter(item => item.trim());
      return (
        <ol key={index} style={{ margin: '8px 0', paddingLeft: '16px' }}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex} style={{ marginBottom: '4px' }}>
              {item.replace(/^\d+\.\s/, '').trim()}
            </li>
          ))}
        </ol>
      );
    }
    
    // Regular paragraphs
    return (
      <p key={index} style={{ marginBottom: index < paragraphs.length - 1 ? '12px' : '0' }}>
        {paragraph.trim()}
      </p>
    );
  });
};

const ChatMessage = ({ message, isUser, timestamp, metadata, isError }) => {
  return (
    <Fade in timeout={300}>
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
            bgcolor: isError ? '#f44336' : (isUser ? '#1976d2' : '#f50057'),
            width: 40,
            height: 40,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: isError ? '2px solid #ffcdd2' : 'none',
          }}
          className="flex-shrink-0 hover-lift"
        >
          {isError ? <Error /> : (isUser ? <Person /> : <SmartToy />)}
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
          elevation={isError ? 0 : 2}
          sx={{
            p: 2.5,
            borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            bgcolor: isError ? '#ffebee' : (isUser ? '#e3f2fd' : '#ffffff'),
            border: isError ? '1px solid #f44336' : (isUser ? '1px solid #bbdefb' : '1px solid #e0e0e0'),
            boxShadow: isError ? '0 2px 8px rgba(244,67,54,0.1)' : undefined,
            position: 'relative',
            maxWidth: '100%',
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
                    borderColor: `transparent transparent transparent ${isError ? '#ffebee' : '#e3f2fd'}`,
                  }
                : {
                    left: -8,
                    bottom: 8,
                    borderWidth: '8px 12px 8px 0',
                    borderColor: `transparent ${isError ? '#ffebee' : '#ffffff'} transparent transparent`,
                  }),
            },
          }}
          className="message-bubble hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              color: isError ? '#d32f2f' : '#2c2c2c',
              lineHeight: 1.7,
              fontSize: '0.95rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              '& strong': {
                fontWeight: 600,
                color: isUser ? '#1565c0' : '#1976d2',
              },
              '& em': {
                fontStyle: 'italic',
                color: '#666',
              },
              '& ul': {
                paddingLeft: '20px',
                margin: '8px 0',
              },
              '& li': {
                marginBottom: '4px',
              },
              '& p': {
                marginBottom: '8px',
                '&:last-child': {
                  marginBottom: 0,
                },
              },
            }}
          >
            {formatMessageText(message)}
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

        {/* AI Response Metadata */}
        {!isUser && metadata && (
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            {metadata.modelVersion && (
              <Chip
                icon={<AutoAwesome />}
                label={metadata.modelVersion}
                size="small"
                variant="outlined"
                sx={{ 
                  height: 20, 
                  fontSize: '0.7rem',
                  '& .MuiChip-icon': { fontSize: 12 }
                }}
              />
            )}
            {metadata.tokenCount > 0 && (
              <Chip
                label={`${metadata.tokenCount} tokens`}
                size="small"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
    </Fade>
  );
};

export default ChatMessage;