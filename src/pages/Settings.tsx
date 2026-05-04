import { useState, useEffect, type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import AppLayout from '../components/AppLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

export default function Settings() {
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('Kenya')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (!isSupabaseConfigured) {
        setFullName('Jane Wanjiku'); setBusinessName('Wanjiku General Supplies')
        setPhone('+254 712 345 678'); setCountry('Kenya')
        setLoading(false); return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const { data } = await (supabase.from('profiles').select('*').eq('user_id', session.user.id).single() as any)
      if (data) {
        setFullName(data.full_name || ''); setBusinessName(data.business_name || '')
        setPhone(data.phone || ''); setCountry(data.country || 'Kenya')
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null); setSuccess(false)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setSaving(false); setSuccess(true) }, 600); return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setError('Not authenticated.'); setSaving(false); return }
    const { error: upsertError } = await (supabase.from('profiles').upsert({ user_id: session.user.id, full_name: fullName, business_name: businessName, phone, country } as any) as any)
    if (upsertError) { setError('Failed to save profile. Please retry.'); setSaving(false); return }
    setSuccess(true); setSaving(false)
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Settings</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle style={{ color: 'var(--color-text)' }}>Profile</CardTitle>
            <CardDescription style={{ color: 'var(--color-text-secondary)' }}>Your business information used for financing assessments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-10 rounded-md animate-pulse" style={{ backgroundColor: 'var(--color-border)' }} />)}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="s-fullName">Full name</Label>
                  <Input id="s-fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jane Wanjiku" disabled={saving} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-businessName">Business name</Label>
                  <Input id="s-businessName" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Wanjiku General Supplies" disabled={saving} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-phone">Phone number</Label>
                  <Input id="s-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+254 712 345 678" disabled={saving} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-country">Country</Label>
                  <select id="s-country" value={country} onChange={e => setCountry(e.target.value)} disabled={saving} className="w-full h-10 rounded-md border px-3 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text)' }}>
                    {['Kenya','Uganda','Tanzania','Rwanda','Ethiopia','Nigeria','Ghana'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-error)' }}>
                    <AlertCircle className="w-4 h-4" />{error}
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-success)' }}>
                    <CheckCircle2 className="w-4 h-4" />Profile saved successfully.
                  </div>
                )}
                <Button type="submit" disabled={saving} className="h-10 px-6 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save changes'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: 'var(--color-error)' }}>Danger zone</CardTitle>
            <CardDescription style={{ color: 'var(--color-text-secondary)' }}>Irreversible actions — proceed with caution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Deleting your account will permanently remove all your financing history and profile data. This cannot be undone.</p>
            <Button variant="destructive" className="h-10" onClick={() => alert('Contact support@stockflow.africa to delete your account.')}>Delete account</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
