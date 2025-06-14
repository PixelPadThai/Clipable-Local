import { useClipboard } from '../hooks/useClipboard.js';
import { MAX_TEXT_LENGTH } from '../config.js';
import { countWords, countCharacters, estimateTokens, formatNumber } from '../utils/textUtils.js';
import CopyButton from './CopyButton.jsx';

function ClipboardArea({ areaName, placeholder, onFocus, onBlur }) {
  const { content, updateContent, isLoading } = useClipboard(areaName);

  const handleChange = (event) => {
    const newContent = event.target.value;
    if (newContent.length <= MAX_TEXT_LENGTH) {
      updateContent(newContent);
    }
  };

  const handleFocus = (event) => {
    // Call the parent onFocus handler for logo animation
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = (event) => {
    // Call the parent onBlur handler for logo animation
    if (onBlur) {
      onBlur();
    }
  };

  // Fix for paste bug - prevent interference with external updates
  const handlePaste = (event) => {
    // Let the default paste behavior happen, then update our state
    setTimeout(() => {
      const textarea = event.target;
      updateContent(textarea.value);
    }, 0);
  };

  const wordCount = countWords(content);
  const charCount = countCharacters(content);
  const tokenCount = estimateTokens(content);

  return (
    <div className="text-area-wrapper">
      <div className="textarea-container">
        <textarea
          className="glass-textarea"
          value={content}
          onChange={handleChange}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={isLoading}
          maxLength={MAX_TEXT_LENGTH}
          autoComplete="off"
          spellCheck="false"
        />
        <div className="floating-stats">
          <span className="word-count">{formatNumber(wordCount)} words</span>
          <span className="char-count">{formatNumber(charCount)} chars</span>
          <span className="token-count">~{formatNumber(tokenCount)} tokens</span>
        </div>
        <div className="floating-copy">
          <CopyButton text={content} className="area-copy-button" />
        </div>
      </div>
    </div>
  );
}

export default ClipboardArea; 