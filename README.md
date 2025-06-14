# 📋✨ Clipable

> **A beautiful, real-time synchronized clipboard application that seamlessly shares text across multiple devices with stunning visual effects**

Clipable transforms the simple concept of a clipboard into a magical experience. With flowing gradient animations, interactive backgrounds, and instant synchronization, it's not just a tool—it's a work of art that happens to be incredibly useful.

## 🌟 Features

### 🔄 **Real-time Magic**
- **Instant Synchronization**: Text appears across all devices as you type—no delays, no refresh needed
- **Two Text Areas**: Independent spaces for organizing different types of content
- **Auto-save**: Content saves automatically as you type (500ms debounce)

### 🎨 **Beautiful Design**
- **Dynamic Background**: Animated starry night sky with flowing gradient hearts
- **Interactive Logos**: Beautiful SVG animations that respond to your focus
- **Glassmorphism UI**: Modern glass effects with perfect transparency
- **Flowing Gradients**: Stunning color transitions throughout the interface

### ⚡ **Smart Features**
- **One-click Copy**: Copy any text area content to your clipboard instantly
- **Live Statistics**: Real-time character, word, and GPT-4 token counting
- **Connection Status**: See how many devices are actively connected
- **Focus Animations**: Logos come alive when you interact with text areas

### 📱 **Cross-platform**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Network Access**: Access from any device on your network
- **Local Storage**: No external dependencies—uses local JSON file storage
- **Browser Support**: Works in all modern browsers

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite ⚛️
- **Backend**: Node.js + Express + WebSocket 🚀
- **Database**: Local JSON file (`clipboard-db.json`) 📄
- **Real-time**: WebSocket connections for instant sync ⚡
- **Styling**: Pure CSS with glassmorphism effects 🎨
- **Font**: Inter (Google Fonts) 🔤

## 🏃‍♂️ Quick Start

### 1️⃣ **Install Dependencies**
```bash
npm install
```

### 2️⃣ **Launch Clipable**
```bash
npm run dev
```

### 3️⃣ **Access Anywhere**
- **Frontend**: http://192.168.1.5:5555/ 🌐
- **Backend API**: http://192.168.1.5:5554/ 📡
- **Server Status**: http://192.168.1.5:5554/api/status 📊

### 4️⃣ **Start Creating**
- Open Clipable from any device on your network
- Click on either text area and start typing
- Watch the magic happen as your text appears instantly on all connected devices! ✨

## 🎮 Commands

| Command | Description |
|---------|-------------|
| `npm run server` | 🖥️ Start only the backend server (port 5554) |
| `npm run client` | 🌐 Start only the frontend client (port 5555) |
| `npm run dev` | 🚀 Start both server and client together |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview production build |

## ✨ What Makes Clipable Special

### 🎭 **Interactive Animations**
- **Starry Background**: Animated stars that gently drift across the screen
- **Gradient Hearts**: Beautiful SVG logos with flowing color animations
- **Focus Response**: Logos become more vibrant and animated when you focus on text areas
- **Smooth Transitions**: Every interaction feels fluid and responsive

### 📊 **Smart Analytics**
- **Character Count**: Live count of characters in each text area
- **Word Count**: Real-time word counting as you type
- **Token Estimation**: Approximate GPT-4 token count for AI workflows
- **Connection Monitor**: See exactly how many devices are connected

### 🔗 **Seamless Sync**
1. **WebSocket Connection**: Each client establishes a real-time connection
2. **Auto-save**: Content saves automatically after 500ms of inactivity
3. **Instant Broadcast**: Changes broadcast to all connected devices immediately
4. **Smart Conflict Resolution**: Handles multiple users editing gracefully

## 🌐 Network Configuration

Clipable runs on your local network for maximum privacy and speed:

- **Frontend**: `192.168.1.5:5555` (network accessible)
- **Backend**: `192.168.1.5:5554` (network accessible)

### 🔧 **Custom IP Setup**
To change the IP address, update `src/config.js`:
```javascript
export const SERVER_CONFIG = {
  httpUrl: 'http://YOUR_IP:5554',
  wsUrl: 'ws://YOUR_IP:5554'
};
```

## 🛠️ API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/clipboard/:areaName` | GET | 📥 Get content for a specific area |
| `/api/clipboard/:areaName` | POST | 📤 Update content for a specific area |
| `/api/status` | GET | 📊 Get server status and client count |

## 🎯 Perfect For

### 💼 **Professional Use**
- **Code Snippets**: Share code between development environments
- **Quick Notes**: Jot down thoughts accessible from any device
- **Team Collaboration**: Real-time text sharing with team members
- **Content Review**: Compare different versions of text side-by-side

### 🏠 **Personal Use**
- **Cross-device Transfer**: Move text between phone and computer effortlessly
- **Temporary Storage**: Use as a cloud-based notepad
- **Multi-device Development**: Sync content between multiple machines
- **Text Organization**: Keep different types of content organized

## 🌍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome/Chromium | 80+ ✅ |
| Firefox | 75+ ✅ |
| Safari | 13+ ✅ |
| Edge | 80+ ✅ |

## 📁 Project Structure

```
src/
├── components/
│   ├── ClipboardArea.jsx      # 📝 Text area with stats and copy button
│   ├── CopyButton.jsx         # 📋 Copy to clipboard functionality
│   ├── ConnectionStatus.jsx   # 🔗 Connection and session status
│   ├── SaveIndicator.jsx      # 💾 Save status indicator
│   └── AnimatedLogo.jsx       # ✨ Animated SVG background logos
├── hooks/
│   └── useClipboard.js        # 🎣 Custom hook for clipboard state
├── services/
│   └── clipboardService.js    # 🌐 WebSocket client and API calls
├── utils/
│   └── textUtils.js           # 🔧 Text utilities (counting, copying)
├── config.js                  # ⚙️ Application constants
├── App.jsx                    # 🏠 Main application component
├── App.css                    # 🎨 Glass effect and animations
└── index.css                  # 📐 Base styling
```

## 🚀 Performance Features

- ⚡ **Debounced Auto-save**: Efficient 500ms delay saves
- 🔌 **Optimized WebSocket**: Smart connection management
- 🎯 **React Optimization**: Minimized re-renders and updates
- 📏 **Text Limits**: 100,000 characters per area prevents overload
- 🔄 **Auto-reconnection**: Handles network interruptions gracefully
- 🧠 **Smart Updates**: Filters external vs user updates intelligently

## 🐛 Troubleshooting

### 🔍 **Debugging Tools**
- Server logs all connections and updates to console
- Client WebSocket events logged in browser console
- Check `/api/status` endpoint for server health
- Connection status visible in the UI

### 🛠️ **Common Issues**
- **Can't connect**: Check if server is running on port 5554
- **No real-time sync**: Verify WebSocket connection in browser console
- **Performance issues**: Ensure text doesn't exceed 100,000 characters

---

<div align="center">

**Built with ❤️ using React, Node.js, WebSocket, and beautiful animations**

🌟 **Star this project if you find it useful!** 🌟

</div>