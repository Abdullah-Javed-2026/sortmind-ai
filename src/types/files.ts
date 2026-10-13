export type FileCategory =
  | 'Documents'
  | 'Images'
  | 'Videos'
  | 'Audio'
  | 'PDFs'
  | 'Spreadsheets'
  | 'Archives'
  | 'Code'
  | 'Others';

export type ActiveTab =
  | 'organize'
  | 'preview'
  | 'duplicates'
  | 'search'
  | 'home'
  | 'categories'
  | 'desktop'
  | 'recovery'
  | 'settings';

export interface RealFileItem {
  id: string;
  name: string;
  extension: string;
  sizeBytes: number;
  sizeFormatted: string;
  category: FileCategory;
  subfolder: string; // e.g. "PNG", "JPG", "PDF", "Excel"
  targetPath: string; // e.g. "Images/PNG/photo.png"
  fileRef: File | Blob; // The real raw data in memory
  lastModifiedDate: string;
  isDuplicate?: boolean;
  duplicateGroupId?: string;
}

export interface FolderNode {
  name: string;
  path: string;
  files: RealFileItem[];
  subfolders: Record<string, FolderNode>;
  totalSizeFormatted: string;
  totalCount: number;
}

export interface RealDuplicateGroup {
  id: string;
  filename: string;
  sizeFormatted: string;
  files: RealFileItem[];
}

export interface FileItem {
  id: string;
  name: string;
  extension: string;
  sizeBytes: number;
  sizeFormatted: string;
  category: FileCategory;
  suggestedFolder: string;
  modifiedDate: string;
  createdAtDescription: string;
  isOrganized: boolean;
  contentKeywords: string[];
  hash?: string;
  isDuplicate?: boolean;
  duplicateGroupId?: string;
}

export interface DuplicateGroup {
  id: string;
  filename: string;
  extension: string;
  totalSizeFormatted: string;
  files: {
    id: string;
    path: string;
    sizeFormatted: string;
    date: string;
    isPrimary: boolean;
  }[];
}

export interface UndoLogItem {
  id: string;
  timestamp: string;
  actionType: 'organize' | 'remove_duplicate' | 'move_folder' | 'rename';
  description: string;
  fileIds: string[];
  previousLocations: { fileId: string; folder: string; isOrganized: boolean }[];
  status: 'active' | 'restored';
}

export interface SystemStats {
  totalFiles: number;
  totalSizeFormatted: string;
  cleanDesktopCleanedMb: number;
  organizedCount: number;
  duplicateCount: number;
  duplicatesSpaceMb: number;
  lastScanTimestamp: string;
}
