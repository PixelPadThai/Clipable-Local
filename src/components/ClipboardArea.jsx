
import { useState, useEffect } from 'react';

function ClipboardArea({ areaName, placeholder, onFocus, onBlur }) {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const tokens = Math.ceil(chars / 4); // Rough estimation

    setWordCount(words);
    setCharCount(chars);
    setTokenCount(tokens);
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="text-area-wrapper">
      <div className="textarea-container">
        <div className="floating-stats">
          <span className="word-count">{wordCount} words</span>
          <span className="char-count">{charCount} chars</span>
          <span className="token-count">{tokenCount} tokens</span>
        </div>
        
        <div className="floating-copy">
          <button className="copy-button" onClick={handleCopy}>
            Copy
          </button>
        </div>

        <textarea
          className="glass-textarea"
          value={text}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default ClipboardArea;
