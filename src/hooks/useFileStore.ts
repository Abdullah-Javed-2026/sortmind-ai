'use client';

import { useState, useCallback, useMemo } from 'react';
import { FileItem, DuplicateGroup, SystemStats, FileCategory } from '@/types/files';
import { useUndoManager } from './useUndoManager';

const INITIAL_FILES: FileItem[] = [
  {
    id: 'f-1',
    name: 'Project_Proposal.pdf',
    extension: 'pdf',
    sizeBytes: 2516582,
    sizeFormatted: '2.4 MB',
    category: 'PDFs',
    suggestedFolder: 'Work / Client Proposals',
    modifiedDate: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    createdAtDescription: '2 hours ago',
    isOrganized: true,
    contentKeywords: ['client proposal', 'roadmap', 'budget quote', 'q4 deliverables'],
    hash: 'sha256-a1b2c3d4e5f6',
  },
  {
    id: 'f-2',
    name: 'IMG_4567.jpg',
    extension: 'jpg',
    sizeBytes: 4300000,
    sizeFormatted: '4.1 MB',
    category: 'Images',
    suggestedFolder: 'Photos / Camera Roll',
    modifiedDate: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    createdAtDescription: '3 hours ago',
    isOrganized: true,
    contentKeywords: ['photo', 'scenery', 'camera capture', 'wallpaper'],
    hash: 'sha256-f6e5d4c3b2a1',
    isDuplicate: true,
    duplicateGroupId: 'dup-1',
  },
  {
    id: 'f-3',
    name: 'Vacation_2024.mp4',
    extension: 'mp4',
    sizeBytes: 131072000,
    sizeFormatted: '125 MB',
    category: 'Videos',
    suggestedFolder: 'Videos / Personal Trips',
    modifiedDate: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    createdAtDescription: 'Yesterday',
    isOrganized: true,
    contentKeywords: ['holiday video', 'trip', 'summer', 'drone footage'],
    hash: 'sha256-9876543210ab',
    isDuplicate: true,
    duplicateGroupId: 'dup-2',
  },
  {
    id: 'f-4',
    name: 'Budget_2025.xlsx',
    extension: 'xlsx',
    sizeBytes: 1258291,
    sizeFormatted: '1.2 MB',
    category: 'Spreadsheets',
    suggestedFolder: 'Finance / Annual Budget',
    modifiedDate: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    createdAtDescription: '3 days ago',
    isOrganized: true,
    contentKeywords: ['quarterly budget', 'revenue', 'financial forecasts', 'excel'],
    hash: 'sha256-112233445566',
  },
  {
    id: 'f-5',
    name: 'Business_Plan.pdf',
    extension: 'pdf',
    sizeBytes: 1887436,
    sizeFormatted: '1.8 MB',
    category: 'PDFs',
    suggestedFolder: 'Work / Strategy',
    modifiedDate: new Date(Date.now() - 85 * 3600 * 1000).toISOString(),
    createdAtDescription: 'Nov 10, 2026',
    isOrganized: true,
    contentKeywords: ['business plan', 'executive summary', 'pitch deck', 'investors'],
    hash: 'sha256-77889900aabb',
  },
  {
    id: 'f-6',
    name: 'Research_Report.pdf',
    extension: 'pdf',
    sizeBytes: 2936012,
    sizeFormatted: '2.8 MB',
    category: 'PDFs',
    suggestedFolder: 'Education / Academic Research',
    modifiedDate: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
    createdAtDescription: 'Nov 09, 2026',
    isOrganized: false,
    contentKeywords: ['ai paper', 'literature review', 'survey', 'benchmark metrics'],
    hash: 'sha256-ccddeeff0011',
  },
  {
    id: 'f-7',
    name: 'Marketing_Strategy.pdf',
    extension: 'pdf',
    sizeBytes: 2411724,
    sizeFormatted: '2.3 MB',
    category: 'PDFs',
    suggestedFolder: 'Work / Marketing',
    modifiedDate: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
    createdAtDescription: 'Nov 08, 2026',
    isOrganized: false,
    contentKeywords: ['marketing channels', 'growth metrics', 'social media strategy'],
    hash: 'sha256-223344556677',
  },
  {
    id: 'f-8',
    name: 'Invoice_Shukri_October.pdf',
    extension: 'pdf',
    sizeBytes: 943718,
    sizeFormatted: '920 KB',
    category: 'PDFs',
    suggestedFolder: 'Finance / Invoices',
    modifiedDate: new Date(Date.now() - 140 * 3600 * 1000).toISOString(),
    createdAtDescription: 'Last week',
    isOrganized: false,
    contentKeywords: ['october invoice', 'bill', 'payment received', 'engineer shukri'],
    hash: 'sha256-990011223344',
  },
  {
    id: 'f-9',
    name: 'Desktop_Clean_Mockup.png',
    extension: 'png',
    sizeBytes: 3145728,
    sizeFormatted: '3.0 MB',
    category: 'Images',
    suggestedFolder: 'Work / Design Assets',
    modifiedDate: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    createdAtDescription: '2 days ago',
    isOrganized: true,
    contentKeywords: ['ui mockup', 'desktop layout', 'figma export', 'sortmind'],
    hash: 'sha256-334455667788',
  },
  {
    id: 'f-10',
    name: 'Dataset_Archive.zip',
    extension: 'zip',
    sizeBytes: 251658240,
    sizeFormatted: '240 MB',
    category: 'Archives',
    suggestedFolder: 'Projects / Datasets',
    modifiedDate: new Date(Date.now() - 180 * 3600 * 1000).toISOString(),
    createdAtDescription: '1 week ago',
    isOrganized: false,
    contentKeywords: ['dataset', 'zip archive', 'compressed backup', 'training data'],
    hash: 'sha256-556677889900',
  },
  {
    id: 'f-11',
    name: 'Client_Contract_NDA.docx',
    extension: 'docx',
    sizeBytes: 1572864,
    sizeFormatted: '1.5 MB',
    category: 'Documents',
    suggestedFolder: 'Legal / Contracts',
    modifiedDate: new Date(Date.now() - 200 * 3600 * 1000).toISOString(),
    createdAtDescription: '2 weeks ago',
    isOrganized: true,
    contentKeywords: ['nda', 'confidentiality agreement', 'legal contract', 'terms'],
    hash: 'sha256-667788990011',
  },
  {
    id: 'f-12',
    name: 'neural_indexer.py',
    extension: 'py',
    sizeBytes: 49152,
    sizeFormatted: '48 KB',
    category: 'Code',
    suggestedFolder: 'Development / Python Scripts',
    modifiedDate: new Date(Date.now() - 210 * 3600 * 1000).toISOString(),
    createdAtDescription: '2 weeks ago',
    isOrganized: true,
    contentKeywords: ['python script', 'vector embeddings', 'local indexer', 'source code'],
    hash: 'sha256-778899001122',
  },
];

const INITIAL_DUPLICATES: DuplicateGroup[] = [
  {
    id: 'dup-1',
    filename: 'IMG_4567.jpg',
    extension: 'jpg',
    totalSizeFormatted: '12.4 MB (3 copies)',
    files: [
      {
        id: 'f-2',
        path: 'Downloads/IMG_4567.jpg',
        sizeFormatted: '4.1 MB',
        date: 'Today, 08:30 AM',
        isPrimary: true,
      },
      {
        id: 'f-2-copy1',
        path: 'Desktop/IMG_4567 (1).jpg',
        sizeFormatted: '4.1 MB',
        date: 'Oct 11, 2026',
        isPrimary: false,
      },
      {
        id: 'f-2-copy2',
        path: 'Pictures/Backup/IMG_4567_copy.jpg',
        sizeFormatted: '4.1 MB',
        date: 'Oct 09, 2026',
        isPrimary: false,
      },
    ],
  },
  {
    id: 'dup-2',
    filename: 'Vacation_2024.mp4',
    extension: 'mp4',
    totalSizeFormatted: '250 MB (2 copies)',
    files: [
      {
        id: 'f-3',
        path: 'Videos/Trips/Vacation_2024.mp4',
        sizeFormatted: '125 MB',
        date: 'Yesterday, 02:15 PM',
        isPrimary: true,
      },
      {
        id: 'f-3-copy1',
        path: 'Downloads/Vacation_2024 (Copy).mp4',
        sizeFormatted: '125 MB',
        date: 'Yesterday, 04:00 PM',
        isPrimary: false,
      },
    ],
  },
  {
    id: 'dup-3',
    filename: 'Project_Proposal.pdf',
    extension: 'pdf',
    totalSizeFormatted: '4.8 MB (2 copies)',
    files: [
      {
        id: 'f-1',
        path: 'Documents/Work/Project_Proposal.pdf',
        sizeFormatted: '2.4 MB',
        date: 'Today, 09:12 AM',
        isPrimary: true,
      },
      {
        id: 'f-1-copy1',
        path: 'Desktop/Project_Proposal_old.pdf',
        sizeFormatted: '2.4 MB',
        date: 'Oct 12, 2026',
        isPrimary: false,
      },
    ],
  },
];

export function useFileStore() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>(INITIAL_DUPLICATES);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const { history, addLogItem, markRestored, toastMessage, dismissToast } = useUndoManager();

  // Statistics calculation
  const stats: SystemStats = useMemo(() => {
    const totalFiles = 1240; // Representing full desktop indexed stats as shown on screenshot
    const organizedCount = files.filter((f) => f.isOrganized).length;
    const duplicateCount = duplicateGroups.reduce((acc, g) => acc + (g.files.length - 1), 0);
    const duplicatesSpaceMb = duplicateGroups.length * 128; // ~384 MB cleaned matching screenshot

    return {
      totalFiles,
      totalSizeFormatted: '27.7 GB',
      cleanDesktopCleanedMb: 384,
      organizedCount: totalFiles - 14, // Almost all organized
      duplicateCount,
      duplicatesSpaceMb,
      lastScanTimestamp: 'Organization complete! 1,240 files scanned & 384 MB cleaned',
    };
  }, [files, duplicateGroups]);

  // Organize single file
  const organizeFile = useCallback(
    (fileId: string) => {
      const target = files.find((f) => f.id === fileId);
      if (!target) return;

      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, isOrganized: true } : f))
      );

      addLogItem({
        actionType: 'organize',
        description: `Organized "${target.name}" into "${target.suggestedFolder}"`,
        fileIds: [fileId],
        previousLocations: [{ fileId, folder: 'Downloads/Unsorted', isOrganized: false }],
      });
    },
    [files, addLogItem]
  );

  // Organize all unorganized files
  const organizeAll = useCallback(() => {
    const unorganized = files.filter((f) => !f.isOrganized);
    if (unorganized.length === 0) return;

    setFiles((prev) => prev.map((f) => ({ ...f, isOrganized: true })));

    addLogItem({
      actionType: 'organize',
      description: `Smart Organized ${unorganized.length} files across Downloads & Desktop`,
      fileIds: unorganized.map((f) => f.id),
      previousLocations: unorganized.map((f) => ({
        fileId: f.id,
        folder: 'Downloads/Unsorted',
        isOrganized: false,
      })),
    });
  }, [files, addLogItem]);

  // Keep 1 copy and delete duplicates in a group
  const resolveDuplicateGroup = useCallback(
    (groupId: string, keepFileId?: string) => {
      const group = duplicateGroups.find((g) => g.id === groupId);
      if (!group) return;

      const primaryId = keepFileId || group.files.find((f) => f.isPrimary)?.id || group.files[0].id;
      const removedFiles = group.files.filter((f) => f.id !== primaryId);

      setDuplicateGroups((prev) => prev.filter((g) => g.id !== groupId));

      addLogItem({
        actionType: 'remove_duplicate',
        description: `Cleaned ${removedFiles.length} duplicate copy of "${group.filename}" (Kept primary file)`,
        fileIds: removedFiles.map((f) => f.id),
        previousLocations: removedFiles.map((f) => ({
          fileId: f.id,
          folder: f.path,
          isOrganized: true,
        })),
      });
    },
    [duplicateGroups, addLogItem]
  );

  // Batch clean all duplicates
  const cleanAllDuplicates = useCallback(() => {
    if (duplicateGroups.length === 0) return;

    const count = duplicateGroups.reduce((acc, g) => acc + (g.files.length - 1), 0);
    setDuplicateGroups([]);

    addLogItem({
      actionType: 'remove_duplicate',
      description: `Duplicate Hunter: Removed all ${count} redundant copies safely. Recovered 384 MB disk space.`,
      fileIds: [],
      previousLocations: [],
    });
  }, [duplicateGroups, addLogItem]);

  // Safe Undo / Restore
  const restoreAction = useCallback(
    (logId: string) => {
      const log = history.find((h) => h.id === logId);
      if (!log || log.status === 'restored') return;

      if (log.actionType === 'organize') {
        const revertIds = new Set(log.fileIds);
        setFiles((prev) =>
          prev.map((f) => (revertIds.has(f.id) ? { ...f, isOrganized: false } : f))
        );
      } else if (log.actionType === 'remove_duplicate') {
        // Reset default mock duplicates if batch cleared
        setDuplicateGroups(INITIAL_DUPLICATES);
      }

      markRestored(logId);
    },
    [history, markRestored]
  );

  // Trigger full scan simulation
  const startDeepScan = useCallback(() => {
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1500);
    setTimeout(() => setScanStep(4), 2200);
    setTimeout(() => {
      setIsScanning(false);
      setScanStep(0);
      organizeAll();
    }, 2800);
  }, [organizeAll]);

  // Categories breakdown
  const categoryCounts = useMemo(() => {
    const map: Record<FileCategory, { count: number; size: string; color: string }> = {
      Documents: { count: 342, size: '4.6 GB', color: '#3b82f6' },
      Images: { count: 1024, size: '3.2 GB', color: '#10b981' },
      Videos: { count: 58, size: '15.7 GB', color: '#ef4444' },
      PDFs: { count: 104, size: '2.1 GB', color: '#f59e0b' },
      Spreadsheets: { count: 56, size: '1.3 GB', color: '#10b981' },
      Archives: { count: 18, size: '1.9 GB', color: '#8b5cf6' },
      Code: { count: 64, size: '450 MB', color: '#06b6d4' },
      Audio: { count: 32, size: '210 MB', color: '#ec4899' },
      Others: { count: 52, size: '0.8 GB', color: '#64748b' },
    };
    return map;
  }, []);

  return {
    files,
    duplicateGroups,
    stats,
    isScanning,
    scanStep,
    categoryCounts,
    startDeepScan,
    organizeFile,
    organizeAll,
    resolveDuplicateGroup,
    cleanAllDuplicates,
    history,
    restoreAction,
    toastMessage,
    dismissToast,
  };
}
