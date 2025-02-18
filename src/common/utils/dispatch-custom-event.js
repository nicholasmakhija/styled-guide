/**
 * @template T
 * @param {string} eventType 
 * @param {T} eventDetail 
 * @returns {void}
 */
export const dispatchCustomEvent = (eventType, eventDetail) => {
  const event = new CustomEvent(eventType, {
    detail: eventDetail
  });

  document.dispatchEvent(event);
};
