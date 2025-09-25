# Gemini Chatbot Frontend

A modern, responsive React chatbot interface that mimics Google's Gemini AI assistant. Built with React, Material-UI, and Tailwind CSS.

## Features

- 🤖 **AI-Powered Chat**: Seamless integration with your backend API
- 🎨 **Modern UI**: Gemini-like interface with Material-UI components and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode**: Toggle between themes
- ⚡ **Real-time Communication**: Fast API responses with loading states
- 🔄 **Auto-scroll**: Messages automatically scroll to the latest
- 💫 **Smooth Animations**: Fade-in effects and hover interactions
- 🎯 **Accessibility**: Full keyboard navigation and screen reader support

## Tech Stack

- **Frontend**: React 19.1.1, Vite
- **UI Library**: Material-UI (MUI) v7.3.2
- **Styling**: Tailwind CSS v4.1.13
- **Icons**: Material-UI Icons
- **Build Tool**: Rolldown-Vite v7.1.12

## Backend Integration

### API Endpoints Required

Your backend should implement these endpoints:

#### 1. Send Message
```
POST /api/chat
Content-Type: application/json

Request Body:
{
  "message": "User's message text",
  "timestamp": "2024-01-01T10:00:00.000Z"
}

Response:
{
  "response": "AI assistant's response",
  "timestamp": "2024-01-01T10:00:01.000Z"
}
```

#### 2. Health Check (Optional)
```
GET /api/health

Response:
{
  "status": "ok"
}
```

### Backend Configuration

Update the API base URL in `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:port/api';
```

## Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API endpoint**
   - Edit `src/services/apiService.js`
   - Update `API_BASE_URL` to match your backend

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Component Structure

```
src/
├── components/
│   ├── Chat.jsx              # Main chat container
│   ├── ChatMessage.jsx       # Individual message component
│   └── ChatInput.jsx         # Message input with send button
├── services/
│   └── apiService.js         # Backend API communication
├── App.jsx                   # Main app component with theme
├── App.css                   # Global app styles
└── index.css                 # Tailwind imports + custom styles
```

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
