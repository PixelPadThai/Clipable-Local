// Local server configuration
export const SERVER_CONFIG = {
  httpUrl: 'http://192.168.1.5:5554',
  wsUrl: 'ws://192.168.1.5:5554'
};

// Application constants
export const AUTO_SAVE_DELAY = 500; // milliseconds
export const MAX_TEXT_LENGTH = 100000; // characters

// Token estimation (rough GPT-4 approximation: 1 token ≈ 4 characters)
export const CHARS_PER_TOKEN = 4; 