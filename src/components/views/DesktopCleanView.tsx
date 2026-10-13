'use client';

import React, { useState } from 'react';
import { 
  Folder, Sparkles, RefreshCw, CheckCircle2, FileText, Image as ImageIcon,
  Video, FileSpreadsheet, Monitor, AlertTriangle
} from 'lucide-react';

export const DesktopCleanView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'clean' | 'cluttered'>('clean');

  const cleanFolders = [
    { name: 'Work', count: '142 files', color: '#3b82f6' },
    { name: 'Education', count: '68 files', color: '#f59e0b' },
    { name: 'Finance', count: '39 files', color: '#10b981' },
    { name: 'Photos', count: '1,024 files', color: '#06b6d4' },
    { name: 'Videos', count: '58 files', color: '#ef4444' },
    { name: 'Documents', count: '94 files', color: '#8b5cf6' },
    { name: 'Personal', count: '45 files', color: '#ec4899' },
    { name: 'Projects', count: '112 files', color: '#6366f1' },
  ];

  const clutteredItems = [
    { name: 'IMG_4567.jpg', type: 'img' },
    { name: 'Screenshot_2026_10.png', type: 'img' },
    { name: 'Proposal_v2_final.pdf', type: 'pdf' },
    { name: 'Budget_Q4_draft.xlsx', type: 'xls' },
    { name: 'Vacation_clip.mp4', type: 'vid' },
    { name: 'Invoice_october.pdf', type: 'pdf' },
    { name: 'Client_NDA_signed.docx', type: 'doc' },
    { name: 'IMG_8921.jpg', type: 'img' },
    { name: 'presentation_backup.pptx', type: 'ppt' },
    { name: 'archive_2025.zip', type: 'zip' },
    { name: 'receipt_flight.pdf', type: 'pdf' },
    { name: 'script_fix.py', type: 'code' },
    { name: 'IMG_4567 (1).jpg', type: 'img' },
    { name: 'contract_amendment.pdf', type: 'pdf' },
    { name: 'notes_unsorted.txt', type: 'doc' },
    { name: 'random_download.exe', type: 'exe' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#121824',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Clean Desktop View
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            A cleaner laptop, a calmer mind. SortMind AI groups scattered desktop files into smart categorized folders.
          </p>
        </div>

        {/* Toggle Mode */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#101622', padding: '0.25rem', borderRadius: '8px', border: '1px solid #2d3b55' }}>
          <button
            type="button"
            onClick={() => setViewMode('clean')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: viewMode === 'clean' ? '#2563eb' : 'transparent',
              color: viewMode === 'clean' ? '#ffffff' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Sparkles size={14} />
            <span>After (Organized)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('cluttered')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: viewMode === 'cluttered' ? '#334155' : 'transparent',
              color: viewMode === 'cluttered' ? '#ffffff' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <AlertTriangle size={14} />
            <span>Before (Cluttered)</span>
          </button>
        </div>
      </div>

      {/* Simulated Desktop Screen Mockup */}
      <div
        style={{
          backgroundColor: '#0a0f1d',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Desktop Screen Bar */}
        <div
          style={{
            backgroundColor: '#0f172a',
            padding: '0.5rem 1rem',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor size={15} color="#3b82f6" />
            <span>Windows Desktop Environment Simulation</span>
          </div>
          <span>Status: {viewMode === 'clean' ? 'Organized by SortMind AI' : '85 Scattered Unorganized Items'}</span>
        </div>

        {/* Wallpaper Canvas with Solid Aesthetic Dark Scenery */}
        <div
          style={{
            minHeight: '380px',
            backgroundColor: '#0c1322',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {viewMode === 'clean' ? (
            /* Clean Desktop: 8 Elegant Smart Folders */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '1.25rem',
                maxWidth: '680px',
              }}
            >
              {cleanFolders.map((f) => (
                <div
                  key={f.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.85rem 0.5rem',
                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Folder size={38} color={f.color} style={{ marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>{f.name}</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.15rem' }}>{f.count}</span>
                </div>
              ))}
            </div>
          ) : (
            /* Cluttered Desktop: Random Scattered messy icons */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
                gap: '1rem',
              }}
            >
              {clutteredItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.65rem 0.35rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <FileText size={32} color="#94a3b8" style={{ marginBottom: '0.35rem' }} />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: '#cbd5e1',
                      wordBreak: 'break-all',
                      lineHeight: 1.2,
                      maxHeight: '2.4em',
                      overflow: 'hidden',
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Windows Taskbar at bottom of mockup */}
          <div
            style={{
              marginTop: '2rem',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '3px',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Type here to search</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>SortMind Background Guard: ON</span>
              <span>11:54 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
