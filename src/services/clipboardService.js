
import { SERVER_CONFIG } from '../config.js';

class ClipboardService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    try {
      this.ws = new WebSocket(SERVER_CONFIG.wsUrl);
      
      this.ws.onopen = () => {
        console.log('Connected to clipboard server');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };

      this.ws.onclose = () => {
        console.log('Disconnected from clipboard server');
        this.isConnected = false;
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };

      this.ws.onmessage = (event) => {
        console.log('Received message:', event.data);
      };
    } catch (error) {
      console.error('Failed to connect to server:', error);
      this.isConnected = false;
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}`);
        this.connect();
      }, 2000 * this.reconnectAttempts);
    }
  }

  async checkServerStatus() {
    try {
      const response = await fetch(`${SERVER_CONFIG.httpUrl}/status`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to check server status:', error);
    }
    return null;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}

export const clipboardService = new ClipboardService();

// Auto-connect when the service is imported
clipboardService.connect();
