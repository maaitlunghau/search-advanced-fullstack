'use client';

import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { useCourseDetail } from '@/hooks/api/useCourse';
import { Clock, Users, Globe, BarChart, Star, ArrowLeft, BookOpen } from 'lucide-react';
import { useState } from 'react';

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h} hours`;
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [overlayActive, setOverlayActive] = useState(false);
  const { data: course, isLoading } = useCourseDetail(id);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
        <Navbar onSearchFocus={setOverlayActive} />
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
          <div className="skeleton" style={{ height: 28, width: 180, marginBottom: 32, borderRadius: 8 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="skeleton" style={{ height: 320, borderRadius: 16 }} />
              <div className="skeleton" style={{ height: 40, width: '70%', borderRadius: 8 }} />
              <div className="skeleton" style={{ height: 20, borderRadius: 8 }} />
              <div className="skeleton" style={{ height: 20, width: '80%', borderRadius: 8 }} />
            </div>
            <div className="skeleton" style={{ height: 360, borderRadius: 16 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>Course not found</h2>
          <button onClick={() => router.push('/explore')} style={{ marginTop: 20, padding: '10px 24px', background: 'var(--primary-600)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div
        onClick={() => setOverlayActive(false)}
        style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'var(--bg-overlay)', opacity: overlayActive ? 1 : 0, pointerEvents: overlayActive ? 'all' : 'none', transition: 'opacity 0.3s ease' }}
      />
      <Navbar onSearchFocus={setOverlayActive} />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-600)', fontWeight: 600, fontSize: 14, marginBottom: 28, padding: 0, transition: 'gap 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
          onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
          {/* Left: Course Info */}
          <div>
            {/* Category badge */}
            {course.category && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-600)', background: 'var(--primary-50)', padding: '4px 12px', borderRadius: 999, border: '1px solid var(--primary-200)', display: 'inline-block', marginBottom: 16 }}>
                {course.category.name}
              </span>
            )}

            <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 16 }}>
              {course.title}
            </h1>

            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
              {course.description}
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32, padding: '20px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border-default)' }}>
              <Stat icon={<Star size={16} color="#f59e0b" fill="#f59e0b" />} label="Rating" value="4.7 / 5.0" />
              <Stat icon={<Users size={16} color="var(--primary-500)" />} label="Students" value={course.totalStudents.toLocaleString()} />
              <Stat icon={<Clock size={16} color="var(--primary-500)" />} label="Duration" value={formatDuration(course.durationMinutes)} />
              <Stat icon={<BarChart size={16} color="var(--primary-500)" />} label="Level" value={course.level} />
              <Stat icon={<Globe size={16} color="var(--primary-500)" />} label="Language" value={course.language} />
              <Stat icon={<BookOpen size={16} color="var(--primary-500)" />} label="Status" value={course.status} />
            </div>

            {/* Thumbnail (large) */}
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              style={{ width: '100%', borderRadius: 16, maxHeight: 380, objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${course.id}/800/450`; }}
            />
          </div>

          {/* Right: Enroll Card (sticky) */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="card" style={{ padding: 24, overflow: 'hidden' }}>
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, marginBottom: 20 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${course.id}/360/180`; }}
              />

              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--primary-600)', marginBottom: 4 }}>
                {course.price === 0 ? '🎉 Free' : `$${course.price.toFixed(2)}`}
              </div>

              <button style={{
                width: '100%', padding: '14px', marginTop: 16,
                background: 'linear-gradient(135deg, var(--primary-600), var(--primary-500))',
                color: '#fff', border: 'none', borderRadius: 10,
                fontSize: 16, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,130,246,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,130,246,0.4)'; }}
              >
                Enroll Now
              </button>

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[`✅ ${formatDuration(course.durationMinutes)} of content`, '✅ Certificate of completion', '✅ Full lifetime access', '✅ Access on mobile & desktop'].map((item) => (
                  <p key={item} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon}
      <div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{label}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</p>
      </div>
    </div>
  );
}
