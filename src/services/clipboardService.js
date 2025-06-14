import { SERVER_CONFIG } from '../config.js';

class ClipboardService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map(); // areaName -> Set of callbacks
    this.isConnected = false;
    this.pendingUpdates = new Map(); // Store updates while disconnected
  }

  // Initialize WebSocket connection
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(SERVER_CONFIG.wsUrl);
        
        this.ws.onopen = () => {
          console.log('🔌 Connected to clipboard server');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          
          // Send any pending updates
          this.sendPendingUpdates();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('❌ Disconnected from clipboard server');
          this.isConnected = false;
          this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          this.isConnected = false;
          if (this.reconnectAttempts === 0) {
            reject(error);
          }
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  // Handle incoming WebSocket messages
  handleMessage(message) {
    const { type, areaName, content, data } = message;

    if (type === 'init') {
      // Initial data for all areas
      Object.entries(data).forEach(([area, content]) => {
        this.notifyListeners(area, content);
      });
    } else if (type === 'update') {
      // Real-time update for specific area
      this.notifyListeners(areaName, content);
    }
  }

  // Notify all listeners for a specific area
  notifyListeners(areaName, content) {
    const listeners = this.listeners.get(areaName);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(content);
        } catch (error) {
          console.error('❌ Error in listener callback:', error);
        }
      });
    }
  }

  // Attempt to reconnect
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('❌ Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
    
    setTimeout(() => {
      this.connect().catch(error => {
        console.error('❌ Reconnection failed:', error);
      });
    }, delay);
  }

  // Send pending updates after reconnection
  sendPendingUpdates() {
    this.pendingUpdates.forEach((content, areaName) => {
      this.sendUpdate(areaName, content);
    });
    this.pendingUpdates.clear();
  }

  // Send update via WebSocket
  sendUpdate(areaName, content) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'update',
        areaName,
        content
      }));
    } else {
      // Store update for later if not connected
      this.pendingUpdates.set(areaName, content);
    }
  }

  // Get clipboard content via HTTP API (fallback)
  async getClipboardContent(areaName) {
    try {
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/api/clipboard/${areaName}`);
      if (response.ok) {
        const data = await response.json();
        return data.content || '';
      } else {
        console.error('❌ Failed to fetch clipboard content:', response.status);
        return '';
      }
    } catch (error) {
      console.error('❌ Error fetching clipboard content:', error);
      return '';
    }
  }

  // Update clipboard content
  async updateClipboardContent(areaName, content) {
    try {
      // Emit save start event
      window.dispatchEvent(new CustomEvent('clipboard-save-start'));
      
      // Send via WebSocket for real-time updates
      this.sendUpdate(areaName, content);

      // Also send via HTTP API as backup
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/api/clipboard/${areaName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        console.error('❌ Failed to update clipboard via API:', response.status);
      }
      
      // Emit save end event
      window.dispatchEvent(new CustomEvent('clipboard-save-end'));
    } catch (error) {
      console.error('❌ Error updating clipboard:', error);
      // Store for retry if server is down
      this.pendingUpdates.set(areaName, content);
      
      // Emit save end event even on error
      window.dispatchEvent(new CustomEvent('clipboard-save-end'));
    }
  }

  // Subscribe to real-time changes for a specific area
  subscribeToClipboardChanges(areaName, callback) {
    if (!this.listeners.has(areaName)) {
      this.listeners.set(areaName, new Set());
    }
    this.listeners.get(areaName).add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(areaName);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(areaName);
        }
      }
    };
  }

  // Check server status
  async checkServerStatus() {
    try {
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/api/status`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('❌ Server status check failed:', error);
      return null;
    }
  }
}

// Create singleton instance
export const clipboardService = new ClipboardService();

// Auto-connect when module loads
clipboardService.connect().catch(error => {
  console.error('❌ Failed to connect to clipboard server:', error);
});

// Export individual functions for backward compatibility
export const clipboardOperations = {
  getClipboardContent: (areaName) => clipboardService.getClipboardContent(areaName),
  updateClipboardContent: (areaName, content) => clipboardService.updateClipboardContent(areaName, content),
  subscribeToClipboardChanges: (areaName, callback) => clipboardService.subscribeToClipboardChanges(areaName, callback)
}; 