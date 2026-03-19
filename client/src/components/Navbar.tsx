'use client';

import { useState } from 'react';
import { Moon, Sun, LogOut, ChevronDown, BookOpen, Settings, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { SearchBar } from './SearchBar';

interface NavbarProps {
  onSearchFocus?: (focused: boolean) => void;
}

export function Navbar({ onSearchFocus }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary-600), var(--primary-400))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BookOpen size={20} color="#fff" strokeWidth={2.2} />
            </div>
            <span style={{
              fontSize: 18, fontWeight: 800,
              background: 'linear-gradient(135deg, var(--primary-700), var(--primary-500))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              SearchAdvanced
            </span>
          </div>
        </a>

        {/* SearchBar - centered */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <SearchBar onFocusChange={onSearchFocus} />
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            style={{
              width: 38, height: 38, borderRadius: 10,
              border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-50)';
              e.currentTarget.style.borderColor = 'var(--primary-300)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-surface)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Avatar + Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setAvatarOpen((o) => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 10px 5px 6px',
                border: '1px solid var(--border-default)',
                borderRadius: 10,
                background: 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-300)';
                e.currentTarget.style.background = 'var(--primary-50)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.background = 'var(--bg-surface)';
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-300))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 14,
              }}>
                U
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>User</span>
              <ChevronDown size={14} color="var(--text-muted)" style={{ transition: 'transform 0.2s', transform: avatarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {avatarOpen && (
              <div className="animate-fade-in" style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 12, boxShadow: 'var(--shadow-lg)',
                minWidth: 180, padding: '6px',
                zIndex: 100,
              }}>
                <DropdownMenuItem icon={<User size={15} />} label="My Profile" />
                <DropdownMenuItem icon={<BookOpen size={15} />} label="My Courses" />
                <DropdownMenuItem icon={<Settings size={15} />} label="Settings" />
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: '6px 0' }} />
                <DropdownMenuItem icon={<LogOut size={15} />} label="Logout" danger />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function DropdownMenuItem({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px', borderRadius: 8, border: 'none',
        background: 'transparent', cursor: 'pointer', color: danger ? '#ef4444' : 'var(--text-primary)',
        fontSize: 13, fontWeight: 500, textAlign: 'left',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = danger ? '#fef2f2' : 'var(--bg-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {icon} {label}
    </button>
  );
}
