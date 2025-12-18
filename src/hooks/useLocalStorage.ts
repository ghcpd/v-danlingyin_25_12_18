import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const value = JSON.stringify(storedValue);
      window.localStorage.setItem(key, value);
    } catch {
      // ignore write errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
