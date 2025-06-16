import { SERVER_CONFIG } from '../config.js';

// Shared WebSocket connection manager
class WebSocketManager {
  constructor() {
    this.ws = null;
    this.callbacks = new Map(); // areaName -> Set of callbacks
    this.connectionCountCallbacks = new Set(); // Callbacks for connection count updates
    this.isConnected = false;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.connectionTimeout = null;
  }

  async connect() {
    if (this.isConnecting) {
      return; // Already attempting to connect
    }
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    this.isConnecting = true;

    // First, check if server is available
    try {
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/api/status`, {
        timeout: 5000
      });
      if (!response.ok) {
        throw new Error('Server not ready');
      }
    } catch (error) {
      console.log('Server not ready, retrying WebSocket connection...');
      this.isConnecting = false;
      this.scheduleReconnect();
      return;
    }

    try {
      // Close existing connection if it exists
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }

      this.ws = new WebSocket(SERVER_CONFIG.wsUrl);
      
      // Set a connection timeout
      this.connectionTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
          console.log('WebSocket connection timeout');
          this.ws.close();
        }
      }, 10000); // 10 second timeout

      this.ws.onopen = () => {
        console.log('📡 Shared WebSocket connected');
        this.isConnected = true;
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
      };

      this.ws.onclose = (event) => {
        console.log('📡 Shared WebSocket disconnected', event.code, event.reason);
        this.isConnected = false;
        this.isConnecting = false;
        
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
        
        // Only attempt reconnect if there are active callbacks and it wasn't a normal closure
        if ((this.callbacks.size > 0 || this.connectionCountCallbacks.size > 0) && event.code !== 1000) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (error) => {
        console.error('Shared WebSocket error:', error);
        this.isConnected = false;
        this.isConnecting = false;
        
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'init') {
            // Send initial data to all registered callbacks
            this.callbacks.forEach((callbackSet, areaName) => {
              if (message.data && message.data[areaName] !== undefined) {
                callbackSet.forEach(callback => callback(message.data[areaName]));
              }
            });
          } else if (message.type === 'update') {
            // Send update to callbacks for this specific area
            const callbackSet = this.callbacks.get(message.areaName);
            if (callbackSet) {
              callbackSet.forEach(callback => callback(message.content));
            }
          } else if (message.type === 'connection_count') {
            // Broadcast connection count to all registered callbacks
            this.connectionCountCallbacks.forEach(callback => {
              callback(message.count);
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts && !this.reconnectTimeout) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      this.reconnectTimeout = setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
        this.reconnectTimeout = null;
        this.connect();
      }, delay);
    } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('Max reconnection attempts reached. WebSocket connection failed.');
    }
  }

  subscribe(areaName, callback) {
    if (!this.callbacks.has(areaName)) {
      this.callbacks.set(areaName, new Set());
    }
    this.callbacks.get(areaName).add(callback);

    // Ensure connection is established
    this.connect();

    // Return unsubscribe function
    return () => {
      const callbackSet = this.callbacks.get(areaName);
      if (callbackSet) {
        callbackSet.delete(callback);
        if (callbackSet.size === 0) {
          this.callbacks.delete(areaName);
        }
      }
      
      // Close connection if no more callbacks
      if (this.callbacks.size === 0 && this.connectionCountCallbacks.size === 0 && this.ws) {
        this.ws.close(1000, 'No more subscribers'); // Normal closure
        this.ws = null;
        this.isConnected = false;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
      }
    };
  }

  subscribeToConnectionCount(callback) {
    this.connectionCountCallbacks.add(callback);

    // Ensure connection is established
    this.connect();

    // Return unsubscribe function
    return () => {
      this.connectionCountCallbacks.delete(callback);
      
      // Close connection if no more callbacks
      if (this.callbacks.size === 0 && this.connectionCountCallbacks.size === 0 && this.ws) {
        this.ws.close(1000, 'No more subscribers'); // Normal closure
        this.ws = null;
        this.isConnected = false;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'Manual disconnect'); // Normal closure
      this.ws = null;
    }
    this.isConnected = false;
    this.isConnecting = false;
    this.callbacks.clear();
    this.connectionCountCallbacks.clear();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
  }
}

// Create shared instance
const wsManager = new WebSocketManager();

export const clipboardOperations = {
  // For local operation, we don't need room codes - we'll use direct areas
  async createRoom() {
    // Return a simple success indicator since we're using local storage
    return 'local';
  },

  async joinRoom(roomCode) {
    // For local operation, always return true since there's no actual room system
    return true;
  },

  async getClipboardContent(roomCode, areaName) {
    try {
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/api/clipboard/${areaName}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return ''; // Return empty string if area doesn't exist yet
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.content || '';
    } catch (error) {
      console.error('Error getting clipboard content:', error);
      return '';
    }
  },

  async updateClipboardContent(roomCode, areaName, content) {
    try {
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/api/clipboard/${areaName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating clipboard content:', error);
      throw error;
    }
  },

  subscribeToClipboardChanges(roomCode, areaName, callback) {
    // Use the shared WebSocket manager
    return wsManager.subscribe(areaName, callback);
  },

  subscribeToConnectionCount(callback) {
    // Subscribe to real-time connection count updates
    return wsManager.subscribeToConnectionCount(callback);
  }
};
