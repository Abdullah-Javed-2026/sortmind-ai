'use client';

import React, { useState } from 'react';
import {
  GitFork,
  Globe,
  ShieldCheck,
  ArrowUpRight,
  Check,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Note: Invert logic
  // App is dark => Footer is LIGHT WHITE (like in demo image)
  // App is light => Footer is SLEEK DARK
  const isFooterLight = isDark; 

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  return (
    <div className="sortmind-footer-outer">
      <footer className="sortmind-footer-wrapper" role="contentinfo" aria-label="Footer">
        <div className="footer-inner-content">
        {/* Main Grid: Left Brand Block + 3 Navigation Columns */}
        <div className="footer-main-grid">
          
          {/* 1. Left Brand & Newsletter Block (Copy of demo image left side) */}
          <div className="footer-brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Brand Logo Only (No extra text as requested) */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png"
                alt="SortMind AI"
                className="footer-brand-logo"
                style={{
                  height: '66px',
                  width: 'auto',
                  maxHeight: '68px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Description Paragraph */}
            <p
              className="footer-desc"
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.65,
                margin: '0.25rem 0 0.5rem 0',
                maxWidth: '420px',
              }}
            >
              An open-source client-side sanctuary providing authentic, intelligent file organization,
              automated subfolder sorting, zero cloud uploads, and complete data privacy without distractions.
            </p>

            {/* Newsletter Pill Input (Exact copy of demo image) */}
            <form onSubmit={handleSubscribe} style={{ marginTop: '0.25rem' }}>
              <div className="footer-pill-input-box">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter email for daily tips & updates"
                  className="footer-pill-input"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="footer-subscribe-btn"
                >
                  {status === 'success' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Check size={14} strokeWidth={3} /> Subscribed
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>

              {status === 'error' && (
                <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.4rem', display: 'block' }}>
                  Please enter a valid email address.
                </span>
              )}
              {status === 'success' && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: isFooterLight ? '#059669' : '#34d399',
                    marginTop: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Sparkles size={13} /> You&apos;re subscribed to SortMind updates!
                </span>
              )}
            </form>
          </div>

          {/* 2. Column 1: ORGANIZE & SORT (Corresponds to READ & LISTEN in demo) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4
              className="footer-col-heading"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
                marginBottom: '0.35rem',
              }}
            >
              Organize &amp; Sort
            </h4>
            <a href="/workspace" className="footer-nav-link">
              Smart Subfolder Sorting
            </a>
            <a href="/workspace" className="footer-nav-link">
              Extension Route Rules
            </a>
            <a href="/workspace" className="footer-nav-link">
              In-Memory ZIP Generator
            </a>
            <a href="/workspace" className="footer-nav-link">
              Duplicate Detection
            </a>
            <a href="/workspace" className="footer-nav-link">
              Batch Folder Renamer
            </a>
          </div>

          {/* 3. Column 2: ARCHITECTURE & SAFETY (Corresponds to SPIRITUAL ESSENTIALS in demo) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4
              className="footer-col-heading"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
                marginBottom: '0.35rem',
              }}
            >
              Architecture &amp; Safety
            </h4>
            <a href="#security" className="footer-nav-link">
              100% In-Memory Processing
            </a>
            <a href="#security" className="footer-nav-link">
              Zero Cloud Uploads (Airgap)
            </a>
            <a href="#workflow" className="footer-nav-link">
              How It Works (Step 01–03)
            </a>
            <a href="#capabilities" className="footer-nav-link">
              Supported File Formats
            </a>
            <a href="#capabilities" className="footer-nav-link">
              Windows Subfolder Engine
            </a>
          </div>

          {/* 4. Column 3: PROJECT (Exact name from demo image with ↗ icons) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4
              className="footer-col-heading"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
                marginBottom: '0.35rem',
              }}
            >
              Project
            </h4>
            <a href="#capabilities" className="footer-nav-link">
              About SortMind AI
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
            >
              <span>Developer GitHub</span>
              <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
            >
              <span>Community Discord</span>
              <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
            >
              <span>Twitter / X Channel</span>
              <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
            </a>
            <a href="#workspace" className="footer-nav-link">
              Feedback &amp; Contact
            </a>
          </div>

        </div>

        {/* 5. Bottom Bar (Divider + Copyright + Round Social Buttons) */}
        <div
          className="footer-bottom-bar footer-divider"
          style={{
            marginTop: '3.5rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Copyright text matching demo format */}
          <p
            className="footer-copyright"
            style={{
              fontSize: '0.8rem',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            &copy; {new Date().getFullYear()} SortMind AI. Open &amp; free client-side file sanctuary.
          </p>

          {/* Right: Round icon action buttons matching demo image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              title="GitHub Repository"
              aria-label="GitHub Repository"
            >
              <GitFork size={16} />
            </a>

            <a
              href="https://sortmind.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              title="Global Community"
              aria-label="Global Community"
            >
              <Globe size={16} />
            </a>

            <div
              className="footer-social-btn"
              title="100% Client-Side Safe"
              style={{ cursor: 'default' }}
            >
              <ShieldCheck size={16} color={isFooterLight ? '#059669' : '#10b981'} />
            </div>
          </div>
        </div>

      </div>
    </footer>
  </div>
  );
};
