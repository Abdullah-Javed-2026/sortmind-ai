'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FolderTree, UploadCloud, Copy, Search, Download, Trash2, 
  CheckCircle2, X, Sun, Moon, Menu, ArrowLeft, ShieldCheck, 
  Sparkles, Layers
} from 'lucide-react';
import { useRealOrganizer } from '@/hooks/useRealOrganizer';
import { useTheme } from '@/hooks/useTheme';
import { UploadZone } from '@/components/real/UploadZone';
import { FolderTreePreview } from '@/components/real/FolderTreePreview';
import { DuplicateManager } from '@/components/real/DuplicateManager';
import { RealSearch } from '@/components/real/RealSearch';
import { formatBytes } from '@/utils/fileOrganizer';

export const WorkspaceApp: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme, toggleTheme, isDark, mounted } = useTheme();

  const {
    files,
    filteredFiles,
    folderTree,
    duplicateGroups,
    activeTab,
    setActiveTab,
    downloadProgress,
    searchQuery,
    setSearchQuery,
    addRawFiles,
    loadSampleFiles,
    clearFiles,
    removeFile,
    resolveDuplicateGroup,
    cleanAllDuplicates,
    triggerZipDownload,
    toast,
    dismissToast,
  } = useRealOrganizer();

  const totalBytes = files.reduce((sum, f) => sum + f.sizeBytes, 0);
  const redundantDuplicates = duplicateGroups.reduce((acc, g) => acc + (g.files.length - 1), 0);

  const navTabs = [
    { id: 'organize', label: 'Upload Files', icon: UploadCloud, count: files.length },
    { id: 'preview', label: 'Folder Tree Preview', icon: FolderTree, count: files.length },
    { id: 'duplicates', label: 'Duplicate Hunter', icon: Copy, count: duplicateGroups.length },
    { id: 'search', label: 'Search & Filter', icon: Search },
  ];

  const currentTabObj = navTabs.find((t) => t.id === activeTab) || navTabs[0];

  return (
    <div className="workspace-page-wrapper">
      <div className="workspace-app-container">

        {/* 1. Sleek Top Header Bar */}
        <header className="workspace-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="theme-toggle-btn mobile-menu-btn"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              aria-label="Toggle workspace sidebar"
              style={{ display: 'none' }}
            >
              {mobileSidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {/* Brand Logo & Name */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
              }}
            >
              <img
                src="/logo.png"
                alt="SortMind AI"
                style={{
                  height: '30px',
                  width: 'auto',
                  maxHeight: '30px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.01em',
                }}
              >
                Workspace
              </span>
            </Link>

            <span style={{ color: 'var(--border)', margin: '0 0.15rem' }}>/</span>

            {/* Active View Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                {currentTabObj.label}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  backgroundColor: 'var(--card-inner)',
                  border: '1px solid var(--border)',
                  color: 'var(--muted-foreground)',
                  padding: '0.1rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: 500,
                }}
              >
                Local In-Memory Core
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* 1-Click Sample Batch Loader */}
            <button
              type="button"
              className="btn-pill-secondary"
              onClick={loadSampleFiles}
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
              title="Load 10 realistic sample files to test sorting"
            >
              <Sparkles size={14} color="var(--primary)" />
              <span>Load Sample Files</span>
            </button>

            {/* Clear All Button (if files loaded) */}
            {files.length > 0 && (
              <button
                type="button"
                className="btn-pill-secondary"
                onClick={clearFiles}
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', color: '#ef4444' }}
              >
                <Trash2 size={13} />
                <span>Clear</span>
              </button>
            )}

            {/* Quick Export ZIP (Desktop) */}
            <button
              type="button"
              className="btn-pill-primary desktop-only-btn"
              onClick={triggerZipDownload}
              disabled={files.length === 0 || downloadProgress !== null}
              style={{ fontSize: '0.825rem', padding: '0.5rem 1.15rem' }}
            >
              <Download size={14} />
              <span>
                {downloadProgress !== null
                  ? `ZIP (${downloadProgress}%)...`
                  : files.length > 0
                    ? `Export ZIP (${files.length})`
                    : `Export ZIP`}
              </span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
              title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
            >
              {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Back to Home Link */}
            <Link
              href="/"
              className="btn-pill-ghost desktop-only-btn"
              style={{ fontSize: '0.825rem', padding: '0.45rem 0.85rem', textDecoration: 'none' }}
            >
              <ArrowLeft size={14} />
              <span>Website</span>
            </Link>
          </div>
        </header>

        {/* Mobile Horizontal Pill Bar (Matches Screenshot) */}
        <div className="mobile-pill-bar-container">
          <div className="segmented-pill-control" style={{ width: '100%', justifyContent: 'flex-start' }}>
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`segmented-pill-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={14} color={isActive ? 'var(--primary)' : 'var(--subtle-foreground)'} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        backgroundColor: isActive ? 'var(--primary-soft)' : 'var(--border)',
                        color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                        padding: '0.05rem 0.45rem',
                        borderRadius: '9999px',
                        fontWeight: 600,
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Layout Body (Sidebar + Content Pane) */}
        <div className="workspace-layout-body">
          
          {/* Mobile Backdrop Overlay */}
          <div
            className={`workspace-sidebar-backdrop ${mobileSidebarOpen ? 'open' : ''}`}
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Left Sidebar */}
          <aside className={`workspace-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
            
            {/* Top Sidebar Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Sidebar Header on Mobile */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)' }}>
                    File Sorter &amp; Packager
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="mobile-close-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted-foreground)',
                    cursor: 'pointer',
                    display: 'none',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Menu Tabs (Matching User Screenshot) */}
              <div>
                <div
                  style={{
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--subtle-foreground)',
                    padding: '0 0.5rem 0.65rem 0.5rem',
                  }}
                >
                  Workspace Tools
                </div>

                <nav className="workspace-nav-list">
                  {navTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setMobileSidebarOpen(false);
                        }}
                        className={`workspace-nav-item ${isActive ? 'active' : ''}`}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <Icon size={16} color={isActive ? 'var(--primary)' : 'var(--subtle-foreground)'} />
                          <span>{tab.label}</span>
                        </div>

                        {tab.count !== undefined && tab.count > 0 && (
                          <span className="workspace-nav-badge">
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Workspace Storage & Loaded Stats Card */}
              <div
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--subtle-foreground)', textTransform: 'uppercase' }}>
                    Active Storage
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--foreground)' }}>
                    {formatBytes(totalBytes)}
                  </span>
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--card-inner)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: files.length > 0 ? `${Math.min(100, Math.max(10, files.length * 8))}%` : '0%',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                  <span>{files.length} loaded items</span>
                  <span>{redundantDuplicates} duplicate{redundantDuplicates !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Sidebar Quick Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-pill-primary"
                  onClick={triggerZipDownload}
                  disabled={files.length === 0 || downloadProgress !== null}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.825rem', padding: '0.6rem 1rem' }}
                >
                  <Download size={15} />
                  <span>
                    {downloadProgress !== null
                      ? `Packaging (${downloadProgress}%)...`
                      : files.length > 0
                        ? `Download ZIP (${files.length})`
                        : `Download Organized ZIP`}
                  </span>
                </button>

                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={loadSampleFiles}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                >
                  <Sparkles size={14} color="var(--primary)" />
                  <span>Load Sample Files</span>
                </button>

                {files.length > 0 && (
                  <button
                    type="button"
                    className="btn-pill-secondary"
                    onClick={clearFiles}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.45rem 1rem', color: '#ef4444' }}
                  >
                    <Trash2 size={13} />
                    <span>Clear Workspace</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Sidebar Privacy Card & Return Link */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
              
              {/* Privacy Shield Box */}
              <div
                style={{
                  backgroundColor: 'var(--card-inner)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} color="#10b981" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--foreground)' }}>
                    Local Privacy Guaranteed
                  </span>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.4 }}>
                  Zero cloud uploads. All sorting, duplicates scan, and ZIP export run 100% in your browser.
                </p>
              </div>

              {/* Back to Home Link */}
              <Link
                href="/"
                className="btn-pill-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.85rem',
                  textDecoration: 'none',
                }}
              >
                <ArrowLeft size={14} />
                <span>Back to SortMind Website</span>
              </Link>
            </div>

          </aside>

          {/* Right Main Content Pane */}
          <main className="workspace-main-content">
            <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
              
              {activeTab === 'organize' && (
                <UploadZone
                  onFilesSelected={addRawFiles}
                  onLoadSampleBatch={loadSampleFiles}
                  currentCount={files.length}
                />
              )}

              {activeTab === 'preview' && (
                files.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '4rem 1.5rem',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px',
                    }}
                  >
                    <FolderTree size={44} color="var(--subtle-foreground)" style={{ margin: '0 auto 1.25rem auto' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.4rem' }}>
                      No files loaded in workspace yet
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', maxWidth: '440px', margin: '0 auto 1.75rem auto', lineHeight: 1.5 }}>
                      Drop files in the upload zone or test instantly with realistic sample documents, images, and spreadsheets.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                      <button
                        type="button"
                        className="btn-pill-primary"
                        onClick={() => setActiveTab('organize')}
                      >
                        <UploadCloud size={16} />
                        <span>Go to Upload Files</span>
                      </button>
                      <button
                        type="button"
                        className="btn-pill-secondary"
                        onClick={loadSampleFiles}
                      >
                        <Sparkles size={16} color="var(--primary)" />
                        <span>Load Sample Batch</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <FolderTreePreview
                    folderTree={folderTree}
                    files={files}
                    onRemoveFile={removeFile}
                    onDownloadZip={triggerZipDownload}
                    downloadProgress={downloadProgress}
                  />
                )
              )}

              {activeTab === 'duplicates' && (
                <DuplicateManager
                  groups={duplicateGroups}
                  onResolveGroup={resolveDuplicateGroup}
                  onCleanAll={cleanAllDuplicates}
                />
              )}

              {activeTab === 'search' && (
                <RealSearch
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filteredFiles={filteredFiles}
                  totalCount={files.length}
                />
              )}

            </div>
          </main>

        </div>

      </div>

      {/* Toast Notification Banner */}
      {toast && (
        <div className="toast-banner">
          <CheckCircle2 size={17} color="#10b981" />
          <span>{toast}</span>
          <button
            type="button"
            onClick={dismissToast}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted-foreground)',
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <style jsx>{`
        .mobile-pill-bar-container {
          display: none;
          padding: 0.75rem 1rem 0 1rem;
          background-color: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 960px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-close-btn {
            display: flex !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
          .mobile-pill-bar-container {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};
