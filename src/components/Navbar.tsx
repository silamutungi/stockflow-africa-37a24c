import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const drawerRef = useRef<HTMLDivElement>(null)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' }
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>StockFlow</span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(29,120,116,0.12)', color: 'var(--color-primary)' }}>Africa</span>
        </Link>

        {/* Desktop nav — unchanged, hidden below md */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: location.pathname === l.to ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: location.pathname === l.to ? 600 : 500 }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/login">
            <Button variant="ghost" className="h-9 px-4 text-sm font-medium">Sign in</Button>
          </Link>
          <Link to="/signup">
            <Button className="h-9 px-4 text-sm font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start free</Button>
          </Link>
        </div>

        {/* Hamburger button — visible only below md */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open
            ? <X className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
            : <Menu className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
          }
        </button>
      </div>

      {/* Mobile slide-in drawer overlay */}
      <div
        className={[
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        ].join(' ')}
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Mobile slide-in drawer — Paper background, Ink links, Flame active state */}
      <div
        ref={drawerRef}
        className={[
          'fixed top-0 right-0 z-50 h-full w-72 md:hidden flex flex-col',
          'transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        ].join(' ')}
        style={{ backgroundColor: 'var(--color-bg-surface)', borderLeft: '1px solid var(--color-border)', boxShadow: '-4px 0 24px rgba(0,0,0,0.10)' }}
        aria-label="Mobile navigation drawer"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>StockFlow</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(29,120,116,0.12)', color: 'var(--color-primary)' }}>Africa</span>
          </Link>
          <button
            className="p-2 rounded-lg"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex flex-col flex-1 px-6 py-6 gap-1 overflow-y-auto">
          {links.map(l => {
            const isActive = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: isActive ? 'rgba(29,120,116,0.10)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent'
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Drawer CTA buttons */}
        <div className="px-6 pb-8 flex flex-col gap-3 border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full h-11 font-medium">Sign in</Button>
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)}>
            <Button className="w-full h-11 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start free</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
