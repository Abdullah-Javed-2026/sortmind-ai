'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Download, Sun, Moon, Sparkles, FolderSync, Check, 
  ShieldCheck, ArrowRight, Layers, FolderTree, Cpu, HardDrive
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const HeroHeader: React.FC = () => {
  const { toggleTheme, isDark, mounted } = useTheme();

  const navLinks = [
    { num: '01', label: 'WORKSPACE', href: '/workspace', isApp: true },
    { num: '02', label: 'HOW IT WORKS', href: '/#workflow' },
    { num: '03', label: 'CAPABILITIES', href: '/#capabilities' },
    { num: '04', label: 'SECURITY & ROADMAP', href: '/#security' },
  ];

  return (
    <section style={{ paddingTop: '1.25rem', paddingBottom: '2.5rem' }}>
      
      {/* Split Hero Card Container (Inspired by Demo Image) */}
      <div className="hero-split-wrapper">
        
        {/* =========================================================================
            LEFT COLUMN: Embedded Sidebar Navigation Panel
            ========================================================================= */}
        <aside className="hero-split-nav-col">
          
          {/* Top Brand & Version Block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                <img
                  src="/logo.png"
                  alt="SortMind AI"
                  style={{
                    height: '36px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Link>

              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  color: 'var(--muted-foreground)',
                }}
              >
                v1.0 LOCAL
              </span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: 'var(--foreground)',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                SORTMIND AI
              </h2>
              <div
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: 'var(--primary)',
                  marginTop: '0.5rem',
                  borderRadius: '9999px',
                }}
              />
            </div>

            {/* Numbered Navigation Links List (Matching 01, 02, 03... from demo image) */}
            <nav className="hero-nav-list">
              {navLinks.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="hero-nav-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className="hero-nav-num">{item.num}.</span>
                    <span className="hero-nav-label">{item.label}</span>
                  </div>

                  {item.isApp ? (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--primary-soft)',
                        color: 'var(--primary)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '9999px',
                      }}
                    >
                      APP
                    </span>
                  ) : (
                    <ArrowRight size={13} className="hero-nav-arrow" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom Seal / Privacy Indicator (Bottom of left panel) */}
          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                LOCAL PROCESSING
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--subtle-foreground)', margin: 0, lineHeight: 1.4 }}>
              100% In-Memory Processing &bull; Zero Cloud Uploads
            </p>
          </div>

        </aside>

        {/* =========================================================================
            RIGHT COLUMN: Main Hero Content Area
            ========================================================================= */}
        <div className="hero-split-content-col">
          
          {/* Top Bar of Hero: Pill Badge (Left) + 2 Buttons from Image 2 (Right) */}
          {/* Note: In normal flow, NOT sticky/fixed on scroll! */}
          <div className="hero-content-topbar">
            
            {/* Pill Badge Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'var(--card-inner)',
                border: '1px solid var(--border)',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.775rem',
                fontWeight: 600,
                color: 'var(--muted-foreground)',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={13} color="var(--primary)" />
              <span>THE LOCAL IN-MEMORY FILE ORGANIZER</span>
            </div>

            {/* Exactly the 2 Action Buttons from User Image 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              
              {/* Button 1: Theme Toggle (Sun / Moon) */}
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle light or dark theme"
                title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
              >
                {mounted && isDark ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
              </button>

              {/* Button 2: Organize Files CTA */}
              <Link
                href="/workspace"
                className="btn-pill-primary"
                style={{ textDecoration: 'none' }}
              >
                <Download size={15} />
                <span>Organize Files</span>
              </Link>
            </div>
          </div>

          {/* Main Headline (Matching aesthetic of demo image) */}
          <h1 className="hero-content-headline">
            Every file, organized<br />
            in one place.
          </h1>

          {/* Subtext */}
          <p className="hero-content-subtext">
            Drop messy downloads or desktop folders. SortMind arranges your documents, photos, spreadsheets,
            and media into clean subdirectories with real-time preview and 1-click organized ZIP export.
          </p>

          {/* Interactive Action Card (Matching the bottom filter card of the demo image) */}
          <div className="hero-interactive-card">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--subtle-foreground)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                ORGANIZATION FOCUS
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                <FolderTree size={15} color="var(--primary)" />
                <span>Smart Subdirectories</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--subtle-foreground)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PROCESSING ENGINE
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                <Cpu size={15} color="#10b981" />
                <span>100% Client In-Memory</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--subtle-foreground)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                EXPORT FORMAT
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                <HardDrive size={15} color="#f59e0b" />
                <span>Instant 1-Click .ZIP</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div>
              <Link
                href="/workspace"
                className="btn-pill-primary"
                style={{
                  padding: '0.75rem 1.45rem',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <FolderSync size={16} />
                <span>Select Files to Organize</span>
              </Link>
            </div>

          </div>

          {/* Minimal Checklist Signals */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.75rem',
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

      </div>

    </section>
  );
};
