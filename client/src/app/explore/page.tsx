'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { CourseCard } from '@/components/CourseCard';
import { useSearchCourses } from '@/hooks/api/useSearch';
import { useCategories } from '@/hooks/api/useCourse';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [overlayActive, setOverlayActive] = useState(false);
  const [page, setPage] = useState(1);

  const q = searchParams.get('q') ?? '';
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') ?? '');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') ?? '');

  const { data: categories } = useCategories();
  const [isReady, setIsReady] = useState(false);

  const { data: results, isLoading: apiLoading, isFetching } = useSearchCourses({
    q: q || undefined,
    categoryId: selectedCategory || undefined,
    level: selectedLevel || undefined,
    page,
    pageSize: 12,
  });

  // Simulated 1s delay when filters or page change
  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, [q, selectedCategory, selectedLevel, page]);

  // Reset page when filters change (except q, which comes from URL)
  useEffect(() => { setPage(1); }, [selectedCategory, selectedLevel]);

  const isLoading = apiLoading || isFetching || !isReady;

  const handleFilter = (type: 'category' | 'level', value: string) => {
    if (type === 'category') setSelectedCategory((prev) => prev === value ? '' : value);
    else setSelectedLevel((prev) => prev === value ? '' : value);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div
        onClick={() => setOverlayActive(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'var(--bg-overlay)',
          opacity: overlayActive ? 1 : 0,
          pointerEvents: overlayActive ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      <Navbar onSearchFocus={setOverlayActive} />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
            {q ? (
              <>Results for &ldquo;<span style={{ color: 'var(--primary-600)' }}>{q}</span>&rdquo;</>
            ) : (
              'Explore All Courses'
            )}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
            {results?.length ?? 0} courses found
          </p>
        </div>

        {/* Filter Bar (Horizontal) */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 12, padding: '14px 20px',
          marginBottom: 28,
          display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', flexShrink: 0 }}>
            <Filter size={15} /> Filters:
          </span>

          {/* Category Filter */}
          {categories?.map((cat) => (
            <FilterChip
              key={cat.id}
              label={cat.name}
              active={selectedCategory === cat.id}
              onClick={() => handleFilter('category', cat.id)}
            />
          ))}

          <div style={{ width: 1, height: 22, background: 'var(--border-default)', flexShrink: 0 }} />

          {/* Level Filter */}
          {LEVELS.map((lvl) => (
            <FilterChip
              key={lvl}
              label={lvl}
              active={selectedLevel === lvl}
              onClick={() => handleFilter('level', lvl)}
            />
          ))}

          {/* Clear Filters */}
          {(selectedCategory || selectedLevel) && (
            <button
              onClick={() => { setSelectedCategory(''); setSelectedLevel(''); }}
              style={{
                marginLeft: 'auto', background: 'none', border: 'none',
                color: 'var(--primary-600)', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', textDecoration: 'underline',
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-default)' }}>
                <div className="skeleton" style={{ height: 160 }} />
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  <div className="skeleton" style={{ height: 16, width: '90%' }} />
                  <div className="skeleton" style={{ height: 14, width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : results && results.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {results.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>No courses found</h3>
            <p style={{ fontSize: 14 }}>Try a different search term or adjust your filters.</p>
          </div>
        )}

        {/* Pagination */}
        {results && results.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 48 }}>
            <PaginationBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={16} />
            </PaginationBtn>
            {[...Array(5)].map((_, i) => {
              const p = i + 1;
              return (
                <PaginationBtn key={p} onClick={() => setPage(p)} active={page === p}>
                  {p}
                </PaginationBtn>
              );
            })}
            <PaginationBtn onClick={() => setPage((p) => p + 1)} disabled={!results || results.length < 12}>
              <ChevronRight size={16} />
            </PaginationBtn>
          </div>
        )}
      </main>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
        border: `1.5px solid ${active ? 'var(--primary-500)' : 'var(--border-default)'}`,
        background: active ? 'var(--primary-600)' : 'var(--bg-surface)',
        color: active ? '#fff' : 'var(--text-primary)',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

function PaginationBtn({ children, onClick, active, disabled }: { children: React.ReactNode; onClick: () => void; active?: boolean; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 38, height: 38, borderRadius: 8, border: `1px solid ${active ? 'var(--primary-600)' : 'var(--border-default)'}`,
        background: active ? 'var(--primary-600)' : 'var(--bg-surface)',
        color: active ? '#fff' : 'var(--text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 600,
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </button>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-base)' }} />}>
      <ExploreContent />
    </Suspense>
  );
}
