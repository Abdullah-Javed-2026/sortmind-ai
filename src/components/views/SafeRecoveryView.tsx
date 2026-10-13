'use client';

import React from 'react';
import { Undo2, CheckCircle2, ShieldCheck, Clock, FileCheck, RotateCcw } from 'lucide-react';
import { UndoLogItem } from '@/types/files';

interface SafeRecoveryViewProps {
  history: UndoLogItem[];
  onRestoreAction: (logId: string) => void;
}

export const SafeRecoveryView: React.FC<SafeRecoveryViewProps> = ({
  history,
  onRestoreAction,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#121824',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Safe Recovery &amp; 1-Click Undo
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Zero risk guarantee. Every organization, move, or duplicate clean can be instantly undone.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#064e3b',
            color: '#a7f3d0',
            border: '1px solid #047857',
            padding: '0.45rem 0.85rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
          }}
        >
          <ShieldCheck size={16} />
          <span>Non-destructive Audit Ledger</span>
        </div>
      </div>

      {/* History Ledger List */}
      <div
        style={{
          backgroundColor: '#121824',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
            Recent Activity Audit Log ({history.length})
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {history.map((log, idx) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.15rem 1.25rem',
                borderBottom: idx < history.length - 1 ? '1px solid #1e293b' : 'none',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', minWidth: 0 }}>
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: log.status === 'restored' ? '#1e293b' : '#1e3a8a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <RotateCcw size={18} color={log.status === 'restored' ? '#94a3b8' : '#60a5fa'} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                      {log.description}
                    </p>
                    {log.status === 'restored' ? (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#1e293b',
                          color: '#94a3b8',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        Restored / Undone
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#064e3b',
                          color: '#6ee7b7',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        Active
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
                    Timestamp: {log.timestamp} • Action: {log.actionType.toUpperCase()}
                  </p>
                </div>
              </div>

              <div>
                {log.status === 'active' ? (
                  <button
                    type="button"
                    onClick={() => onRestoreAction(log.id)}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                  >
                    <Undo2 size={15} />
                    <span>Undo This Action</span>
                  </button>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Original State Restored</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
