'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { CourseCard } from '@/components/CourseCard';
import { useFeaturedCourses } from '@/hooks/api/useCourse';
import { useHotSearches } from '@/hooks/api/useSearch';
import { TrendingUp, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [overlayActive, setOverlayActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const { data: featured, isLoading: apiLoading } = useFeaturedCourses(8);
  const { data: hotSearches } = useHotSearches();

  // Simulated 1s delay to show skeleton smoother
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = apiLoading || !isReady;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Overlay when search is focused */}
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

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--primary-50)', border: '1px solid var(--primary-200)',
            borderRadius: 999, padding: '5px 14px', marginBottom: 20,
            color: 'var(--primary-700)', fontSize: 13, fontWeight: 600,
          }}>
            <Sparkles size={14} /> Discover your next skill
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900,
            lineHeight: 1.15, marginBottom: 16,
            background: 'linear-gradient(135deg, var(--primary-800) 0%, var(--primary-500) 60%, #60c3f8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Learn Anything,<br />Anytime, Anywhere
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 40px' }}>
            Explore thousands of expert-led courses. Search by topic, level, or category — find exactly what you need.
          </p>
        </section>

        {/* Hot Searches Section */}
        {hotSearches && hotSearches.length > 0 && (
          <section style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <TrendingUp size={20} color="var(--primary-600)" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Trending Searches</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {hotSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => router.push(`/explore?q=${encodeURIComponent(term)}`)}
                  style={{
                    background: 'var(--bg-surface)', color: 'var(--text-primary)',
                    border: '1px solid var(--border-default)', borderRadius: 999,
                    padding: '8px 18px', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-600)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'var(--primary-600)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-surface)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-default)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  🔥 {term}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Featured Courses Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>Featured Courses</h2>
            <button
              onClick={() => router.push('/explore')}
              style={{
                background: 'none', border: '1px solid var(--primary-300)',
                color: 'var(--primary-600)', borderRadius: 8, padding: '7px 16px',
                cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary-600)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--primary-600)';
              }}
            >
              View All →
            </button>
          </div>

          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <div className="skeleton" style={{ height: 160 }} />
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 16, width: '60%' }} />
                    <div className="skeleton" style={{ height: 14, width: '100%' }} />
                    <div className="skeleton" style={{ height: 14, width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {featured?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
