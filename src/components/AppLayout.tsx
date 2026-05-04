import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X, LayoutDashboard, Settings } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'

interface AppLayoutProps {
  children: ReactNode
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/settings', icon: Settings, label: 'Settings' }
]

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
      <aside className="hidden md:flex flex-col w-60 border-r" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>StockFlow</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(29,120,116,0.12)', color: 'var(--color-primary)' }}>Africa</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: location.pathname === item.to ? 'rgba(29,120,116,0.10)' : 'transparent',
                color: location.pathname === item.to ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full hover:bg-muted transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 flex items-center justify-between px-4 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <Link to="/" className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>StockFlow Africa</Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {mobileOpen && (
          <div className="md:hidden border-b px-4 py-3 space-y-1" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                style={{ color: location.pathname === item.to ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
              >
                <item.icon className="w-4 h-4" />{item.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full" style={{ color: 'var(--color-text-secondary)' }}>
              <LogOut className="w-4 h-4" />Sign out
            </button>
          </div>
        )}

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
