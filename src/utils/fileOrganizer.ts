import JSZip from 'jszip';
import { RealFileItem, FileCategory, FolderNode, RealDuplicateGroup } from '@/types/files';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function categorizeFile(file: File): RealFileItem {
  const name = file.name;
  const lastDot = name.lastIndexOf('.');
  const extension = lastDot !== -1 ? name.substring(lastDot + 1).toLowerCase() : '';

  let category: FileCategory = 'Others';
  let subfolder = 'Misc';
  let folderPrefix = 'Others';

  // 1. Images
  if (['png'].includes(extension)) {
    category = 'Images';
    subfolder = 'PNG';
    folderPrefix = 'Images/PNG';
  } else if (['jpg', 'jpeg'].includes(extension)) {
    category = 'Images';
    subfolder = 'JPG';
    folderPrefix = 'Images/JPG';
  } else if (['webp'].includes(extension)) {
    category = 'Images';
    subfolder = 'WebP';
    folderPrefix = 'Images/WebP';
  } else if (['svg'].includes(extension)) {
    category = 'Images';
    subfolder = 'SVG';
    folderPrefix = 'Images/SVG';
  } else if (['gif'].includes(extension)) {
    category = 'Images';
    subfolder = 'GIF';
    folderPrefix = 'Images/GIF';
  }
  // 2. PDFs
  else if (['pdf'].includes(extension)) {
    category = 'PDFs';
    subfolder = 'PDF';
    folderPrefix = 'Documents/PDF';
  }
  // 3. Word & Text Documents
  else if (['doc', 'docx', 'odt', 'rtf'].includes(extension)) {
    category = 'Documents';
    subfolder = 'Word';
    folderPrefix = 'Documents/Word';
  } else if (['txt', 'md', 'log'].includes(extension)) {
    category = 'Documents';
    subfolder = 'Text';
    folderPrefix = 'Documents/Text';
  }
  // 4. Spreadsheets
  else if (['xlsx', 'xls', 'ods'].includes(extension)) {
    category = 'Spreadsheets';
    subfolder = 'Excel';
    folderPrefix = 'Spreadsheets/Excel';
  } else if (['csv'].includes(extension)) {
    category = 'Spreadsheets';
    subfolder = 'CSV';
    folderPrefix = 'Spreadsheets/CSV';
  }
  // 5. Videos
  else if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv'].includes(extension)) {
    category = 'Videos';
    subfolder = 'Videos';
    folderPrefix = 'Videos';
  }
  // 6. Audio
  else if (['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'].includes(extension)) {
    category = 'Audio';
    subfolder = 'Audio';
    folderPrefix = 'Audio';
  }
  // 7. Archives
  else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    category = 'Archives';
    subfolder = 'Archives';
    folderPrefix = 'Archives';
  }
  // 8. Code & Scripts
  else if (['py', 'js', 'ts', 'tsx', 'jsx', 'html', 'css', 'json', 'sql', 'sh', 'cpp', 'java'].includes(extension)) {
    category = 'Code';
    subfolder = 'Code';
    folderPrefix = 'Code';
  }

  const targetPath = `${folderPrefix}/${name}`;

  return {
    id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    extension,
    sizeBytes: file.size,
    sizeFormatted: formatBytes(file.size),
    category,
    subfolder,
    targetPath,
    fileRef: file,
    lastModifiedDate: new Date(file.lastModified || Date.now()).toLocaleDateString(),
  };
}

export function buildFolderTree(files: RealFileItem[]): FolderNode {
  const root: FolderNode = {
    name: 'SortMind_Organized',
    path: '',
    files: [],
    subfolders: {},
    totalSizeFormatted: '0 B',
    totalCount: files.length,
  };

  let totalBytes = 0;

  files.forEach((file) => {
    totalBytes += file.sizeBytes;
    const parts = file.targetPath.split('/');
    // e.g. ["Images", "PNG", "photo.png"]
    const filename = parts.pop()!;
    let current = root;

    parts.forEach((part, index) => {
      const currentPath = parts.slice(0, index + 1).join('/');
      if (!current.subfolders[part]) {
        current.subfolders[part] = {
          name: part,
          path: currentPath,
          files: [],
          subfolders: {},
          totalSizeFormatted: '0 B',
          totalCount: 0,
        };
      }
      current = current.subfolders[part];
    });

    current.files.push(file);
  });

  // Calculate sizes recursively
  function calculateNode(node: FolderNode): number {
    let bytes = node.files.reduce((sum, f) => sum + f.sizeBytes, 0);
    let count = node.files.length;

    Object.values(node.subfolders).forEach((child) => {
      bytes += calculateNode(child);
      count += child.totalCount;
    });

    node.totalSizeFormatted = formatBytes(bytes);
    node.totalCount = count;
    return bytes;
  }

  calculateNode(root);
  return root;
}

export function detectDuplicates(files: RealFileItem[]): RealDuplicateGroup[] {
  const map = new Map<string, RealFileItem[]>();

  files.forEach((file) => {
    // Exact or near duplicate check by normalized name and size
    const normalizedName = file.name
      .toLowerCase()
      .replace(/\s*\(copy\)/g, '')
      .replace(/\s*\(\d+\)/g, '')
      .replace(/_copy/g, '');

    const key = `${normalizedName}_${file.sizeBytes}`;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(file);
  });

  const duplicateGroups: RealDuplicateGroup[] = [];
  map.forEach((groupFiles) => {
    if (groupFiles.length > 1) {
      duplicateGroups.push({
        id: `dup-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        filename: groupFiles[0].name,
        sizeFormatted: groupFiles[0].sizeFormatted,
        files: groupFiles,
      });
    }
  });

  return duplicateGroups;
}

export async function downloadOrganizedZip(
  files: RealFileItem[],
  onProgress?: (percent: number) => void
): Promise<void> {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.targetPath, file.fileRef);
  });

  const content = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent));
      }
    }
  );

  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `SortMind_Organized_${dateStr}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate realistic in-memory test files so users can test immediately with 1-click
export function createSampleBatch(): File[] {
  // Simple 1x1 transparent PNG binary bytes
  const pngBytes = new Uint8Array([
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 10, 73, 68, 65, 84, 120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45, 180, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
  ]);

  const files: File[] = [
    new File([pngBytes], 'hero_banner_final.png', { type: 'image/png' }),
    new File([pngBytes], 'dashboard_screenshot.png', { type: 'image/png' }),
    new File([pngBytes], 'app_icon.png', { type: 'image/png' }),

    new File(['fake jpeg data bytes 1'], 'vacation_dubai.jpg', { type: 'image/jpeg' }),
    new File(['fake jpeg data bytes 2'], 'profile_photo.jpg', { type: 'image/jpeg' }),
    new File(['fake jpeg data bytes 2'], 'profile_photo (Copy).jpg', { type: 'image/jpeg' }), // Real duplicate!

    new File(['%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF'], 'Project_Proposal_2026.pdf', { type: 'application/pdf' }),
    new File(['%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF'], 'Invoice_Engineer_Shukri.pdf', { type: 'application/pdf' }),
    new File(['%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF'], 'Machine_Learning_Research.pdf', { type: 'application/pdf' }),

    new File(['Month,Revenue,Expenses\nJan,12000,4500\nFeb,15000,5200\nMar,18000,6100'], 'Company_Budget_Q1.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    new File(['Item,Cost,Date\nHosting,45,2026-10-01\nDomain,12,2026-10-02'], 'Monthly_Expenses.csv', { type: 'text/csv' }),

    new File(['mock mp4 video binary stream'], 'Product_Demo_Walkthrough.mp4', { type: 'video/mp4' }),
    new File(['mock mp4 video binary stream'], 'Tutorial_Quickstart.mp4', { type: 'video/mp4' }),

    new File(['# SortMind AI Documentation\nOrganize all files locally with complete privacy.'], 'README_Instructions.txt', { type: 'text/plain' }),
    new File(['import os\nprint("SortMind AI Local Engine")'], 'local_classifier.py', { type: 'text/x-python' }),
  ];

  return files;
}
