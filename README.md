# Cyber AI - Full Stack LLM Chat Application

A modern, real-time AI chat application built with React, Node.js, Socket.io, and multiple AI model integrations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Docker Deployment](#docker-deployment)
- [Remaining Work](#remaining-work)
- [API Documentation](#api-documentation)

---

## 🌟 Overview

Cyber AI is a full-stack chat application that integrates multiple Large Language Models (LLMs) including Google Gemini, DeepSeek, and Llama. It features real-time messaging via Socket.io, user authentication, chat history management, and image generation capabilities.

---

## ✨ Features

- **Multi-Model AI Support**: Google Gemini, DeepSeek, Llama, OpenRouter
- **Real-time Messaging**: WebSocket-based communication with Socket.io
- **User Authentication**: JWT-based authentication with secure cookies
- **Chat Management**: Create, delete, and search chat conversations
- **Image Generation**: AI-powered image generation with ImageKit integration
- **Vector Search**: Pinecone integration for semantic search
- **Web Search**: Serper API integration for real-time web search
- **PWA Support**: Progressive Web App with offline capabilities
- **Responsive Design**: Tailwind CSS for mobile-first design
- **Voice Input**: Speech recognition support

---

## 🛠️ Tech Stack

### Frontend (`/chat`)
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI Library |
| Redux Toolkit | 2.9.0 | State Management |
| React Router DOM | 7.8.2 | Routing |
| Socket.io-client | 4.8.1 | Real-time Communication |
| Tailwind CSS | 4.1.12 | Styling |
| Vite | 7.1.2 | Build Tool |
| React Markdown | 10.1.0 | Markdown Rendering |
| GSAP | 3.13.0 | Animations |
| Lucide React | 0.543.0 | Icons |

### Backend (`/Backend`)
| Technology | Version | Purpose |
|------------|---------|---------|
| Express | 5.1.0 | Web Framework |
| Socket.io | 4.8.1 | WebSocket Server |
| Mongoose | 8.18.0 | MongoDB ODM |
| @google/genai | 1.15.0 | Google AI SDK |
| LangChain | 1.1.9+ | AI Framework |
| Pinecone | 6.1.2 | Vector Database |
| ImageKit | 6.0.0 | Image Storage |
| JWT | 9.0.2 | Authentication |

---

## 📁 Project Structure

```
cyber-ai/
├── docker-compose.yml          # Docker orchestration
├── README.md                   # Project documentation
├── remaing_work.md             # Development notes
│
├── Backend/                    # Node.js Backend
│   ├── Dockerfile
│   ├── server.js              # Entry point
│   ├── package.json
│   ├── .env                   # Environment variables
│   ├── public/                # Static files (built frontend)
│   └── src/
│       ├── index.js           # Express app configuration
│       ├── controllers/       # Route handlers
│       │   ├── auth.controller.js
│       │   └── chat.controller.js
│       ├── db/
│       │   └── db.js          # MongoDB connection
│       ├── Middleware/
│       │   └── auth.middleware.js
│       ├── Models/            # Mongoose schemas
│       │   ├── chat.models.js
│       │   ├── message.model.js
│       │   └── user.models.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── chat.routes.js
│       ├── services/          # Business logic
│       │   ├── ai.services.js
│       │   ├── aiDeepSeek.js
│       │   ├── Imagegererate.js
│       │   ├── llamaChat.js
│       │   ├── serper.search.ai.js
│       │   ├── storge.service.js
│       │   └── vector.services.js
│       └── socket/            # WebSocket handlers
│           ├── socket.js
│           ├── ai.selection.js
│           ├── auth.socket.js
│           ├── memory.helper.js
│           └── message.handlers.js
│
└── chat/                      # React Frontend
    ├── Dockerfile
    ├── vite.config.js
    ├── package.json
    ├── index.html
    ├── public/
    │   ├── manifest.json
    │   ├── sw.js
    │   └── ...
    └── src/
        ├── main.jsx           # Entry point
        ├── App.jsx            # Root component
        ├── Mainrouter.jsx     # Route definitions
        ├── socket.js          # Socket.io client
        ├── api/
        │   └── axios.jsx      # API client
        ├── config/
        │   └── api.config.js
        ├── components/
        │   ├── chat/          # Chat UI components
        │   └── sidebar/       # Sidebar components
        ├── page/              # Page components
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── LandingPage.jsx
        │   └── NotFound.jsx
        └── store/             # Redux store
            ├── store.jsx
            ├── actions/
            └── Slicees/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Docker (optional)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/cyber-ai.git
cd cyber-ai
```

#### 2. Backend Setup
```bash
cd Backend
npm install
# Configure .env file (see Environment Configuration)
npm start
```

#### 3. Frontend Setup
```bash
cd chat
npm install
# Configure .env file
npm run dev
```

---

## ⚙️ Environment Configuration

### Backend `.env`
```env
# Database
MONGODB_URI=mongodb://localhost:27017/cyber-ai

# Authentication
JWT_SECRET=your-jwt-secret

# Frontend URLs (CORS)
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_ALT=http://localhost:5174
PRODUCTION_URL=https://cyber-ai-eta.vercel.app

# Server Port
PORT=3000

# AI Services
GOOGLE_AI_KEY=your-google-ai-key
OPENROUTER_API_KEY=your-openrouter-key
DEEPSEEK_API_KEY=your-deepseek-key

# Pinecone (Vector DB)
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX=your-index-name

# ImageKit
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_URL_ENDPOINT=your-url-endpoint

# Serper (Web Search)
SERPER_API_KEY=your-serper-key
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:3000
```

---

## 🐳 Docker Deployment

### Using Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Docker Compose Services
| Service | Port | Description |
|---------|------|-------------|
| backend | 3000 | Node.js API Server |
| frontend | 5173 | Vite Dev Server |

### Manual Docker Build
```bash
# Build backend
cd Backend
docker build -t cyber-ai-backend .

# Build frontend
cd chat
docker build -t cyber-ai-frontend .
```

---

## 📝 Remaining Work

### Priority Tasks
- [ ] Update URLs in action folder (`socket.js`, `Home.jsx`, `.env`)
- [ ] Frontend input length validation
- [ ] Redirect to chat after chat creation
- [ ] Handle empty message array (`.length === 0`)

### Frontend Updates Needed
1. Update socket connection URL in `chat/src/socket.js`
2. Update API URL in `chat/src/page/Home.jsx`
3. Update environment variables in `chat/.env`
4. Push changes after URL updates

### Validation Improvements
- Add input length validation in chat input
- Implement redirect after successful chat creation
- Handle edge case when messages array is empty

---

## 📚 API Documentation

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### Chat Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chat` | Get all chats |
| POST | `/api/chat` | Create new chat |
| DELETE | `/api/chat/:id` | Delete chat |
| GET | `/api/chat/:id/messages` | Get chat messages |

### Socket Events
| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Client → Server | Initial connection |
| `send-message` | Client → Server | Send user message |
| `ai-response` | Server → Client | Receive AI response |
| `typing` | Bidirectional | Typing indicator |

---

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- CORS configuration
- Rate limiting with `express-rate-limit`
- Password hashing with `bcryptjs`

---

## 📄 License

ISC License

---


## 🙏 Acknowledgments

- Google AI for Gemini API
- OpenRouter for multi-model access
- Pinecone for vector database
- ImageKit for image storage
