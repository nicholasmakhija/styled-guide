export const dispatchCustomEvent = <T>(
  eventType: string,
  eventDetail: T
) => {
  const event = new CustomEvent(eventType, {
    detail: eventDetail
  });

  document.dispatchEvent(event);
};
