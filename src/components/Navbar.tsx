'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <div className="navbar-floating-wrapper">
      <header className={`navbar-floating-inner ${isScrolled ? 'scrolled' : 'at-top'}`}>
        
        {/* Left: Just the Logo Image (No extra text as requested) */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
        </a>

        {/* Center: Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
          className="desktop-nav"
        >
          <a href="#workspace" className="btn-pill-ghost">Workspace</a>
          <a href="#workflow" className="btn-pill-ghost">How It Works</a>
          <a href="#capabilities" className="btn-pill-ghost">Capabilities</a>
          <a href="#security" className="btn-pill-ghost">Security</a>
        </nav>

        {/* Right: Theme Toggle (Sun/Moon) + Action Button */}
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

          {/* Clean Action Pill */}
          <a
            href="#workspace"
            className="btn-pill-primary"
            style={{ textDecoration: 'none' }}
          >
            <Download size={15} />
            <span>Organize Files</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            pointerEvents: 'auto',
            maxWidth: '1140px',
            margin: '0.5rem auto 0 auto',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <a
            href="#workspace"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Workspace
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            How It Works
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Capabilities
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Security
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
