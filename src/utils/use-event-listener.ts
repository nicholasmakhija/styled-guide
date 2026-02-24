import { useEffect } from 'react';
import * as EVENTS from '@constants/events';

type CustomEventNames = typeof EVENTS[keyof typeof EVENTS];
type AllowedEvents = keyof DocumentEventMap | CustomEventNames;
type EventHandler<T> =
  | ((event: CustomEvent<T>) => void)
  | ((event: KeyboardEvent) => void)
  | ((event: Event) => void);

export const useEventListener = <T>(
  eventType: AllowedEvents,
  eventListener: EventHandler<T>
): void => {
  useEffect(() => {
    document.addEventListener(eventType, eventListener as EventListener);

    return () => {
      document.removeEventListener(eventType, eventListener as EventListener);
    };
  }, [eventType, eventListener]);
};
