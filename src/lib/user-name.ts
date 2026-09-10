import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "forma.user-name";

const listeners = new Set<(name: string) => void>();

export function readUserName(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function writeUserName(name: string) {
  const trimmed = name.trim();
  try {
    window.localStorage.setItem(STORAGE_KEY, trimmed);
  } catch {
    /* armazenamento indisponível */
  }
  listeners.forEach((listener) => listener(trimmed));
}

export function useUserName() {
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setName(readUserName());
    setReady(true);
    const listener = (value: string) => setName(value);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const save = useCallback((value: string) => writeUserName(value), []);

  return { name, ready, saveName: save };
}
