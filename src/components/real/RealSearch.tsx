'use client';

import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { RealFileItem } from '@/types/files';

interface RealSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredFiles: RealFileItem[];
  totalCount: number;
}

export const RealSearch: React.FC<RealSearchProps> = ({
  searchQuery,
  onSearchChange,
  filteredFiles,
  totalCount,
}) => {
  const quickPrompts = [
    'All PNG images',
    'All JPG photos',
    'All PDF documents',
    'Spreadsheets and Excel',
    'Video files',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Search Input Box */}
      <div
        style={{
          backgroundColor: 'var(--card-inner)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Search size={20} color="var(--primary)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Filter files by query (e.g. "PNG", "PDF", "Excel", "Videos")...'
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--foreground)',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
          }}
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {quickPrompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onSearchChange(p)}
            className={`btn-pill-secondary ${searchQuery === p ? 'active' : ''}`}
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.85rem',
              backgroundColor: searchQuery === p ? 'var(--primary)' : 'var(--card)',
              color: searchQuery === p ? '#ffffff' : 'var(--muted-foreground)',
              borderColor: searchQuery === p ? 'var(--primary)' : 'var(--border)',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Results Table */}
      <div
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
            Matched Files ({filteredFiles.length} of {totalCount})
          </h3>
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset search
            </button>
          )}
        </div>

        <div style={{ overflowX: 'auto', maxHeight: '420px', overflowY: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Destination Folder Path</th>
                <th>Category</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((f) => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{f.name}</td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--primary)',
                        backgroundColor: 'var(--primary-soft)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      📁 {f.targetPath}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: 'var(--card-hover)',
                        color: 'var(--muted-foreground)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                      }}
                    >
                      {f.category}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted-foreground)' }}>{f.sizeFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
