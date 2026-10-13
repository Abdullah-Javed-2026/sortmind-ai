'use client';

import React from 'react';
import { 
  FileText, Image as ImageIcon, Video, FileSpreadsheet, Archive, Folder,
  Search, Play, Trash2, FolderOpen, CheckCircle2, Shield, Clock, HardDrive, ArrowRight
} from 'lucide-react';
import { FileItem, ActiveTab } from '@/types/files';

interface HomeViewProps {
  files: FileItem[];
  onNavigateTab: (tab: ActiveTab) => void;
  onTriggerScan: () => void;
  onOrganizeSingle: (id: string) => void;
  onCleanAllDuplicates: () => void;
  duplicateCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  files,
  onNavigateTab,
  onTriggerScan,
  onOrganizeSingle,
  onCleanAllDuplicates,
  duplicateCount,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Welcome Bar */}
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
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Good morning, Shukri
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Your files are indexed and protected locally. Desktop clutter is under control.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            backgroundColor: '#064e3b',
            border: '1px solid #059669',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            color: '#a7f3d0',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={17} color="#34d399" />
          <span>Organization complete! 1,240 files scanned & 384 MB cleaned</span>
        </div>
      </div>

      {/* Quick Search Shortcut Box */}
      <div
        onClick={() => onNavigateTab('search')}
        style={{
          backgroundColor: '#101622',
          border: '1px solid #2d3b55',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          cursor: 'pointer',
        }}
      >
        <Search size={18} color="#64748b" />
        <span style={{ color: '#64748b', fontSize: '0.9rem', flex: 1 }}>
          Ask anything... (e.g. &ldquo;Find the PDF I downloaded last week&rdquo; or &ldquo;Show tax invoices&rdquo;)
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            border: '1px solid #334155',
          }}
        >
          AI Search
        </span>
      </div>

      {/* Quick Category Stat Tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.85rem',
        }}
      >
        <div className="cat-stat-card" onClick={() => onNavigateTab('categories')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FileText size={18} color="#3b82f6" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>4.6 GB</span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>Documents</span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>342 files</span>
        </div>

        <div className="cat-stat-card" onClick={() => onNavigateTab('categories')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ImageIcon size={18} color="#10b981" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>3.2 GB</span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>Images</span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>1,024 files</span>
        </div>

        <div className="cat-stat-card" onClick={() => onNavigateTab('categories')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Video size={18} color="#ef4444" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>15.7 GB</span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>Videos</span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>58 files</span>
        </div>

        <div className="cat-stat-card" onClick={() => onNavigateTab('categories')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FileText size={18} color="#f59e0b" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>2.1 GB</span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>PDFs</span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>104 files</span>
        </div>

        <div className="cat-stat-card" onClick={() => onNavigateTab('categories')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FileSpreadsheet size={18} color="#10b981" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>1.3 GB</span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>Spreadsheets</span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>56 files</span>
        </div>

        <div className="cat-stat-card" onClick={() => onNavigateTab('categories')} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Archive size={18} color="#8b5cf6" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>0.8 GB</span>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>Others</span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>52 files</span>
        </div>
      </div>

      {/* Main Grid: Recent Files (Left) + Quick Actions (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Left: Recent Files List */}
        <div
          style={{
            backgroundColor: '#121824',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="#94a3b8" />
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                Recent Files
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('search')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <span>View all</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {files.slice(0, 5).map((file) => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  backgroundColor: '#151d2a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '6px',
                      backgroundColor: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {file.extension === 'pdf' ? (
                      <FileText size={16} color="#f59e0b" />
                    ) : file.extension === 'xlsx' ? (
                      <FileSpreadsheet size={16} color="#10b981" />
                    ) : file.extension === 'mp4' ? (
                      <Video size={16} color="#ef4444" />
                    ) : (
                      <ImageIcon size={16} color="#3b82f6" />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#f8fafc',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {file.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      {file.suggestedFolder} • {file.createdAtDescription}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{file.sizeFormatted}</span>
                  {!file.isOrganized ? (
                    <button
                      type="button"
                      onClick={() => onOrganizeSingle(file.id)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        fontSize: '0.75rem',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Organize
                    </button>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#10b981',
                        backgroundColor: '#064e3b',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                      }}
                    >
                      Sorted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: '#121824',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' }}>
              Quick Actions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                onClick={onTriggerScan}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#151d2a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ color: '#3b82f6' }}>
                  <Play size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    Scan &amp; Organize
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                    Scan Downloads and Desktop into smart folders
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('search')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#151d2a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ color: '#10b981' }}>
                  <Search size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    Find File in Natural Language
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                    Ask like talking to a human assistant
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('duplicates')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#151d2a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ color: '#f59e0b' }}>
                  <Trash2 size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    Duplicate Hunter ({duplicateCount} found)
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                    Free disk space &amp; clean redundant copies
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('desktop')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#151d2a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ color: '#8b5cf6' }}>
                  <FolderOpen size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    Clean Desktop View
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                    A cleaner laptop, a calmer mind
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Box */}
          <div
            style={{
              backgroundColor: '#101622',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
            }}
          >
            <Shield size={24} color="#10b981" />
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                Privacy Shield Active
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                Local processing only. Files never leave your machine without permission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
