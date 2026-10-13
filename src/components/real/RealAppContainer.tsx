'use client';

import React from 'react';
import { 
  FolderTree, UploadCloud, Copy, Search, Download, Trash2, 
  CheckCircle2, X
} from 'lucide-react';
import { useRealOrganizer } from '@/hooks/useRealOrganizer';
import { UploadZone } from './UploadZone';
import { FolderTreePreview } from './FolderTreePreview';
import { DuplicateManager } from './DuplicateManager';
import { RealSearch } from './RealSearch';
import { formatBytes } from '@/utils/fileOrganizer';

export const RealAppContainer: React.FC = () => {
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

  const navTabs = [
    { id: 'organize', label: 'Upload Files', icon: UploadCloud, count: files.length },
    { id: 'preview', label: 'Folder Tree Preview', icon: FolderTree, count: files.length },
    { id: 'duplicates', label: 'Duplicate Hunter', icon: Copy, count: duplicateGroups.length },
    { id: 'search', label: 'Search & Filter', icon: Search },
  ];

  return (
    <div id="workspace" style={{ width: '100%', maxWidth: '1140px', margin: '0 auto', paddingBottom: '3.5rem' }}>
      
      {/* Clean Window Frame */}
      <div className="clean-workspace-window">
        
        {/* Title Bar (Native Window Aesthetic) */}
        <div className="clean-window-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted-foreground)', marginLeft: '0.35rem' }}>
              SortMind Workspace — Local File Sorter &amp; Packager
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--subtle-foreground)' }}>
              {files.length > 0 ? `${files.length} items loaded (${formatBytes(totalBytes)})` : 'No files loaded'}
            </span>
          </div>
        </div>

        {/* Toolbar Bar: Segmented Pill Tabs + Action Buttons */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            borderBottom: '1px solid var(--border)',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Segmented Control Pill Bar */}
          <div className="segmented-pill-control">
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
                  <Icon size={15} color={isActive ? 'var(--primary)' : 'var(--subtle-foreground)'} />
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

          {/* Quick Actions Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {files.length > 0 && (
              <button
                type="button"
                className="btn-pill-secondary"
                onClick={clearFiles}
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', color: '#ef4444' }}
              >
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            )}

            <button
              type="button"
              className="btn-pill-primary"
              onClick={triggerZipDownload}
              disabled={files.length === 0 || downloadProgress !== null}
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem' }}
            >
              <Download size={15} />
              <span>
                {downloadProgress !== null
                  ? `Compressing ZIP (${downloadProgress}%)...`
                  : files.length > 0
                    ? `Download Organized ZIP (${files.length} Files)`
                    : `Download Organized ZIP`}
              </span>
            </button>
          </div>
        </div>

        {/* Main Work Area */}
        <main
          style={{
            backgroundColor: 'var(--surface)',
            padding: '1.75rem',
            minHeight: '480px',
          }}
        >
          {activeTab === 'organize' && (
            <UploadZone
              onFilesSelected={addRawFiles}
              onLoadSampleBatch={loadSampleFiles}
              currentCount={files.length}
            />
          )}

          {activeTab === 'preview' && (
            files.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
                <FolderTree size={40} color="var(--subtle-foreground)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--foreground)', marginBottom: '0.35rem' }}>
                  No files loaded in workspace
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  Drop unorganized files in the upload tab to preview and package.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn-pill-primary"
                    onClick={() => setActiveTab('organize')}
                  >
                    <UploadCloud size={15} />
                    <span>Go to Upload Zone</span>
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
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast-banner">
          <CheckCircle2 size={17} color="#10b981" />
          <span>{toast}</span>
          <button
            type="button"
            onClick={dismissToast}
            style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
