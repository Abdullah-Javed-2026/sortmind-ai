'use client';

import React from 'react';
import { Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { RealDuplicateGroup } from '@/types/files';

interface DuplicateManagerProps {
  groups: RealDuplicateGroup[];
  onResolveGroup: (groupId: string, keepFileId: string) => void;
  onCleanAll: () => void;
}

export const DuplicateManager: React.FC<DuplicateManagerProps> = ({
  groups,
  onResolveGroup,
  onCleanAll,
}) => {
  const redundantCount = groups.reduce((acc, g) => acc + (g.files.length - 1), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
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
            Duplicate Hunter
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
            Scans through uploaded files and detects duplicate copies by name and byte size.
          </p>
        </div>

        {groups.length > 0 ? (
          <button
            type="button"
            className="btn-pill-primary"
            onClick={onCleanAll}
            style={{ backgroundColor: '#ef4444' }}
          >
            <Trash2 size={16} />
            <span>Clean All Duplicates ({redundantCount} Files)</span>
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#10b981',
              backgroundColor: 'var(--primary-soft)',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
            }}
          >
            <CheckCircle2 size={16} />
            <span>No duplicates detected</span>
          </div>
        )}
      </div>

      {groups.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '3rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)', marginBottom: '0.35rem' }}>
            All files are unique
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', maxWidth: '400px', margin: '0 auto' }}>
            There are no redundant duplicate files in this batch.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {groups.map((group) => (
            <div
              key={group.id}
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
                    {group.filename}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>
                    {group.files.length} copies detected ({group.sizeFormatted} each)
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={() => onResolveGroup(group.id, group.files[0].id)}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  <span>Keep 1 Copy</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
                {group.files.map((file, idx) => (
                  <div
                    key={file.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: idx === 0 ? 'var(--card-hover)' : 'var(--card-inner)',
                      border: idx === 0 ? '1px solid var(--primary-soft-border)' : '1px solid var(--border)',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ color: idx === 0 ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: idx === 0 ? 600 : 400 }}>
                      {file.name}
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        backgroundColor: idx === 0 ? 'var(--primary-soft)' : 'rgba(239, 68, 68, 0.1)',
                        color: idx === 0 ? 'var(--primary)' : '#ef4444',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      {idx === 0 ? 'Primary Copy' : 'Redundant Duplicate'}
                    </span>
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
