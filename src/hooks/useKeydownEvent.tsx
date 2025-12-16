import { useEffect } from "react";

interface UseKeydownEventProps {
  key: string;
  callback: () => void;
  ref?: React.RefObject<HTMLElement | null>;
}

export default function useKeydownEvent({
  key,
  callback,
  ref,
}: UseKeydownEventProps) {
  useEffect(() => {
    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === key) {
        callback();
      }
    };
    const element = ref?.current || window;
    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [callback, key, ref]);
}
