'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, HardDrive } from 'lucide-react';

export const ArchitectureRoadmap: React.FC = () => {
  return (
    <section id="security" style={{ padding: '3.5rem 0' }}>
      <div className="heading-center" style={{ maxWidth: '680px', marginBottom: '2.5rem' }}>
        <h2 className="heading-section">
          Privacy-First Architecture
        </h2>
        <p className="subtext-center">
          Engineered for local discretion. Your personal files, financial spreadsheets, and media never leave your machine.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Phase 1: In-Memory Core */}
        <div className="clean-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Phase 1 • Live In-Memory Engine
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  backgroundColor: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                }}
              >
                Active
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              Subfolder Sorting &amp; ZIP Generation
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Client-side file ingestion, format &amp; content categorization, interactive folder preview, and instant organized ZIP export.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--foreground)' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span><strong>Multi-Format Ingest:</strong> PNG, JPG, PDF, XLSX, MP4, Code</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--foreground)' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span><strong>Duplicate Hunter:</strong> Detects and eliminates redundant copies</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--foreground)' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span><strong>Tree Preview:</strong> Review destination hierarchy before export</span>
              </li>
            </ul>
          </div>

          <div
            style={{
              marginTop: '1.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--card-inner)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              fontSize: '0.8rem',
              color: 'var(--muted-foreground)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <ShieldCheck size={16} color="#10b981" />
            <span>Zero server dependencies · 100% In-memory execution</span>
          </div>
        </div>

        {/* Phase 2: Windows Shell */}
        <div className="clean-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Phase 2 • Native Windows Shell
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  backgroundColor: 'var(--card-inner)',
                  color: 'var(--muted-foreground)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                }}
              >
                Roadmap
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              Local Directory Watcher
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Native Windows background service monitoring Downloads and Desktop folders with real-time automatic sorting.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                <ArrowRight size={15} color="var(--subtle-foreground)" />
                <span><strong>Background Folder Watcher:</strong> Automatic Downloads sorting</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                <ArrowRight size={15} color="var(--subtle-foreground)" />
                <span><strong>Document Intelligence:</strong> Local semantic search on PDFs</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                <ArrowRight size={15} color="var(--subtle-foreground)" />
                <span><strong>Cross-Platform Sync:</strong> Peer-to-peer encrypted sync</span>
              </li>
            </ul>
          </div>

          <div
            style={{
              marginTop: '1.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--card-inner)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              fontSize: '0.8rem',
              color: 'var(--muted-foreground)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <HardDrive size={16} color="var(--primary)" />
            <span>Target Windows 10 / 11 Native Edition</span>
          </div>
        </div>
      </div>
    </section>
  );
};
