import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>StockFlow</span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(29,120,116,0.12)', color: 'var(--color-primary)' }}>Africa</span>
        </Link>

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

        <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="w-5 h-5" style={{ color: 'var(--color-text)' }} /> : <Menu className="w-5 h-5" style={{ color: 'var(--color-text)' }} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-4 space-y-3" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium py-2" style={{ color: 'var(--color-text)' }}>{l.label}</Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full h-11 font-medium">Sign in</Button>
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)}>
            <Button className="w-full h-11 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start free</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
