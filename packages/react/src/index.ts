import { loadLocales } from "@langlayer/core";
import { useCallback, useEffect, useState } from "react";

export function useT() {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const t = useCallback(
    (key: string) => {
      return messages[key];
    },
    [messages],
  );

  useEffect(() => {
    loadLocales().then(setMessages).catch(console.error);
  }, []);

  return {
    t,
  };
}
