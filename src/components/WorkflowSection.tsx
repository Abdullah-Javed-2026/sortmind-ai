'use client';

import React from 'react';
import { UploadCloud, FolderTree, Download } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Add files or directory',
      desc: 'Drag & drop unorganized downloads, photos, PDFs, spreadsheets, or an entire folder.',
      icon: UploadCloud,
      color: '#3b82f6',
      example: 'scan_001.pdf, photo.jpg, budget.xlsx',
    },
    {
      num: '02',
      title: 'Automatic sorting',
      desc: 'SortMind parses content and routes PNGs to Images/PNG, PDFs to Documents/PDF, and Excels to Spreadsheets.',
      icon: FolderTree,
      color: '#10b981',
      example: 'Images/PNG/ • Documents/PDF/ • Videos/',
    },
    {
      num: '03',
      title: 'Preview tree & download',
      desc: 'Inspect the destination folder tree, eliminate duplicate files, and download the organized ZIP archive.',
      icon: Download,
      color: '#8b5cf6',
      example: 'SortMind_Organized.zip ready for extraction',
    },
  ];

  return (
    <section id="workflow" style={{ padding: '3.5rem 0' }}>
      <div className="heading-center" style={{ maxWidth: '680px', marginBottom: '2.5rem' }}>
        <h2 className="heading-section">
          How SortMind organizes your files
        </h2>
        <p className="subtext-center">
          A transparent 3-step workflow. You inspect and verify the destination tree before downloading.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {steps.map((st) => {
          const IconComponent = st.icon;

          return (
            <div
              key={st.num}
              className="clean-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-soft)',
                    color: 'var(--primary)',
                    border: '1px solid var(--primary-soft-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {st.num}
                </span>

                <div
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--card-inner)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: st.color,
                  }}
                >
                  <IconComponent size={17} />
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.45rem' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--subtle-foreground)',
                }}
              >
                <span>{st.example}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
