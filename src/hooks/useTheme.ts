'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

let currentTheme: Theme = 'dark';
const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((callback) => callback());
}

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return 'dark';
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function setThemeGlobally(newTheme: Theme) {
  currentTheme = newTheme;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('sortmind-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (e) {
      // Ignore localStorage errors
    }
  }
  notify();
}

export function toggleThemeGlobally() {
  if (typeof window === 'undefined') return;
  const domAttr = document.documentElement.getAttribute('data-theme') as Theme | null;
  const active = domAttr === 'light' || domAttr === 'dark' ? domAttr : currentTheme;
  const next: Theme = active === 'dark' ? 'light' : 'dark';
  setThemeGlobally(next);
}

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    setMounted(true);

    // Sync state on client mount with actual DOM / localStorage
    const domAttr = document.documentElement.getAttribute('data-theme') as Theme | null;
    const saved = localStorage.getItem('sortmind-theme') as Theme | null;

    let initial: Theme = 'dark';
    if (domAttr === 'light' || domAttr === 'dark') {
      initial = domAttr;
    } else if (saved === 'light' || saved === 'dark') {
      initial = saved;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initial = prefersDark ? 'dark' : 'light';
    }

    setThemeGlobally(initial);

    // Listen to storage events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'sortmind-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeGlobally(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    toggleThemeGlobally();
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    mounted,
  };
}
