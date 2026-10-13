'use client';

import { useState, useCallback } from 'react';
import { UndoLogItem } from '@/types/files';

export function useUndoManager() {
  const [history, setHistory] = useState<UndoLogItem[]>([
    {
      id: 'log-initial-1',
      timestamp: 'Today, 11:20 AM',
      actionType: 'organize',
      description: 'Smart Sorted 42 items from Downloads into Work & Finance folders',
      fileIds: ['file-1', 'file-4', 'file-7'],
      previousLocations: [
        { fileId: 'file-1', folder: 'Downloads/Unsorted', isOrganized: false },
        { fileId: 'file-4', folder: 'Downloads/Unsorted', isOrganized: false },
        { fileId: 'file-7', folder: 'Downloads/Unsorted', isOrganized: false },
      ],
      status: 'active',
    },
    {
      id: 'log-initial-2',
      timestamp: 'Yesterday, 04:15 PM',
      actionType: 'remove_duplicate',
      description: 'Removed 2 duplicate copies of "Vacation_2024.mp4" (Freed 250 MB)',
      fileIds: ['dup-vid-2', 'dup-vid-3'],
      previousLocations: [
        { fileId: 'dup-vid-2', folder: 'Desktop/Copies', isOrganized: false },
        { fileId: 'dup-vid-3', folder: 'Downloads', isOrganized: false },
      ],
      status: 'active',
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  }, []);

  const addLogItem = useCallback((item: Omit<UndoLogItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: UndoLogItem = {
      ...item,
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      status: 'active',
    };
    setHistory((prev) => [newItem, ...prev]);
    showToast(`Action recorded: ${item.description}`);
  }, [showToast]);

  const markRestored = useCallback((logId: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === logId ? { ...item, status: 'restored' } : item))
    );
    showToast('Undo successful! Files safely restored to original locations.');
  }, [showToast]);

  return {
    history,
    addLogItem,
    markRestored,
    toastMessage,
    dismissToast: () => setToastMessage(null),
  };
}
