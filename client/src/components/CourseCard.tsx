'use client';

import { Course } from '@/types';
import { Clock, Users, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatStudents(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

const levelColor: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

export function CourseCard({ course, compact = false }: CourseCardProps) {
  const router = useRouter();

  return (
    <div
      className="card"
      onClick={() => router.push(`/courses/${course.id}`)}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingTop: '56.25%', background: 'var(--bg-hover)', overflow: 'hidden' }}>
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${course.id}/400/225`;
          }}
        />
        {/* Price badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: course.price === 0 ? '#10b981' : 'var(--primary-600)',
          color: '#fff',
          padding: '3px 10px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
        }}>
          {course.price === 0 ? 'Free' : `$${course.price.toFixed(0)}`}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: compact ? '12px' : '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Category + Level */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {course.category && (
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--primary-600)',
              background: 'var(--primary-50)', padding: '2px 8px',
              borderRadius: 999, border: '1px solid var(--primary-200)',
            }}>
              {course.category.name}
            </span>
          )}
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: levelColor[course.level?.toLowerCase()] ?? '#64748b',
            background: '#f8fafc',
            padding: '2px 8px', borderRadius: 999,
            border: '1px solid var(--border-default)',
          }}>
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: compact ? 13 : 15,
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {course.title}
        </h3>

        {!compact && (
          <p style={{
            fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {course.description}
          </p>
        )}

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 12, marginTop: 'auto',
          color: 'var(--text-muted)', fontSize: 12,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={13} />
            {formatStudents(course.totalStudents)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} />
            {formatDuration(course.durationMinutes)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b' }}>
            <Star size={13} fill="#f59e0b" />
            4.7
          </span>
        </div>
      </div>
    </div>
  );
}
