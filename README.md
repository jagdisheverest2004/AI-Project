# 🤖 Gemini AI Chatbot Frontend

A modern, responsive React chatbot interface that seamlessly integrates with Google's Gemini AI API. Built with React, Material-UI, and Tailwind CSS for a premium user experience.

## ✨ Features

- 🤖 **Gemini AI Integration**: Direct integration with Gemini 2.0 Flash API
- 🎨 **Premium UI**: Google Gemini-inspired interface with Material-UI components
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Theme Toggle**: Dark/Light mode with smooth transitions
- ⚡ **Real-time Chat**: Instant responses with typing indicators
- 🔄 **Auto-scroll**: Messages automatically scroll to the latest
- 💫 **Rich Animations**: Fade-in effects, hover states, and micro-interactions
- 📝 **Smart Text Formatting**: Automatic bullet points, lists, and paragraph formatting
- 🎯 **Accessibility**: Full keyboard navigation and screen reader support
- 🔍 **Message Metadata**: Model version and token count display
- ⚠️ **Error Handling**: Graceful error states with user-friendly messages
- 🎪 **Typing Indicator**: Animated dots showing AI is thinking

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Rolldown-Vite v7.1.12  
- **UI Library**: Material-UI (MUI) v7.3.2
- **Styling**: Tailwind CSS v4.1.13
- **Icons**: Material-UI Icons
- **State Management**: React Hooks (useState, useEffect, useRef)
- **HTTP Client**: Fetch API

## 🔌 Backend Integration

### Current API Configuration

The frontend is configured to work with a backend that processes Gemini API responses:

- **Base URL**: `http://localhost:8080/api/ai`
- **Endpoint**: `/question`
- **Method**: POST

### Expected API Response Structure

Your backend should return the full Gemini API response structure:

```javascript
// POST /api/ai/question
// Request Body:
{
  "question": "User's message text"
}

// Expected Response (Gemini API format):
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI assistant's detailed response text here..."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "avgLogprobs": -0.30718461333728225
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 5,
    "candidatesTokenCount": 305,
    "totalTokenCount": 310
  },
  "modelVersion": "gemini-2.0-flash",
  "responseId": "unique-response-id"
}
```

### Smart Response Processing

The frontend automatically:
- ✅ Extracts text from `candidates[0].content.parts[0].text`
- ✅ Handles malformed responses gracefully
- ✅ Displays metadata (model version, token count)
- ✅ Formats text with proper paragraphs and lists
- ✅ Shows error messages for failed requests

## 🚀 Installation & Setup

1. **Clone and Install**
   ```bash
   cd AI-Project
   npm install
   ```

2. **Configure Backend URL** (if different from localhost:8080)
   ```javascript
   // Edit src/services/apiService.js
   const API_BASE_URL = 'http://your-backend-url:port/api/ai';
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # Opens on http://localhost:3000
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Chat.jsx              # Main chat container with theme toggle
│   ├── ChatMessage.jsx       # Message bubbles with smart formatting
│   ├── ChatInput.jsx         # Input field with send/attach/voice buttons  
│   └── TypingIndicator.jsx   # Animated typing dots
├── services/
│   └── apiService.js         # Gemini API response processing
├── App.jsx                   # Root component with Material-UI theme
├── App.css                   # Global application styles
├── index.css                 # Tailwind CSS + custom animations
└── main.jsx                  # React app entry point
```

## 🎨 Component Features

### Chat.jsx
- App bar with Gemini branding
- Online/offline status indicator  
- Dark/light theme toggle
- Message container with auto-scroll
- Error alert handling
- Welcome message on load

### ChatMessage.jsx  
- User vs AI message styling
- Smart text formatting (lists, paragraphs)
- Message metadata display (model, tokens)
- Error state handling
- Timestamp formatting
- Hover effects and animations

### ChatInput.jsx
- Multi-line text input with auto-resize
- Send button with loading states
- Attachment and voice input buttons (UI ready)
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Input validation and disabled states

### TypingIndicator.jsx
- Animated typing dots
- AI avatar with loading state
- "Gemini is thinking..." text
- Smooth fade-in animation

## 🎨 Styling & Theming

### Material-UI Theme
```javascript
// Customized theme with Gemini-inspired colors
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 12 },
});
```

### Custom CSS Features
- **Smooth Animations**: Fade-in, hover effects, typing indicators
- **Responsive Design**: Mobile-first approach with breakpoints
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Loading States**: Shimmer effects and pulse animations
- **Gradient Effects**: Gemini-inspired color gradients
- **Glass Effects**: Backdrop blur for modern aesthetics

## 🔧 Configuration Options

### API Service Configuration
```javascript
// src/services/apiService.js
const API_BASE_URL = 'http://localhost:8080/api/ai'; // Your backend URL

class ApiService {
  async sendMessage(message) {
    // Handles Gemini API response structure
    // Extracts text from candidates[0].content.parts[0].text
    // Returns formatted message object
  }
}
```

### Theme Customization
```javascript
// src/App.jsx - Customize colors and typography
const theme = createTheme({
  palette: {
    primary: { main: '#your-primary-color' },
    secondary: { main: '#your-secondary-color' },
  },
});
```

### Custom Styling
```css
/* src/index.css - Add your custom styles */
.your-custom-class {
  /* Your custom properties */
}
```

## 🔍 Features in Detail

### Smart Text Formatting
- **Automatic Lists**: Converts `* item` to proper bullet points
- **Numbered Lists**: Handles `1. item` format
- **Paragraphs**: Splits text on double newlines
- **Emphasis**: Highlights **bold** text with special styling
- **Code-like Terms**: Technical terms get highlighted backgrounds

### Responsive Design
- **Desktop**: Full-width layout with optimal spacing
- **Tablet**: Touch-friendly with adjusted padding
- **Mobile**: Stack layout with larger touch targets
- **Breakpoints**: Smooth transitions between screen sizes

### Accessibility
- **Keyboard Navigation**: Full app usable via keyboard
- **Screen Reader Support**: Proper ARIA labels and roles  
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user motion preferences
- **Color Contrast**: WCAG compliant color ratios

## 🚀 Performance Features

- **Efficient Rendering**: React hooks for optimal re-renders
- **Lazy Loading**: Components load only when needed
- **Smooth Scrolling**: Hardware-accelerated animations
- **Memory Management**: Proper cleanup of event listeners
- **Bundle Optimization**: Tree shaking and code splitting

## 🐛 Error Handling

- **Network Errors**: Graceful fallback with retry options
- **API Errors**: User-friendly error messages
- **Loading States**: Clear feedback during operations
- **Offline Support**: Detects connection status
- **Validation**: Input validation with helpful hints

## 📱 Browser Support

- Chrome 88+ ✅
- Firefox 85+ ✅  
- Safari 14+ ✅
- Edge 88+ ✅
- Mobile browsers ✅

## 🔒 Security

- **Input Sanitization**: Prevents XSS attacks
- **HTTPS Ready**: Secure communication support
- **API Validation**: Validates all API responses
- **Error Boundaries**: Catches and handles React errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using React, Material-UI, and Tailwind CSS**

**🌟 Star this repo if you found it helpful!**
