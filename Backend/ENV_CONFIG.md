# Backend Environment Configuration

## Overview
The backend now uses environment variables for all frontend URLs and configuration.

## Files Updated

### 1. `.env` file
Added frontend URL configuration:
```env
# Frontend URLs (CORS)
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_ALT=http://localhost:5174
PRODUCTION_URL=https://cyber-ai-eta.vercel.app

# Server Port
PORT=3000
```

### 2. `src/index.js`
- CORS configuration now uses environment variables
- Supports multiple frontend URLs from `.env`
- Automatically filters out undefined values

### 3. `src/socket/socket.js`
- Socket.IO CORS configuration uses environment variables
- Same allowed origins as express CORS

### 4. `server.js`
- Server port now uses `PORT` from `.env`
- Falls back to 3000 if not specified

## Usage

### Development
Default values work out of the box:
```bash
cd Backend
npm start
```

### Production
Update `.env` with production URLs:
```env
FRONTEND_URL=https://your-frontend.com
FRONTEND_URL_ALT=https://www-frontend.com
PRODUCTION_URL=https://your-production.vercel.app
PORT=8080
```

## Benefits
✅ No hardcoded URLs in code
✅ Easy to change frontend URLs
✅ Single source of truth (`.env` file)
✅ Different configs for dev/prod
✅ Secure and maintainable

## Example .env Structure
```env
# Authentication
JWT_SECRET="your_secret"

# Database
Mongodb_url='your_mongodb_url'

# APIs
GEMINI_API_KEY='your_api_key'
PINECONE_API='your_pinecone_key'
IMAGEKIT_PRIVATE_KEY='your_private_key'
IMAGEKIT_PUBLIC_KEY='your_public_key'
IMAGEKIT_URL_ENDPOINT='your_endpoint'

# Frontend URLs (CORS)
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_ALT=http://localhost:5174
PRODUCTION_URL=https://cyber-ai-eta.vercel.app

# Server
PORT=3000
```

## Testing CORS
1. Start backend: `npm start`
2. Check console for: `Server listening on port 3000`
3. Frontend should connect without CORS errors
4. Test from: http://localhost:5173 or http://localhost:5174
