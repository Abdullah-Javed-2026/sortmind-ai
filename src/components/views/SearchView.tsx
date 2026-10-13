'use client';

import React from 'react';
import { Search, Sparkles, FileText, ArrowRight, CornerDownLeft, X, Filter } from 'lucide-react';
import { FileItem } from '@/types/files';
import { useNaturalSearch } from '@/hooks/useNaturalSearch';

interface SearchViewProps {
  files: FileItem[];
  onOrganizeSingle: (id: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ files, onOrganizeSingle }) => {
  const {
    query,
    setQuery,
    activeCategoryFilter,
    setActiveCategoryFilter,
    filteredResults,
    popularPrompts,
    hasActiveFilter,
    resetFilters,
  } = useNaturalSearch(files);

  const categories = ['All', 'PDFs', 'Documents', 'Images', 'Videos', 'Spreadsheets'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: '#121824',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
          Natural-Language Search
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
          Stop searching with complex folder paths. Search with intent, plain English, or memory descriptions.
        </p>
      </div>

      {/* Main Search Input Box */}
      <div
        style={{
          backgroundColor: '#101622',
          border: '1px solid #2d3b55',
          borderRadius: '12px',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Search size={22} color="#3b82f6" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Ask anything... (e.g. "Find the PDF I downloaded last week" or "Show invoices")'
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f8fafc',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#1e293b',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            color: '#94a3b8',
            fontSize: '0.75rem',
          }}
        >
          <Sparkles size={14} color="#3b82f6" />
          <span>Local Semantic AI</span>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Try asking:</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {popularPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setQuery(prompt)}
              style={{
                backgroundColor: query === prompt ? '#1d4ed8' : '#151d2a',
                color: query === prompt ? '#ffffff' : '#cbd5e1',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Filter Category Tabs & Stats */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          paddingTop: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategoryFilter(c)}
              className={`filter-chip ${activeCategoryFilter === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Found <strong>{filteredResults.length}</strong> matching files
          </span>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div
        style={{
          backgroundColor: '#121824',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {filteredResults.length === 0 ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <Search size={36} color="#475569" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1rem', color: '#f8fafc', marginBottom: '0.5rem' }}>No files matched your prompt</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '420px', margin: '0 auto' }}>
              Try searching with broader phrases like &ldquo;PDFs&rdquo;, &ldquo;recent proposals&rdquo;, or &ldquo;budget&rdquo;.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredResults.map((file, idx) => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderBottom: idx < filteredResults.length - 1 ? '1px solid #1e293b' : 'none',
                  backgroundColor: '#121824',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={18} color="#f59e0b" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>
                        {file.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: '#1e293b',
                          color: '#94a3b8',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                        }}
                      >
                        {file.category}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {file.suggestedFolder}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>•</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {file.createdAtDescription}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>•</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {file.sizeFormatted}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  {!file.isOrganized && (
                    <button
                      type="button"
                      onClick={() => onOrganizeSingle(file.id)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        fontSize: '0.75rem',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Organize
                    </button>
                  )}
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: '#10b981',
                      backgroundColor: '#064e3b',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    Matched
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
