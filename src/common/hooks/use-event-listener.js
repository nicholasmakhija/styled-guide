import { useEffect } from 'react';

/**
 * @param {string} eventType
 * @param {(e: Event | CustomEvent) => void} eventListener
 * @returns {void}
 */
export const useEventListener = (eventType, eventListener) => {
  useEffect(() => {
    document.addEventListener(eventType, eventListener);

    return () => {
      document.removeEventListener(eventType, eventListener);
    };
  }, [eventType, eventListener]);
};
