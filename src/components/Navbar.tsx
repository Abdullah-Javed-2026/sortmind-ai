'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sun, Moon, Download, Menu, X, FolderSync, Layers, 
  ShieldCheck, ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    {
      title: 'Workspace',
      desc: 'Interactive In-Memory File Sorter & Packager',
      href: '/workspace',
      icon: Sparkles,
      badge: 'App',
    },
    {
      title: 'How It Works',
      desc: '3-Step Intelligent File Relocation Workflow',
      href: '/#workflow',
      icon: Layers,
    },
    {
      title: 'Capabilities',
      desc: 'Built for Downloads, Desktop Clutter & Bulk Files',
      href: '/#capabilities',
      icon: CheckCircle2,
    },
    {
      title: 'Security & Privacy',
      desc: '100% In-Memory Processing, Zero Cloud Uploads',
      href: '/#security',
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      {/* 1. Floating Minimalist Navbar Header */}
      <div className="navbar-floating-wrapper">
        <header className={`navbar-floating-inner ${isScrolled ? 'scrolled' : 'at-top'}`}>
          
          {/* Left: Brand Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="SortMind AI"
              className="navbar-brand-logo"
              style={{
                height: '34px',
                width: 'auto',
                maxHeight: '34px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          {/* Right: Theme Toggle + Organize CTA + Minimalist Hamburger Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            
            {/* Light / Dark Mode Toggle Button */}
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

            {/* Quick Action Pill (Hidden on mobile < 480px to keep navbar sleek) */}
            <Link
              href="/workspace"
              className="btn-pill-primary navbar-cta-btn"
              style={{ textDecoration: 'none' }}
            >
              <Download size={15} />
              <span>Organize Files</span>
            </Link>

            {/* Minimalist Hamburger Menu Trigger (Active on all screen sizes) */}
            <button
              id="main-hamburger-btn"
              type="button"
              className={`hamburger-toggle-btn ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              title="Navigation Menu"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
              <span className="hamburger-btn-label">Menu</span>
            </button>
          </div>
        </header>
      </div>

      {/* 2. Frosted Glass Drawer Backdrop Overlay */}
      <div
        id="drawer-backdrop"
        className={`hamburger-drawer-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 3. Slide-in Minimalist Navigation Drawer */}
      <div
        id="drawer-pane"
        className={`hamburger-drawer-pane ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Top / Header */}
        <div>
          <div className="drawer-header">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
            >
              <img
                src="/logo.png"
                alt="SortMind AI"
                style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>

            <button
              id="close-drawer-btn"
              type="button"
              onClick={() => setMenuOpen(false)}
              className="theme-toggle-btn"
              aria-label="Close menu"
              title="Close menu"
            >
              <X size={17} />
            </button>
          </div>

          {/* Navigation Links List */}
          <div style={{ marginTop: '1.5rem' }}>
            <div
              style={{
                fontSize: '0.725rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--subtle-foreground)',
                marginBottom: '0.75rem',
                paddingLeft: '0.5rem',
              }}
            >
              Navigation
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="drawer-nav-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--card-inner)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <Icon size={18} color="var(--primary)" />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span className="drawer-nav-title">{item.title}</span>
                          {item.badge && (
                            <span
                              style={{
                                fontSize: '0.675rem',
                                backgroundColor: 'var(--primary-soft)',
                                color: 'var(--primary)',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '9999px',
                                fontWeight: 700,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="drawer-nav-desc">{item.desc}</div>
                      </div>
                    </div>

                    <ArrowRight size={15} color="var(--subtle-foreground)" style={{ flexShrink: 0 }} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Call-To-Action Box Inside Drawer */}
          <div className="drawer-cta-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FolderSync size={17} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                Sort Files Instantly
              </span>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.4 }}>
              Drop unorganized downloads or desktop folders. Automatically sort into subdirectories with instant ZIP export.
            </p>
            <Link
              href="/workspace"
              onClick={() => setMenuOpen(false)}
              className="btn-pill-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                textDecoration: 'none',
                padding: '0.65rem 1.25rem',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
              }}
            >
              <Download size={15} />
              <span>Launch Workspace</span>
            </Link>
          </div>
        </div>

        {/* Drawer Bottom / Footer */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          {/* Theme switcher control in drawer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: '10px',
              backgroundColor: 'var(--card-inner)',
              border: '1px solid var(--border)',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--foreground)', fontWeight: 500 }}>
              Appearance
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                all: 'unset',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.8rem',
                color: 'var(--primary)',
                fontWeight: 600,
              }}
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          {/* Privacy signal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
            <ShieldCheck size={15} color="#10b981" />
            <span>100% In-Memory Safe &bull; Zero Cloud Uploads</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 520px) {
          .navbar-cta-btn {
            display: none !important;
          }
          .hamburger-btn-label {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
