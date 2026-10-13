'use client';

import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, HardDrive, Sparkles, X } from 'lucide-react';

interface ScanModalProps {
  isOpen: boolean;
  scanStep: number;
  onClose: () => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({ isOpen, scanStep, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'Indexing Local File System', desc: 'Scanning Windows Downloads & Desktop directories' },
    { num: 2, title: 'Bit-Level Content Hashing', desc: 'Comparing SHA-256 signatures for exact duplicates' },
    { num: 3, title: 'Local Semantic AI Classification', desc: 'Tagging documents (Invoices, Proposals, Research, Media)' },
    { num: 4, title: 'Safe Checkpoint Generation', desc: 'Writing non-destructive recovery ledger' },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0d121c',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Cpu size={20} color="#3b82f6" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              Deep Local Smart Scan
            </h3>
          </div>

          {scanStep === 0 && (
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {steps.map((st) => {
              const isCompleted = scanStep > st.num || scanStep === 0;
              const isCurrent = scanStep === st.num;

              return (
                <div
                  key={st.num}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    opacity: isCompleted || isCurrent ? 1 : 0.4,
                  }}
                >
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: isCompleted
                        ? '#064e3b'
                        : isCurrent
                        ? '#1e3a8a'
                        : '#1e293b',
                      color: isCompleted ? '#34d399' : isCurrent ? '#60a5fa' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : <span>{st.num}</span>}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                      {st.title}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy Note */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#101622',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.75rem',
              color: '#94a3b8',
            }}
          >
            <ShieldCheck size={16} color="#10b981" />
            <span>100% On-Device Processing. No files or metadata sent to external servers.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#0d121c',
            borderTop: '1px solid #1e293b',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
            disabled={scanStep > 0}
            style={{ opacity: scanStep > 0 ? 0.6 : 1 }}
          >
            {scanStep > 0 ? 'Scanning in progress...' : 'Complete & View Results'}
          </button>
        </div>
      </div>
    </div>
  );
};
