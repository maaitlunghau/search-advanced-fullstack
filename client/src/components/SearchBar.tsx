'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchSuggestions, useHotSearches } from '@/hooks/api/useSearch';
import { useFeaturedCourses } from '@/hooks/api/useCourse';
import { Course } from '@/types';

const LOCAL_HISTORY_KEY = 'search_history';

function getHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveToHistory(q: string) {
  const history = getHistory();
  const filtered = history.filter((h) => h !== q);
  const updated = [q, ...filtered].slice(0, 8);
  localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
}

function removeFromHistory(q: string) {
  const updated = getHistory().filter((h) => h !== q);
  localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
}

function clearAllHistory() {
  localStorage.removeItem(LOCAL_HISTORY_KEY);
}

interface SearchBarProps {
  initialQuery?: string;
  onFocusChange?: (focused: boolean) => void;
}

export function SearchBar({ initialQuery = '', onFocusChange }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 400);

  const { data: suggestions, isFetching: isSuggesting } = useSearchSuggestions(debouncedQuery);
  const { data: hotSearches } = useHotSearches();
  const { data: featuredCourses, isLoading: apiLoadingFeatured } = useFeaturedCourses(4);
  const [isReadyFeatured, setIsReadyFeatured] = useState(false);
  const [isSearchingReady, setIsSearchingReady] = useState(false);

  // Load local history when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
      // Reset ready state each time it opens to show skeleton smoothly
      setIsReadyFeatured(false);
      const timer = setTimeout(() => setIsReadyFeatured(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Simulated delay for suggestions while typing
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearchingReady(false);
      const timer = setTimeout(() => setIsSearchingReady(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery]);

  const isFeaturedLoading = apiLoadingFeatured || !isReadyFeatured;
  const isTypingLoading = isSuggesting || !isSearchingReady;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        onFocusChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onFocusChange]);

  const handleFocus = () => {
    setIsOpen(true);
    onFocusChange?.(true);
  };

  const handleSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      saveToHistory(trimmed);
      setIsOpen(false);
      onFocusChange?.(false);
      router.push(`/explore?q=${encodeURIComponent(trimmed)}`);
    },
    [router, onFocusChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(query);
    if (e.key === 'Escape') {
      setIsOpen(false);
      onFocusChange?.(false);
      inputRef.current?.blur();
    }
  };

  const handleRemoveHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromHistory(item);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistory([]);
  };

  const isTyping = debouncedQuery.trim().length > 0;
  const showSuggestions = isTyping && suggestions;
  const showKeywords = showSuggestions && suggestions.keywords.length > 0;
  const showCourses = showSuggestions && suggestions.courses.length > 0;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: 640 }}>
      {/* Input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg-surface)',
        border: `1.5px solid ${isOpen ? 'var(--primary-500)' : 'var(--border-default)'}`,
        borderRadius: 12,
        padding: '10px 16px',
        boxShadow: isOpen ? 'var(--shadow-search)' : 'var(--shadow-sm)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}>
        <Search size={18} color={isOpen ? 'var(--primary-500)' : 'var(--text-muted)'} strokeWidth={2.2} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search for courses, topics, or skills..."
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: 15,
            fontFamily: 'inherit',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
        )}
        <button
          onClick={() => handleSearch(query)}
          style={{
            background: 'var(--primary-600)', color: '#fff',
            border: 'none', borderRadius: 8, padding: '6px 14px',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
            transition: 'background 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-700)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--primary-600)')}
        >
          Search <ArrowRight size={14} />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="animate-fade-in" style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 14, boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden', zIndex: 100,
          maxHeight: 520, overflowY: 'auto',
        }}>
          {!isTyping ? (
            <>
              {/* Local History */}
              {history.length > 0 && (
                <Section
                  icon={<Clock size={14} />}
                  title="Recent Searches"
                  action={<button onClick={handleClearAll} style={clearBtnStyle}>Clear all</button>}
                >
                  {history.map((item) => (
                    <DropdownItem
                      key={item}
                      label={item}
                      onClick={() => handleSearch(item)}
                      onRemove={(e) => handleRemoveHistory(item, e)}
                    />
                  ))}
                </Section>
              )}

              {/* Hot Searches */}
              {hotSearches && hotSearches.length > 0 && (
                <Section icon={<TrendingUp size={14} />} title="Trending Now">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '4px 0 8px' }}>
                    {hotSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        style={{
                          background: 'var(--primary-50)', color: 'var(--primary-700)',
                          border: '1px solid var(--primary-200)', borderRadius: 999,
                          padding: '5px 14px', fontSize: 13, fontWeight: 500,
                          cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--primary-600)';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--primary-50)';
                          e.currentTarget.style.color = 'var(--primary-700)';
                        }}
                      >
                        🔥 {term}
                      </button>
                    ))}
                  </div>
                </Section>
              )}

              {/* Featured Courses */}
              {(isFeaturedLoading || (featuredCourses && featuredCourses.length > 0)) && (
                <Section icon={<BookOpen size={14} />} title="Featured Courses">
                  {isFeaturedLoading ? (
                    [...Array(4)].map((_, i) => <MiniCourseSkeleton key={i} />)
                  ) : (
                    featuredCourses?.map((course) => (
                      <MiniCourseItem key={course.id} course={course} onClick={() => router.push(`/courses/${course.id}`)} />
                    ))
                  )}
                </Section>
              )}
            </>
          ) : (
            <>
              {/* While searching - show skeletons for keywords and courses */}
              {isTypingLoading ? (
                <>
                  <Section icon={<Search size={14} />} title="Suggestions">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} style={{ padding: '8px 12px' }}>
                        <div className="skeleton" style={{ height: 18, width: i === 0 ? '60%' : i === 1 ? '40%' : '55%', borderRadius: 4 }} />
                      </div>
                    ))}
                  </Section>
                  <Section icon={<BookOpen size={14} />} title="Related Courses">
                    {[...Array(2)].map((_, i) => <MiniCourseSkeleton key={i} />)}
                  </Section>
                </>
              ) : (
                <>
                  {showKeywords && (
                    <Section icon={<Search size={14} />} title="Suggestions">
                      {suggestions?.keywords.map((kw) => (
                        <DropdownItem key={kw} label={kw} onClick={() => handleSearch(kw)} />
                      ))}
                    </Section>
                  )}
                  {showCourses && (
                    <Section icon={<BookOpen size={14} />} title="Related Courses">
                      {suggestions?.courses.map((course) => (
                        <MiniCourseItem key={course.id} course={course} onClick={() => router.push(`/courses/${course.id}`)} />
                      ))}
                    </Section>
                  )}
                  {!showKeywords && !showCourses && (
                    <div style={{ padding: '20px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                      No results for &quot;{debouncedQuery}&quot;
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ===== Sub-components ===== */

function Section({ icon, title, action, children }: { icon: React.ReactNode; title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 6px', color: 'var(--text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{icon} {title}</span>
        {action}
      </div>
      <div style={{ padding: '0 8px 8px' }}>{children}</div>
    </div>
  );
}

function DropdownItem({ label, onClick, onRemove }: { label: string; onClick: () => void; onRemove?: (e: React.MouseEvent) => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
        color: 'var(--text-primary)', fontSize: 14,
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span>{label}</span>
      {onRemove && (
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-muted)', display: 'flex' }}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}

function MiniCourseItem({ course, onClick }: { course: Course; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
        borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <img
        src={course.thumbnailUrl}
        alt={course.title}
        style={{ width: 52, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0, background: 'var(--bg-hover)' }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${course.id}/52/36`; }}
      />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{course.totalStudents.toLocaleString()} students</p>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-600)', flexShrink: 0 }}>
        {course.price === 0 ? 'Free' : `$${course.price.toFixed(0)}`}
      </span>
    </div>
  );
}

function MiniCourseSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px' }}>
      <div className="skeleton" style={{ width: 52, height: 36, borderRadius: 6, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 11, width: '40%', borderRadius: 4 }} />
      </div>
      <div className="skeleton" style={{ width: 40, height: 16, borderRadius: 4 }} />
    </div>
  );
}

const clearBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: 11, color: 'var(--primary-600)', fontWeight: 600,
};
