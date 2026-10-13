'use client';

import React, { useState } from 'react';
import { 
  Folder, FolderOpen, FileText, Image as ImageIcon, Video, 
  FileSpreadsheet, Code, Download, Trash2, ChevronRight, ChevronDown 
} from 'lucide-react';
import { RealFileItem, FolderNode } from '@/types/files';

interface FolderTreePreviewProps {
  folderTree: FolderNode;
  files: RealFileItem[];
  onRemoveFile: (id: string) => void;
  onDownloadZip: () => void;
  downloadProgress: number | null;
}

export const FolderTreePreview: React.FC<FolderTreePreviewProps> = ({
  folderTree,
  files,
  onRemoveFile,
  onDownloadZip,
  downloadProgress,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    Images: true,
    Documents: true,
    Spreadsheets: true,
    Videos: true,
    'Images/PNG': true,
    'Images/JPG': true,
    'Documents/PDF': true,
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const getFileIcon = (ext: string) => {
    if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) {
      return <ImageIcon size={15} color="#10b981" />;
    }
    if (['pdf'].includes(ext)) {
      return <FileText size={15} color="#f59e0b" />;
    }
    if (['xlsx', 'xls', 'csv'].includes(ext)) {
      return <FileSpreadsheet size={15} color="#10b981" />;
    }
    if (['mp4', 'mov', 'avi'].includes(ext)) {
      return <Video size={15} color="#ef4444" />;
    }
    if (['py', 'js', 'ts', 'html'].includes(ext)) {
      return <Code size={15} color="#06b6d4" />;
    }
    return <FileText size={15} color="var(--muted-foreground)" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner & Download Action */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Folder Structure Preview
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
            Review how your files will be neatly arranged inside the ZIP archive.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {downloadProgress !== null && (
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--primary)',
            borderRadius: '10px',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Packaging SortMind_Organized.zip</span>
            <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{downloadProgress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${downloadProgress}%`,
                height: '100%',
                backgroundColor: 'var(--primary)',
                transition: 'width 0.15s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Folder Explorer Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Left Column: Visual Tree */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderOpen size={18} color="var(--primary)" />
            <span>Target Subfolder Hierarchy</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)' }}>
            {Object.values(folderTree.subfolders).map((catFolder) => {
              const isCatExpanded = expandedFolders[catFolder.name] !== false;

              return (
                <div key={catFolder.path} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div
                    onClick={() => toggleFolder(catFolder.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      backgroundColor: 'var(--card-hover)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isCatExpanded ? <ChevronDown size={14} color="var(--muted-foreground)" /> : <ChevronRight size={14} color="var(--muted-foreground)" />}
                      <Folder size={16} color="var(--primary)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>{catFolder.name}/</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                      {catFolder.totalCount} files • {catFolder.totalSizeFormatted}
                    </span>
                  </div>

                  {isCatExpanded && (
                    <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {Object.values(catFolder.subfolders).map((sub) => {
                        const isSubExpanded = expandedFolders[sub.path] !== false;

                        return (
                          <div key={sub.path} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <div
                              onClick={() => toggleFolder(sub.path)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.35rem 0.5rem',
                                backgroundColor: 'var(--card-inner)',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                {isSubExpanded ? <ChevronDown size={12} color="var(--subtle-foreground)" /> : <ChevronRight size={12} color="var(--subtle-foreground)" />}
                                <Folder size={14} color="#10b981" />
                                <span style={{ fontSize: '0.8rem', color: 'var(--foreground)' }}>{sub.name}/</span>
                              </div>
                              <span style={{ fontSize: '0.7rem', color: 'var(--subtle-foreground)' }}>
                                {sub.totalCount} files
                              </span>
                            </div>

                            {isSubExpanded && (
                              <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                                {sub.files.map((f) => (
                                  <div
                                    key={f.id}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '0.25rem 0.4rem',
                                      fontSize: '0.75rem',
                                      color: 'var(--muted-foreground)',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
                                      {getFileIcon(f.extension)}
                                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {f.name}
                                      </span>
                                    </div>
                                    <span style={{ flexShrink: 0 }}>{f.sizeFormatted}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Destination Path Mapping */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
              Files Relocation Ledger ({files.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
              Exact Paths in ZIP
            </span>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '480px', overflowY: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Original Name</th>
                  <th>Destination Path</th>
                  <th>Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((f) => (
                  <tr key={f.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        {getFileIcon(f.extension)}
                        <span>{f.name}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--primary)',
                          backgroundColor: 'var(--primary-soft)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}
                      >
                        📁 {f.targetPath}
                      </span>
                    </td>
                    <td style={{ color: 'var(--muted-foreground)' }}>{f.sizeFormatted}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => onRemoveFile(f.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '0.2rem',
                        }}
                        title="Remove from batch"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
