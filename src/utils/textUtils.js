
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr);
      return false;
    }
  }
};

export const countWords = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

export const countCharacters = (text) => {
  return text.length;
};

export const estimateTokens = (text) => {
  return Math.ceil(text.length / 4); // Rough estimation
};
