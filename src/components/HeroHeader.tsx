'use client';

import Link from 'next/link';
import { FolderSync, Check } from 'lucide-react';

interface HeroHeaderProps {
  onLoadSamples?: () => void;
  onScrollToWorkspace?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onLoadSamples, onScrollToWorkspace }) => {
  return (
    <section style={{ paddingTop: '3rem', paddingBottom: '2.5rem' }}>
      <div className="heading-center" style={{ maxWidth: '800px' }}>
        
        {/* Strictly centered headline - ZERO badges above */}
        <h1 className="heading-hero">
          Automatic File Organization &amp; Subfolder Sorting
        </h1>

        <p className="subtext-center">
          Drop messy downloads or desktop folders. SortMind arranges your documents, photos, spreadsheets,
          and media into clean subdirectories with real-time preview and 1-click organized ZIP export.
        </p>

        {/* Clean Pill Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            marginTop: '2rem',
          }}
        >
          <Link
            href="/workspace"
            className="btn-pill-primary"
            style={{ padding: '0.8rem 1.75rem', fontSize: '0.95rem', textDecoration: 'none' }}
          >
            <FolderSync size={17} />
            <span>Select Files to Organize</span>
          </Link>
        </div>

        {/* Minimal Checklist Signals (Zero founder name, clean text) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.75rem',
            fontSize: '0.825rem',
            color: 'var(--muted-foreground)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={15} color="#10b981" />
            <span>100% In-Memory Processing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={15} color="#10b981" />
            <span>Zero Cloud Uploads</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={15} color="#10b981" />
            <span>Instant ZIP Export</span>
          </div>
        </div>

      </div>
    </section>
  );
};
