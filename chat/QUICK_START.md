# Quick Start Guide

## 🚀 Getting Started

### 1. Environment Setup
```bash
# Navigate to chat directory
cd /home/cyber-rebel/Desktop/cyber-ai/chat

# Copy environment file
cp .env.example .env

# Edit .env if needed (default is http://localhost:3000)
nano .env
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎨 What's New

### Dark Theme UI
- Login and Register pages now match the Landing page dark theme
- Consistent design across all pages
- Better contrast and readability

### Toast Notifications
Instead of browser alerts, you'll now see:
- ✅ Success toasts (green icon)
- ❌ Error toasts (red icon)
- ⏳ Loading toasts with spinners
- 💬 Custom confirmation toasts

### New Chat Modal
Click "New Chat" button to see:
- Modern modal dialog
- Character counter (50 chars max)
- Press ESC to close
- Auto-focus on input field

### Auto-Open Chats
When you create a new chat:
1. Modal appears
2. Enter chat title
3. Chat is created
4. **Automatically opens the new chat** 🎉

## 🔧 Configuration

### Change Backend API URL

Edit `.env` file:
```env
# Development
VITE_API_URL=http://localhost:3000

# Production
VITE_API_URL=https://your-production-api.com
```

**No code changes needed!** Just update the `.env` file and restart the dev server.

## 📝 Common Tasks

### Create a New Chat
1. Click the "+" or "New Chat" button in sidebar
2. Enter a descriptive title (e.g., "Python Help")
3. Click "Create Chat"
4. Chat opens automatically!

### Delete a Chat
1. Select a chat from sidebar
2. Click the delete/trash icon
3. Confirm in the toast notification
4. Chat is deleted!

### Login/Register
1. Dark themed forms
2. Real-time validation
3. Toast notifications for success/errors
4. Auto-redirect on success

## 🐛 Troubleshooting

### Toast not showing?
- Check browser console for errors
- Ensure `react-hot-toast` is installed
- Refresh the page

### API connection issues?
- Check `.env` file has correct `VITE_API_URL`
- Ensure backend is running on the specified URL
- Check browser console for CORS errors

### Chat not auto-opening?
- Check if backend returns chat `_id` in response
- Look for errors in browser console
- Verify chat was created in the chats list

## 📱 Mobile Support
All features work on mobile:
- Responsive design
- Touch-friendly buttons
- Mobile-optimized modals
- Swipe gestures supported

## 🎯 Next Steps
1. Test login/register flow
2. Create a few chats
3. Try the delete confirmation
4. Switch between chats
5. Enjoy the improved UX! 🎉
