
import { useState } from 'react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-button ${copied ? 'copied' : ''}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default CopyButton;
