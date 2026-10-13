'use client';

import { useState, useMemo } from 'react';
import { FileItem } from '@/types/files';

export const POPULAR_PROMPTS = [
  'Find the PDF I downloaded last week',
  'Show invoices and budget documents',
  'High-resolution photos from camera roll',
  'Large videos from my vacation',
  'Unorganized files on my desktop',
  'Client proposals and strategy notes',
];

export function useNaturalSearch(allFiles: FileItem[]) {
  const [query, setQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allFiles.filter((file) => {
      // 1. Category Filter Check
      if (activeCategoryFilter !== 'All') {
        if (file.category !== activeCategoryFilter) {
          return false;
        }
      }

      // 2. Query empty -> show all in category
      if (!q) {
        return true;
      }

      // 3. Exact Filename / Extension Match
      if (file.name.toLowerCase().includes(q)) return true;
      if (file.extension.toLowerCase() === q) return true;

      // 4. Natural language semantic keyword matching
      const hasKeywordMatch = file.contentKeywords.some((kw) => kw.toLowerCase().includes(q) || q.includes(kw.toLowerCase()));
      if (hasKeywordMatch) return true;

      // 5. Semantic intent matching:
      // Time-based intents
      if (q.includes('last week') || q.includes('week ago')) {
        if (file.createdAtDescription.toLowerCase().includes('week') || file.name.includes('October') || file.name.includes('Report')) {
          return true;
        }
      }
      if (q.includes('yesterday') || q.includes('today') || q.includes('recent')) {
        if (file.createdAtDescription.toLowerCase().includes('today') || file.createdAtDescription.toLowerCase().includes('yesterday') || file.createdAtDescription.toLowerCase().includes('hours')) {
          return true;
        }
      }

      // Extension / type intents
      if (q.includes('pdf') && file.extension === 'pdf') return true;
      if ((q.includes('photo') || q.includes('image') || q.includes('picture')) && file.category === 'Images') return true;
      if ((q.includes('video') || q.includes('movie') || q.includes('clip')) && file.category === 'Videos') return true;
      if ((q.includes('spreadsheet') || q.includes('excel') || q.includes('sheet')) && file.category === 'Spreadsheets') return true;

      // Contextual intents
      if (q.includes('invoice') || q.includes('bill') || q.includes('tax') || q.includes('budget') || q.includes('finance')) {
        if (file.suggestedFolder.toLowerCase().includes('finance') || file.name.toLowerCase().includes('invoice') || file.name.toLowerCase().includes('budget')) {
          return true;
        }
      }

      if (q.includes('proposal') || q.includes('work') || q.includes('strategy') || q.includes('client')) {
        if (file.suggestedFolder.toLowerCase().includes('work') || file.suggestedFolder.toLowerCase().includes('strategy') || file.name.toLowerCase().includes('proposal')) {
          return true;
        }
      }

      if (q.includes('unorganized') || q.includes('unsorted') || q.includes('clutter')) {
        return !file.isOrganized;
      }

      if (q.includes('large') || q.includes('big')) {
        return file.sizeBytes > 10 * 1024 * 1024; // > 10MB
      }

      return false;
    });
  }, [allFiles, query, activeCategoryFilter]);

  return {
    query,
    setQuery,
    activeCategoryFilter,
    setActiveCategoryFilter,
    filteredResults,
    popularPrompts: POPULAR_PROMPTS,
    hasActiveFilter: query.trim().length > 0 || activeCategoryFilter !== 'All',
    resetFilters: () => {
      setQuery('');
      setActiveCategoryFilter('All');
    },
  };
}
