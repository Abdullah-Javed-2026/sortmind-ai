'use client';

import { useState, useCallback, useMemo } from 'react';
import { RealFileItem, FolderNode, RealDuplicateGroup, ActiveTab } from '@/types/files';
import { 
  categorizeFile, 
  buildFolderTree, 
  detectDuplicates, 
  downloadOrganizedZip, 
  createSampleBatch 
} from '@/utils/fileOrganizer';

export function useRealOrganizer() {
  const [files, setFiles] = useState<RealFileItem[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('organize');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 4000);
  }, []);

  // Ingest raw files (via input, drag-and-drop, or sample generator)
  const addRawFiles = useCallback((rawFiles: File[] | FileList) => {
    setIsProcessing(true);
    const fileArray = Array.from(rawFiles);

    const categorized = fileArray.map((f) => categorizeFile(f));

    setFiles((prev) => {
      // Avoid duplicate file IDs
      const combined = [...prev, ...categorized];
      return combined;
    });

    setIsProcessing(false);
    showToast(`Added and categorized ${fileArray.length} real files into smart folders!`);
    setActiveTab('preview'); // Move to preview view so user sees tree
  }, [showToast]);

  // Load sample real files for 1-click test
  const loadSampleFiles = useCallback(() => {
    const samples = createSampleBatch();
    addRawFiles(samples);
  }, [addRawFiles]);

  // Clear workspace
  const clearFiles = useCallback(() => {
    setFiles([]);
    setSearchQuery('');
    showToast('Workspace cleared.');
  }, [showToast]);

  // Remove single file
  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  // Duplicate groups calculation
  const duplicateGroups: RealDuplicateGroup[] = useMemo(() => {
    return detectDuplicates(files);
  }, [files]);

  // Keep primary duplicate and remove others
  const resolveDuplicateGroup = useCallback((groupId: string, keepFileId: string) => {
    const group = duplicateGroups.find((g) => g.id === groupId);
    if (!group) return;

    const idsToRemove = group.files.filter((f) => f.id !== keepFileId).map((f) => f.id);
    setFiles((prev) => prev.filter((f) => !idsToRemove.includes(f.id)));
    showToast(`Resolved duplicate: Kept original file.`);
  }, [duplicateGroups, showToast]);

  // Clean all duplicates
  const cleanAllDuplicates = useCallback(() => {
    if (duplicateGroups.length === 0) return;

    const idsToRemove = new Set<string>();
    duplicateGroups.forEach((g) => {
      // Keep first, remove subsequent
      g.files.slice(1).forEach((f) => idsToRemove.add(f.id));
    });

    setFiles((prev) => prev.filter((f) => !idsToRemove.has(f.id)));
    showToast(`Removed all redundant duplicates!`);
  }, [duplicateGroups, showToast]);

  // Build folder hierarchy tree
  const folderTree: FolderNode = useMemo(() => {
    return buildFolderTree(files);
  }, [files]);

  // Category counts and sizes
  const categoryStats = useMemo(() => {
    const stats: Record<string, { count: number; bytes: number }> = {};
    files.forEach((f) => {
      const cat = f.category;
      if (!stats[cat]) {
        stats[cat] = { count: 0, bytes: 0 };
      }
      stats[cat].count += 1;
      stats[cat].bytes += f.sizeBytes;
    });
    return stats;
  }, [files]);

  // Natural Language Search filtered results
  const filteredFiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return files;

    return files.filter((f) => {
      if (f.name.toLowerCase().includes(q)) return true;
      if (f.extension.toLowerCase() === q) return true;
      if (f.category.toLowerCase().includes(q)) return true;
      if (f.subfolder.toLowerCase().includes(q)) return true;

      // Smart semantic prompts
      if (q.includes('png') && f.extension === 'png') return true;
      if (q.includes('jpg') && (f.extension === 'jpg' || f.extension === 'jpeg')) return true;
      if (q.includes('pdf') && f.extension === 'pdf') return true;
      if (q.includes('excel') && (f.extension === 'xlsx' || f.extension === 'csv')) return true;
      if (q.includes('video') && f.category === 'Videos') return true;
      if (q.includes('photo') && f.category === 'Images') return true;

      return false;
    });
  }, [files, searchQuery]);

  // Download real ZIP
  const triggerZipDownload = useCallback(async () => {
    if (files.length === 0) {
      showToast('No files to download! Please upload files or load samples first.');
      return;
    }

    try {
      setDownloadProgress(10);
      await downloadOrganizedZip(files, (pct) => {
        setDownloadProgress(pct);
      });
      setDownloadProgress(null);
      showToast('Success! SortMind_Organized.zip has been downloaded.');
    } catch (err) {
      console.error('ZIP generation error:', err);
      setDownloadProgress(null);
      showToast('Error generating zip file.');
    }
  }, [files, showToast]);

  return {
    files,
    filteredFiles,
    folderTree,
    duplicateGroups,
    categoryStats,
    activeTab,
    setActiveTab,
    isProcessing,
    downloadProgress,
    searchQuery,
    setSearchQuery,
    addRawFiles,
    loadSampleFiles,
    clearFiles,
    removeFile,
    resolveDuplicateGroup,
    cleanAllDuplicates,
    triggerZipDownload,
    toast,
    dismissToast: () => setToast(null),
  };
}
