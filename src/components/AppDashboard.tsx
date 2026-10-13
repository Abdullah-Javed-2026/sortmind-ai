'use client';

import React, { useState } from 'react';
import { 
  Home, FolderTree, Search, Copy, Monitor, History, Settings, Shield,
  Minus, Square, X, CheckCircle2, ChevronRight, Menu
} from 'lucide-react';
import { ActiveTab, FileItem } from '@/types/files';
import { HomeView } from './views/HomeView';
import { CategoriesView } from './views/CategoriesView';
import { SearchView } from './views/SearchView';
import { DuplicatesView } from './views/DuplicatesView';
import { DesktopCleanView } from './views/DesktopCleanView';
import { SafeRecoveryView } from './views/SafeRecoveryView';
import { useFileStore } from '@/hooks/useFileStore';
import { ScanModal } from './ScanModal';

export const AppDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    files,
    duplicateGroups,
    stats,
    isScanning,
    scanStep,
    startDeepScan,
    organizeFile,
    organizeAll,
    resolveDuplicateGroup,
    cleanAllDuplicates,
    history,
    restoreAction,
    toastMessage,
    dismissToast,
  } = useFileStore();

  const handleTriggerScan = () => {
    setIsModalOpen(true);
    startDeepScan();
  };

  const navItems: { id: ActiveTab; label: string; icon: any; count?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: FolderTree, count: files.filter(f => !f.isOrganized).length },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'duplicates', label: 'Duplicates', icon: Copy, count: duplicateGroups.reduce((acc, g) => acc + (g.files.length - 1), 0) },
    { id: 'desktop', label: 'Clean Desktop View', icon: Monitor },
    { id: 'recovery', label: 'Safe Recovery', icon: History, count: history.filter(h => h.status === 'active').length },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', paddingBottom: '3rem' }}>
      
      {/* Windows Application Window Container */}
      <div className="desktop-app-frame">
        
        {/* Title Bar (Windows 11 Inspired Header) */}
        <div className="desktop-app-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: '#2563eb',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              S
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>
              SortMind AI — Windows Desktop Organizer [v1.0 Local Core]
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Window control buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <Minus size={13} />
              </div>
              <div
                style={{
                  width: '28px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <Square size={11} />
              </div>
              <div
                style={{
                  width: '28px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <X size={13} />
              </div>
            </div>
          </div>
        </div>

        {/* App Main Body: Sidebar + Main Content Area */}
        <div style={{ display: 'flex', minHeight: '680px', flexWrap: 'wrap' }}>
          
          {/* Left Sidebar */}
          <aside
            style={{
              width: '240px',
              backgroundColor: '#0f172a',
              borderRight: '1px solid #1e293b',
              padding: '1.25rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
            className="app-sidebar"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ padding: '0.35rem 0.65rem 0.75rem 0.65rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Navigation
              </div>

              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isActive ? '#1e293b' : 'transparent',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease, color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <IconComponent size={17} color={isActive ? '#3b82f6' : '#64748b'} />
                      <span>{item.label}</span>
                    </div>

                    {item.count !== undefined && item.count > 0 && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: isActive ? '#2563eb' : '#334155',
                          color: '#ffffff',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '9999px',
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Sidebar Privacy Card (Matches Screenshot) */}
            <div
              style={{
                marginTop: '1.5rem',
                backgroundColor: '#131d2e',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Shield size={16} color="#10b981" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>
                  Your files are safe
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                Local processing &amp; your privacy first. Zero cloud transmission.
              </p>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main
            style={{
              flex: 1,
              backgroundColor: '#0c1017',
              padding: '1.5rem',
              minWidth: '300px',
              overflowY: 'auto',
            }}
          >
            {activeTab === 'home' && (
              <HomeView
                files={files}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onTriggerScan={handleTriggerScan}
                onOrganizeSingle={organizeFile}
                onCleanAllDuplicates={cleanAllDuplicates}
                duplicateCount={duplicateGroups.reduce((acc, g) => acc + (g.files.length - 1), 0)}
              />
            )}

            {activeTab === 'categories' && (
              <CategoriesView
                files={files}
                onOrganizeAll={organizeAll}
                onOrganizeSingle={organizeFile}
              />
            )}

            {activeTab === 'search' && (
              <SearchView
                files={files}
                onOrganizeSingle={organizeFile}
              />
            )}

            {activeTab === 'duplicates' && (
              <DuplicatesView
                groups={duplicateGroups}
                onResolveGroup={resolveDuplicateGroup}
                onCleanAll={cleanAllDuplicates}
              />
            )}

            {activeTab === 'desktop' && (
              <DesktopCleanView />
            )}

            {activeTab === 'recovery' && (
              <SafeRecoveryView
                history={history}
                onRestoreAction={restoreAction}
              />
            )}
          </main>
        </div>
      </div>

      {/* Deep Scan Modal */}
      <ScanModal
        isOpen={isModalOpen}
        scanStep={scanStep}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={dismissToast}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 840px) {
          .app-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid #1e293b !important;
          }
        }
      `}</style>
    </div>
  );
};
