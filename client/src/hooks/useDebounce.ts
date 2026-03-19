'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value during rapid changes (e.g., typing in a search bar).
 * @param value The value to be debounced.
 * @param delay The delay in milliseconds before the debounced value updates.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timer if the value changes before the delay is reached
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
