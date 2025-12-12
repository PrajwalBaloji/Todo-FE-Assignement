import { useEffect } from "react";

interface UseKeydownEventProps {
  key: string;
  callback: () => void;
}

export default function useKeydownEvent({
  key,
  callback,
}: UseKeydownEventProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback, key]);
}
