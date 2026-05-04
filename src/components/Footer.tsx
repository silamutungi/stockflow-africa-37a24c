import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t py-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>StockFlow</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(29,120,116,0.12)', color: 'var(--color-primary)' }}>Africa</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Inventory financing for African SMEs.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
            <Link to="/pricing" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
            <Link to="/login" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
            <Link to="/signup" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Start free</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} StockFlow Africa. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  )
}
