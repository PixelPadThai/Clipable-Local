# 📋✨ Clipable Local

> **A beautiful, privacy-first clipboard application that runs completely locally - seamlessly sync text across all your devices with stunning visual effects, zero cloud dependency, and complete data privacy**

Clipable transforms the simple concept of a clipboard into a powerful, privacy-focused solution that stays entirely under your control. Share text instantly across all your devices through your local network—no cloud services, no external databases, no data collection, no privacy concerns. All your data is stored locally in a simple JSON file that you own and control!

![Screenshot 2568-06-16 at 20 39 02 (1)](https://github.com/user-attachments/assets/92be9541-d88c-40e0-bf21-04e41f8b4fd7)


![clipable-local](https://github.com/user-attachments/assets/beeab401-5e71-45ee-b2e7-a93a85fef66e)

![clipable-local-2](https://github.com/user-attachments/assets/2c65e9c1-1660-4aa2-b840-4da7139671a3)

![clipable-local-3](https://github.com/user-attachments/assets/0c56d084-f098-4b41-99b5-3320b9b7fc13)


## 🔒 **Privacy-First Design**

- **🏠 100% Local**: Everything runs on your computer and local network
- **📄 JSON File Storage**: Data stored in simple `clipboard-db.json` file
- **🚫 No Cloud**: Zero external services, APIs, or databases
- **🔐 Your Data**: Complete ownership and control of your information
- **🌐 Network Only**: Syncs only within your local network
- **🛡️ Zero Tracking**: No analytics, no telemetry, no data collection

## 🌟 Features

### 🔄 **Real-time Magic**
- **Instant Synchronization**: Text appears across all devices as you type—no delays, no refresh needed
- **Two Text Areas**: Independent spaces for organizing different types of content
- **Auto-save**: Content saves automatically to local JSON file (500ms debounce)

### ⚡ **Smart Features**
- **One-click Copy**: Copy any text area content to your clipboard instantly
- **Live Statistics**: Real-time character, word, and GPT-4 token counting
- **Connection Status**: See how many devices are actively connected
- **Focus Animations**: Beautiful logos that respond to your interactions

### 📱 **Cross-platform**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Network Access**: Access from any device on your local network
- **Local JSON Storage**: Simple, readable file format you can backup easily
- **Browser Support**: Works in all modern browsers

### 🎨 **Beautiful Design**
- **Dynamic Background**: Animated flowing gradient hearts
- **Interactive Logos**: Beautiful SVG animations that respond to your focus
- **Glassmorphism UI**: Modern glass effects with perfect transparency
- **Flowing Gradients**: Stunning color transitions throughout the interface

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite ⚛️
- **Backend**: Node.js + Express + WebSocket 🚀
- **Database**: Local JSON file (`clipboard-db.json`) 📄
- **Real-time**: WebSocket connections for instant local sync ⚡
- **Styling**: Pure CSS with glassmorphism effects 🎨
- **Dependencies**: Minimal, no cloud services, no external APIs

## 🏃‍♂️ Quick Start

### 1️⃣ **Install Dependencies**
```bash
npm install
```

### 2️⃣ **Launch Clipable**
```bash
npm run dev
```

### 3️⃣ **Access Anywhere on Your Network**
- **Frontend**: http://localhost:5555/ 🌐 (or your network IP, see [Custom IP Setup](#-custom-ip-setup))
- **Backend API**: http://localhost:5554/ 📡 
- **Server Status**: http://localhost:5554/api/status 📊

### 4️⃣ **Start Creating**
- Open Clipable from any device on your local network
- Click on either text area and start typing
- Watch the magic happen as your text appears instantly on all connected devices! ✨
- Your data is automatically saved to `clipboard-db.json` in your project folder

## 🎮 Commands

| Command | Description |
|---------|-------------|
| `npm run server` | 🖥️ Start only the backend server (port 5554) |
| `npm run client` | 🌐 Start only the frontend client (port 5555) |
| `npm run dev` | 🚀 Start both server and client together |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview production build |

## ✨ What Makes Clipable Special

### 🔒 **Privacy & Control**
- **Local Data**: All content stored in `clipboard-db.json` on your machine
- **No Accounts**: No sign-up, login, or user accounts required
- **Full Control**: You own your data file and can backup/restore anytime
- **Offline Ready**: Works without internet connection once running
- **Simple Storage**: Human-readable JSON format you can inspect anytime

### 📊 **Smart Analytics**
- **Character Count**: Live count of characters in each text area
- **Word Count**: Real-time word counting as you type
- **Token Estimation**: Approximate GPT-4 token count for AI workflows
- **Connection Monitor**: See exactly how many devices are connected

### 🔗 **Seamless Local Sync**
1. **WebSocket Connection**: Each client establishes a real-time connection to your local server
2. **Auto-save**: Content saves automatically to JSON file after 500ms of inactivity
3. **Instant Broadcast**: Changes broadcast to all connected devices immediately
4. **Smart Conflict Resolution**: Handles multiple users editing gracefully
5. **JSON File**: Simple `{"area_1": "content", "area_2": "content"}` structure

### 🎭 **Interactive Animations**
- **Starry Background**: Animated stars that gently drift across the screen
- **Gradient Hearts**: Beautiful SVG logos with flowing color animations
- **Focus Response**: Logos become more vibrant and animated when you focus on text areas
- **Smooth Transitions**: Every interaction feels fluid and responsive

## 🌐 Network Configuration

Clipable runs on your local network for maximum privacy and speed:

- **Default**: `localhost:5555` for same device access
- **Network**: Use your computer's IP address for multi-device access

### 🔧 **Custom IP Setup for Multi-Device Access**

To access from other devices on your network, update `src/config.js`:

**Find your IP address:**
- **Windows**: Run `ipconfig` in Command Prompt
- **Mac/Linux**: Run `ifconfig` or `ip addr` in Terminal

**Update the config:**
```javascript
export const SERVER_CONFIG = {
  httpUrl: 'http://YOUR_IP:5554',    // Replace YOUR_IP with your computer's IP
  wsUrl: 'ws://YOUR_IP:5554'         // Replace YOUR_IP with your computer's IP
};
```

**Example**: If your computer's IP is `192.168.1.100`:
```javascript
export const SERVER_CONFIG = {
  httpUrl: 'http://192.168.1.100:5554',
  wsUrl: 'ws://192.168.1.100:5554'
};
```

Then access from any device: `http://192.168.1.100:5555`

## 🗂️ Local Data Storage

### 📄 **JSON File Structure**
Your data is stored in `clipboard-db.json`:
```json
{
  "area_1": "Your text content here",
  "area_2": "More content in the second area"
}
```

### 💾 **Backup & Restore**
- **Backup**: Simply copy `clipboard-db.json` to save your data
- **Restore**: Replace `clipboard-db.json` with your backup
- **Migrate**: Move the JSON file to run Clipable anywhere
- **Inspect**: Open the file in any text editor to view your data

## 🛠️ Local API Reference

Your local server provides these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/clipboard/area_1` | GET | 📥 Get content for area 1 |
| `/api/clipboard/area_2` | GET | 📥 Get content for area 2 |
| `/api/clipboard/area_1` | POST | 📤 Update content for area 1 |
| `/api/clipboard/area_2` | POST | 📤 Update content for area 2 |
| `/api/status` | GET | 📊 Get server status and client count |

## 🎯 Perfect For

### 💼 **Professional Use**
- **Code Snippets**: Share code between development environments locally
- **Quick Notes**: Jot down thoughts accessible from any local device
- **Team Collaboration**: Real-time text sharing within your local network
- **Content Review**: Compare different versions of text side-by-side
- **Privacy-Sensitive Work**: Keep sensitive content off the cloud

### 🏠 **Personal Use**
- **Cross-device Transfer**: Move text between phone and computer without cloud
- **Private Notes**: Store personal content with complete privacy
- **Multi-device Development**: Sync content between multiple local machines
- **Temporary Storage**: Use as a private, local notepad
- **Backup Control**: Full control over your data backup and storage

## 🌍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome/Chromium | 80+ ✅ |
| Firefox | 75+ ✅ |
| Safari | 13+ ✅ |
| Edge | 80+ ✅ |

## 📁 Project Structure

```
clipable-local/
├── src/
│   ├── components/
│   │   ├── ClipboardArea.jsx      # 📝 Text area with stats and copy button
│   │   ├── CopyButton.jsx         # 📋 Copy to clipboard functionality
│   │   ├── ConnectionStatus.jsx   # 🔗 Connection status display
│   │   ├── SaveIndicator.jsx      # 💾 Save status indicator
│   │   └── AnimatedLogo.jsx       # ✨ Animated SVG background logos
│   ├── services/
│   │   └── clipboardOperations.js # 🌐 Local API calls and WebSocket client
│   ├── contexts/
│   │   └── AuthContext.jsx        # 👤 Simple local auth context
│   ├── hooks/
│   │   └── useClipboard.js        # 🎣 Custom hook for clipboard state
│   ├── utils/
│   │   └── textUtils.js           # 🔧 Text utilities (counting, copying)
│   ├── config.js                  # ⚙️ Local server configuration
│   ├── App.jsx                    # 🏠 Main application component
│   └── App.css                    # 🎨 Beautiful animations and styling
├── clipboard-db.json              # 📄 Your local data storage
├── server.js                      # 🖥️ Local Express + WebSocket server
└── package.json                   # 📦 Dependencies (no cloud services!)
```

## 🚀 Performance Features

- ⚡ **Debounced Auto-save**: Efficient 500ms delay saves to JSON
- 🔌 **Optimized WebSocket**: Smart local connection management
- 🎯 **React Optimization**: Minimized re-renders and updates
- 📏 **Text Limits**: 100,000 characters per area prevents overload
- 🔄 **Auto-reconnection**: Handles network interruptions gracefully
- 🧠 **Smart Updates**: Filters external vs user updates intelligently
- 📄 **Simple Storage**: Efficient JSON file operations

## 🐛 Troubleshooting

### 🔍 **Debugging Tools**
- Server logs all connections and updates to console
- Client WebSocket events logged in browser console
- Check `/api/status` endpoint for server health
- Connection status visible in the UI
- Inspect `clipboard-db.json` file directly

### 🛠️ **Common Issues**
- **Can't connect**: Check if server is running on port 5554
- **No real-time sync**: Verify WebSocket connection in browser console
- **File not saving**: Check file permissions in project directory
- **Network access**: Update `src/config.js` with correct IP address
- **Performance issues**: Ensure text doesn't exceed 100,000 characters

### 🔧 **File Issues**
- **Missing data**: Check if `clipboard-db.json` exists in project root
- **Corrupted data**: Restore from backup or delete file to reset
- **Permissions**: Ensure write access to project directory

---

<div align="center">

**🔒 Built with Privacy in Mind - Your Data Stays Local**

**🚀 No Cloud • No Tracking • No Accounts • Just You and Your Data**

---

**Built with ❤️ using React, Node.js, WebSocket, and beautiful animations**

🌟 **Star this project if you love local-first, privacy-focused tools!** 🌟

</div>
