'use client';

import React from 'react';
import { Trash2, CheckCircle2, ShieldCheck, AlertCircle, FileText, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';
import { DuplicateGroup } from '@/types/files';

interface DuplicatesViewProps {
  groups: DuplicateGroup[];
  onResolveGroup: (groupId: string, keepFileId?: string) => void;
  onCleanAll: () => void;
}

export const DuplicatesView: React.FC<DuplicatesViewProps> = ({
  groups,
  onResolveGroup,
  onCleanAll,
}) => {
  const totalDuplicatesCount = groups.reduce((acc, g) => acc + (g.files.length - 1), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
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
            Duplicate Hunter
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Detects bit-level and content-level duplicate files across folders to save storage space.
          </p>
        </div>

        {groups.length > 0 ? (
          <button
            type="button"
            className="btn-danger"
            onClick={onCleanAll}
          >
            <Trash2 size={16} />
            <span>Clean All ({totalDuplicatesCount} Redundant Copies)</span>
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#10b981',
              backgroundColor: '#064e3b',
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
            }}
          >
            <CheckCircle2 size={16} />
            <span>Zero duplicate clutter remaining</span>
          </div>
        )}
      </div>

      {/* Safety Notice */}
      <div
        style={{
          backgroundColor: '#101622',
          border: '1px solid #1e293b',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
        }}
      >
        <ShieldCheck size={20} color="#10b981" />
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
          <strong style={{ color: '#f8fafc' }}>Safe Deletion Guarantee:</strong> SortMind AI always preserves the primary original copy and creates a 1-click restore entry in your Safe Recovery log.
        </p>
      </div>

      {/* Duplicate Groups List */}
      {groups.length === 0 ? (
        <div
          style={{
            backgroundColor: '#121824',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
            All duplicate files are resolved!
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '450px', margin: '0 auto' }}>
            Your laptop storage is optimized. You can run another deep scan anytime from the navbar.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {groups.map((group) => (
            <div
              key={group.id}
              style={{
                backgroundColor: '#121824',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              {/* Group Header */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #1e293b',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {group.extension === 'jpg' || group.extension === 'png' ? (
                      <ImageIcon size={18} color="#10b981" />
                    ) : group.extension === 'mp4' ? (
                      <Video size={18} color="#ef4444" />
                    ) : (
                      <FileText size={18} color="#3b82f6" />
                    )}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                      {group.filename}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>
                      {group.totalSizeFormatted}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onResolveGroup(group.id)}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#f8fafc',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '0.45rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>Keep 1 (Original)</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Duplicate Copies List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                {group.files.map((file) => (
                  <div
                    key={file.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: file.isPrimary ? '#162234' : '#101622',
                      border: file.isPrimary ? '1px solid #2563eb' : '1px solid #1e293b',
                      borderRadius: '6px',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: file.isPrimary ? '#93c5fd' : '#cbd5e1',
                          fontWeight: file.isPrimary ? 600 : 400,
                          margin: 0,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {file.path}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                        Modified: {file.date} • {file.sizeFormatted}
                      </p>
                    </div>

                    <div>
                      {file.isPrimary ? (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: '#1e3a8a',
                            color: '#bfdbfe',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 600,
                          }}
                        >
                          Primary Original
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: '#7f1d1d',
                            color: '#fca5a5',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                          }}
                        >
                          Duplicate Copy
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
