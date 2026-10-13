'use client';

import React, { useState } from 'react';
import { 
  Folder, FileText, Image as ImageIcon, Video, FileSpreadsheet, Archive, 
  Check, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import { FileItem, FileCategory } from '@/types/files';

interface CategoriesViewProps {
  files: FileItem[];
  onOrganizeAll: () => void;
  onOrganizeSingle: (fileId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  files,
  onOrganizeAll,
  onOrganizeSingle,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categoriesList: { name: string; count: number; size: string; icon: any; color: string }[] = [
    { name: 'All', count: files.length, size: '27.7 GB', icon: Folder, color: '#3b82f6' },
    { name: 'PDFs', count: files.filter(f => f.category === 'PDFs').length, size: '2.1 GB', icon: FileText, color: '#f59e0b' },
    { name: 'Documents', count: files.filter(f => f.category === 'Documents').length, size: '4.6 GB', icon: FileText, color: '#3b82f6' },
    { name: 'Images', count: files.filter(f => f.category === 'Images').length, size: '3.2 GB', icon: ImageIcon, color: '#10b981' },
    { name: 'Videos', count: files.filter(f => f.category === 'Videos').length, size: '15.7 GB', icon: Video, color: '#ef4444' },
    { name: 'Spreadsheets', count: files.filter(f => f.category === 'Spreadsheets').length, size: '1.3 GB', icon: FileSpreadsheet, color: '#10b981' },
    { name: 'Archives', count: files.filter(f => f.category === 'Archives').length, size: '0.8 GB', icon: Archive, color: '#8b5cf6' },
  ];

  const displayedFiles = selectedCat === 'All' 
    ? files 
    : files.filter(f => f.category === selectedCat);

  const unorganizedCount = files.filter(f => !f.isOrganized).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Header */}
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
            Smart Categorization
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            SortMind AI analyzes filenames, extensions, and content to group files into intuitive folders.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={onOrganizeAll}
          disabled={unorganizedCount === 0}
          style={{ opacity: unorganizedCount === 0 ? 0.6 : 1 }}
        >
          <Sparkles size={16} />
          <span>{unorganizedCount > 0 ? `Auto-Sort All (${unorganizedCount} pending)` : 'All Files Sorted'}</span>
        </button>
      </div>

      {/* Category Selection Filter Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {categoriesList.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = selectedCat === cat.name;

          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCat(cat.name)}
              className={`filter-chip ${isActive ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <IconComponent size={14} color={isActive ? '#ffffff' : cat.color} />
              <span>{cat.name}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#1e293b',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                }}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Smart Folders Hierarchy Box */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#151d2a',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Folder size={18} color="#3b82f6" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
              Work &amp; Operations
            </h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>
            Contracts, proposals, business plans, strategy documents.
          </p>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Smart rules: Keywords like &ldquo;proposal&rdquo;, &ldquo;nda&rdquo;, &ldquo;strategy&rdquo;
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#151d2a',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Folder size={18} color="#10b981" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
              Finance &amp; Taxes
            </h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>
            Invoices, tax returns, accounting balance sheets, receipts.
          </p>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Smart rules: .xlsx, .csv, keywords like &ldquo;invoice&rdquo;, &ldquo;budget&rdquo;
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#151d2a',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Folder size={18} color="#f59e0b" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
              Education &amp; Research
            </h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>
            Academic research papers, study notes, book extracts.
          </p>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Smart rules: Academic PDFs, references, research notes
          </div>
        </div>
      </div>

      {/* Files List Table */}
      <div
        style={{
          backgroundColor: '#121824',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
            Files in {selectedCat} ({displayedFiles.length})
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Target Destination Folder shown below
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Target Category</th>
                <th>Assigned Folder</th>
                <th>Size</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedFiles.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <FileText size={16} color="#94a3b8" />
                      <span style={{ fontWeight: 600, color: '#f8fafc' }}>{file.name}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        backgroundColor: '#1e293b',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        color: '#94a3b8',
                      }}
                    >
                      {file.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1', fontSize: '0.8rem' }}>
                      <Folder size={14} color="#3b82f6" />
                      <span>{file.suggestedFolder}</span>
                    </div>
                  </td>
                  <td style={{ color: '#94a3b8' }}>{file.sizeFormatted}</td>
                  <td>
                    {file.isOrganized ? (
                      <span style={{ color: '#10b981', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Check size={14} /> Organized
                      </span>
                    ) : (
                      <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>
                        Pending sort
                      </span>
                    )}
                  </td>
                  <td>
                    {!file.isOrganized ? (
                      <button
                        type="button"
                        onClick={() => onOrganizeSingle(file.id)}
                        style={{
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.3rem 0.65rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        Sort Now
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Up to date</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
