'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, FolderUp, FilePlus, ShieldCheck, ArrowRight, Folder } from 'lucide-react';

interface UploadZoneProps {
  onFilesSelected: (files: File[] | FileList) => void;
  onLoadSampleBatch: () => void;
  currentCount: number;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFilesSelected,
  onLoadSampleBatch,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const sampleRules = [
    { source: 'scan_001.pdf', target: 'Documents/PDF/', color: 'var(--primary)' },
    { source: 'screenshot.png', target: 'Images/PNG/', color: '#10b981' },
    { source: 'quarterly.xlsx', target: 'Spreadsheets/Excel/', color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Drag & Drop Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: isDragOver ? '2px dashed var(--primary)' : '2px dashed var(--border)',
          backgroundColor: isDragOver ? 'var(--primary-soft)' : 'var(--card)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 3.5rem) 1rem',
          textAlign: 'center',
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '14px',
            backgroundColor: 'var(--primary-soft)',
            border: '1px solid var(--primary-soft-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
          }}
        >
          <UploadCloud size={28} />
        </div>

        <div>
          <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.35rem', textAlign: 'center' }}>
            Drop files or an entire folder here
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', maxWidth: '480px', margin: '0 auto', textAlign: 'center', lineHeight: 1.5 }}>
            SortMind automatically categorizes PNGs, JPGs, PDFs, Excel sheets, Videos, and Code into clean subdirectories.
          </p>
        </div>

        {/* Action Buttons Row - Fully Responsive Wrap */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '0.25rem',
            width: '100%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onFilesSelected(e.target.files);
                e.target.value = '';
              }
            }}
          />

          <input
            ref={folderInputRef}
            type="file"
            // @ts-ignore
            webkitdirectory="true"
            // @ts-ignore
            directory="true"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onFilesSelected(e.target.files);
                e.target.value = '';
              }
            }}
          />

          <button
            type="button"
            className="btn-pill-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <FilePlus size={16} />
            <span>Select Multiple Files</span>
          </button>

          <button
            type="button"
            className="btn-pill-secondary"
            onClick={() => folderInputRef.current?.click()}
          >
            <FolderUp size={16} />
            <span>Select Entire Folder</span>
          </button>
        </div>
      </div>

      {/* Illustrative Example Result Strip - FULLY RESPONSIVE WITHOUT TRUNCATION */}
      <div
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--subtle-foreground)' }}>
          Sample Subfolder Routing:
        </span>

        {/* Responsive Grid that gracefully wraps and never cuts off */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.65rem',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {sampleRules.map((rule) => (
            <div
              key={rule.source}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                backgroundColor: 'var(--card-inner)',
                padding: '0.55rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  color: 'var(--muted-foreground)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flexShrink: 1,
                }}
              >
                {rule.source}
              </span>

              <ArrowRight size={13} color="var(--subtle-foreground)" style={{ flexShrink: 0 }} />

              <span
                style={{
                  color: rule.color,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <Folder size={13} />
                <span>{rule.target}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Guarantee Note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.8rem',
          color: 'var(--muted-foreground)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <ShieldCheck size={16} color="#10b981" />
        <span>100% Client-Side In-Memory Processing · Zero data transmitted to external servers</span>
      </div>
    </div>
  );
};
