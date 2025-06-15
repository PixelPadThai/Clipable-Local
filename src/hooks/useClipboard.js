
import { useState, useEffect, useCallback, useRef } from 'react';
import { clipboardOperations } from '../services/clipboardOperations.js';
import { AUTO_SAVE_DELAY } from '../config.js';

export function useClipboard(areaName) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const isExternalUpdateRef = useRef(false);
  const lastUserUpdateRef = useRef(0);

  // Debounced save function
  const debouncedSave = useCallback(async (newContent) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      await clipboardOperations.updateClipboardContent(areaName, newContent);
      setIsSaving(false);
    }, AUTO_SAVE_DELAY);
  }, [areaName]);

  // Update content function
  const updateContent = useCallback((newContent) => {
    // Mark this as a user update
    lastUserUpdateRef.current = Date.now();
    
    // Clear the external update flag since this is a user action
    isExternalUpdateRef.current = false;
    
    setContent(newContent);
    debouncedSave(newContent);
  }, [debouncedSave]);

  // Initialize clipboard content and subscription
  useEffect(() => {
    let isMounted = true;

    const initializeClipboard = async () => {
      try {
        const initialContent = await clipboardOperations.getClipboardContent(areaName);
        if (isMounted) {
          setContent(initialContent);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing clipboard:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up real-time subscription
    const setupSubscription = () => {
      unsubscribeRef.current = clipboardOperations.subscribeToClipboardChanges(
        areaName,
        (newContent) => {
          if (isMounted) {
            // Only apply external updates if they didn't happen right after a user update
            const timeSinceLastUserUpdate = Date.now() - lastUserUpdateRef.current;
            if (timeSinceLastUserUpdate > 1000) { // 1 second buffer
              isExternalUpdateRef.current = true;
              setContent(newContent);
            }
          }
        }
      );
    };

    initializeClipboard();
    setupSubscription();

    return () => {
      isMounted = false;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [areaName]);

  return {
    content,
    updateContent,
    isLoading,
    isSaving
  };
}
