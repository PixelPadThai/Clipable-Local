
import { clipboardService } from './clipboardService.js';

export const clipboardOperations = {
  async getClipboardContent(areaName) {
    try {
      // For now, return empty string until server is connected
      return localStorage.getItem(`clipboard_${areaName}`) || '';
    } catch (error) {
      console.error('Error getting clipboard content:', error);
      return '';
    }
  },

  async updateClipboardContent(areaName, content) {
    try {
      // Save to localStorage as fallback
      localStorage.setItem(`clipboard_${areaName}`, content);
      
      // If connected to server, sync there too
      if (clipboardService.isConnected && clipboardService.ws) {
        clipboardService.ws.send(JSON.stringify({
          type: 'update',
          area: areaName,
          content: content
        }));
      }
    } catch (error) {
      console.error('Error updating clipboard content:', error);
    }
  },

  subscribeToClipboardChanges(areaName, callback) {
    // Set up listener for server messages
    const messageHandler = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'update' && data.area === areaName) {
          callback(data.content);
        }
      } catch (error) {
        console.error('Error parsing server message:', error);
      }
    };

    if (clipboardService.ws) {
      clipboardService.ws.addEventListener('message', messageHandler);
    }

    // Return unsubscribe function
    return () => {
      if (clipboardService.ws) {
        clipboardService.ws.removeEventListener('message', messageHandler);
      }
    };
  }
};
