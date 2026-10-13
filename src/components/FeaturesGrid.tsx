'use client';

import React from 'react';
import { Camera, Briefcase, BookOpen } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const personas = [
    {
      title: 'Designers & Photographers',
      desc: 'RAW photos, screenshots, and artwork sorted into PNG, JPG, WebP, and SVG subdirectories automatically.',
      icon: Camera,
      color: '#10b981',
      example: 'Images/PNG/ • Images/JPG/',
    },
    {
      title: 'Finance & Operations',
      desc: 'Invoices, bank statements, and quarterly budget spreadsheets routed to Documents/PDF and Spreadsheets/Excel.',
      icon: Briefcase,
      color: '#3b82f6',
      example: 'Documents/PDF/ • Spreadsheets/Excel/',
    },
    {
      title: 'Research & Education',
      desc: 'Academic papers, study slides, and literature notes kept in dedicated research subfolders without clutter.',
      icon: BookOpen,
      color: '#f59e0b',
      example: 'Documents/Word/ • Documents/Text/',
    },
  ];

  const coreCapabilities = [
    {
      title: 'Automatic Subdirectory Sorting',
      desc: 'Parses extensions and routes PNGs, JPGs, PDFs, Excel sheets, and MP4 videos into organized folder trees.',
    },
    {
      title: 'Interactive Tree Preview',
      desc: 'Review destination folder and filename mappings before downloading the final archive.',
    },
    {
      title: 'Duplicate Hunter',
      desc: 'Detects redundant files across folders to reclaim disk space without accidental loss.',
    },
    {
      title: '100% In-Memory Privacy',
      desc: 'Processing runs strictly inside local browser memory. No files are uploaded to external servers.',
    },
  ];

  return (
    <section id="capabilities" style={{ padding: '3.5rem 0' }}>
      
      {/* Centered Heading */}
      <div className="heading-center" style={{ maxWidth: '680px', marginBottom: '2.5rem' }}>
        <h2 className="heading-section">
          Built for everyday file workflows
        </h2>
        <p className="subtext-center">
          SortMind eliminates manual drag-and-drop file organization across downloads and project folders.
        </p>
      </div>

      {/* 3 Personas Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {personas.map((p) => {
          const Icon = p.icon;

          return (
            <div key={p.title} className="clean-card" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--card-inner)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: p.color,
                  marginBottom: '1rem',
                }}
              >
                <Icon size={20} />
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.45rem' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                {p.desc}
              </p>

              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--subtle-foreground)',
                  backgroundColor: 'var(--card-inner)',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                }}
              >
                {p.example}
              </span>
            </div>
          );
        })}
      </div>

      {/* 4 Feature Points Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          padding: '1.75rem',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
        }}
      >
        {coreCapabilities.map((c) => (
          <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
              {c.title}
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--muted-foreground)', lineHeight: 1.5, margin: 0 }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};
