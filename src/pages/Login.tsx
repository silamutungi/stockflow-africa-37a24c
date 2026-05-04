import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setLoading(false)
        navigate('/dashboard')
      }, 800)
      return
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Welcome back</CardTitle>
            <CardDescription style={{ color: 'var(--color-text-secondary)' }}>Sign in to your StockFlow account</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSupabaseConfigured && (
              <div className="mb-4 px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(37,99,235,0.08)', color: 'var(--color-info)', border: '1px solid rgba(37,99,235,0.2)' }}>
                Demo mode — connect your database to go live.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  disabled={loading}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <Button type="submit" className="w-full h-12 font-semibold" disabled={loading} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              No account?{' '}
              <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Start free</Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
