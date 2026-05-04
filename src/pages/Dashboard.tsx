import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, AlertCircle, RefreshCw, Loader2, X } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatDate } from '../lib/utils'
import { type FinancingRequest, type SeedFinancingRequest } from '../types'
import AppLayout from '../components/AppLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const SEED_DATA: SeedFinancingRequest[] = [
  { id: '1', user_id: 'seed', supplier_name: 'Bidco Africa', invoice_number: 'INV-2024-0312', amount: 150000, currency: 'KES', purpose: 'Cooking oil stock', repayment_weeks: 4, status: 'disbursed', delivery_confirmed: true, delivery_date: '2024-06-10', fee_percent: 4.5, total_repayment: 156750, created_at: '2024-06-05T08:00:00Z', deleted_at: null, _seed: true },
  { id: '2', user_id: 'seed', supplier_name: 'Unga Group', invoice_number: 'INV-2024-0289', amount: 85000, currency: 'KES', purpose: 'Flour and grain', repayment_weeks: 2, status: 'repaying', delivery_confirmed: true, delivery_date: '2024-06-02', fee_percent: 3.0, total_repayment: 87550, created_at: '2024-05-28T09:30:00Z', deleted_at: null, _seed: true },
  { id: '3', user_id: 'seed', supplier_name: 'Keroche Breweries', invoice_number: 'INV-2024-0401', amount: 220000, currency: 'KES', purpose: 'Beverages for festive season', repayment_weeks: 8, status: 'pending', delivery_confirmed: false, delivery_date: null, fee_percent: 6.0, total_repayment: 233200, created_at: '2024-06-15T11:00:00Z', deleted_at: null, _seed: true },
  { id: '4', user_id: 'seed', supplier_name: 'Pwani Oil', invoice_number: 'INV-2024-0199', amount: 60000, currency: 'KES', purpose: 'Margarine and soap', repayment_weeks: 2, status: 'completed', delivery_confirmed: true, delivery_date: '2024-05-01', fee_percent: 3.0, total_repayment: 61800, created_at: '2024-04-25T07:00:00Z', deleted_at: null, _seed: true },
  { id: '5', user_id: 'seed', supplier_name: 'Interconsumer Products', invoice_number: 'INV-2024-0455', amount: 45000, currency: 'KES', purpose: 'Personal care products', repayment_weeks: 2, status: 'approved', delivery_confirmed: false, delivery_date: null, fee_percent: 3.0, total_repayment: 46350, created_at: '2024-06-18T14:00:00Z', deleted_at: null, _seed: true },
  { id: '6', user_id: 'seed', supplier_name: 'Dormans Coffee', invoice_number: 'INV-2024-0360', amount: 32000, currency: 'KES', purpose: 'Coffee and tea stock', repayment_weeks: 2, status: 'rejected', delivery_confirmed: false, delivery_date: null, fee_percent: 3.0, total_repayment: 32960, created_at: '2024-06-12T10:00:00Z', deleted_at: null, _seed: true }
]

const STATUS_COLORS: Record<string, string> = {
  draft: 'secondary', pending: 'secondary', approved: 'secondary',
  disbursed: 'default', repaying: 'default', completed: 'default', rejected: 'destructive'
}

function statusLabel(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Dashboard() {
  const [requests, setRequests] = useState<FinancingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [supplier, setSupplier] = useState('')
  const [invoice, setInvoice] = useState('')
  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [weeks, setWeeks] = useState('4')

  async function fetchRequests() {
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      setRequests(SEED_DATA)
      setLoading(false)
      return
    }
    const { data, error: fetchError } = await (supabase.from('financing_requests').select('*').is('deleted_at', null).order('created_at', { ascending: false }) as any)
    if (fetchError) { setError('Failed to load requests. Please retry.'); setLoading(false); return }
    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchRequests() }, [])

  async function handleSubmit() {
    setFormError(null)
    if (!supplier || !invoice || !amount || !purpose) { setFormError('All fields are required.'); return }
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum < 5000) { setFormError('Minimum financing amount is KES 5,000.'); return }
    setSubmitting(true)
    const feePercent = parseFloat(weeks) <= 2 ? 3.0 : parseFloat(weeks) <= 4 ? 4.5 : 6.0
    const totalRepayment = amountNum * (1 + feePercent / 100)
    const payload = { supplier_name: supplier, invoice_number: invoice, amount: amountNum, currency: 'KES', purpose, repayment_weeks: parseInt(weeks), status: 'pending', delivery_confirmed: false, delivery_date: null, fee_percent: feePercent, total_repayment: totalRepayment }
    if (!isSupabaseConfigured) {
      const mock: FinancingRequest = { id: Date.now().toString(), user_id: 'seed', created_at: new Date().toISOString(), deleted_at: null, ...payload }
      setRequests(prev => [mock, ...prev])
      setShowForm(false); setSupplier(''); setInvoice(''); setAmount(''); setPurpose(''); setWeeks('4')
      setSubmitting(false); return
    }
    const { error: insertError } = await (supabase.from('financing_requests').insert([payload]) as any)
    if (insertError) { setFormError('Failed to submit request. Please retry.'); setSubmitting(false); return }
    setShowForm(false); setSupplier(''); setInvoice(''); setAmount(''); setPurpose(''); setWeeks('4')
    setSubmitting(false); fetchRequests()
  }

  async function handleDelete(id: string) {
    if (!isSupabaseConfigured) { setRequests(prev => prev.filter(r => r.id !== id)); return }
    await (supabase.from('financing_requests').update({ deleted_at: new Date().toISOString() } as any).eq('id', id) as any)
    fetchRequests()
  }

  const totalDisbursed = requests.filter(r => ['disbursed','repaying','completed'].includes(r.status)).reduce((s, r) => s + r.amount, 0)
  const activeRequests = requests.filter(r => ['pending','approved','disbursed','repaying'].includes(r.status)).length
  const completedCount = requests.filter(r => r.status === 'completed').length
  const pendingRepayment = requests.filter(r => r.status === 'repaying').reduce((s, r) => s + r.total_repayment, 0)

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {!isSupabaseConfigured && (
          <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(37,99,235,0.08)', color: 'var(--color-info)', border: '1px solid rgba(37,99,235,0.2)' }}>
            Viewing sample data — connect your database to go live.
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Manage your inventory financing requests</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="h-11 px-5 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
            <PlusCircle className="w-4 h-4 mr-2" />New request
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: 'Total Financed', value: formatCurrency(totalDisbursed) },
            { icon: Clock, label: 'Active Requests', value: String(activeRequests) },
            { icon: CheckCircle2, label: 'Completed', value: String(completedCount) },
            { icon: TrendingUp, label: 'Pending Repayment', value: formatCurrency(pendingRepayment) }
          ].map(m => (
            <Card key={m.label}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <m.icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{m.label}</span>
                </div>
                {loading ? (
                  <div className="h-7 w-24 rounded animate-pulse" style={{ backgroundColor: 'var(--color-border)' }} />
                ) : (
                  <span className="text-xl font-bold" style={{ color: 'var(--color-text)', fontVariantNumeric: 'tabular-nums' }}>{m.value}</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg" style={{ color: 'var(--color-text)' }}>New Financing Request</CardTitle>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-muted" aria-label="Close form">
                  <X className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="supplier">Supplier name</Label>
                  <Input id="supplier" value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="Bidco Africa" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="invoice">Invoice number</Label>
                  <Input id="invoice" value={invoice} onChange={e => setInvoice(e.target.value)} placeholder="INV-2024-0001" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input id="amount" type="number" min="5000" value={amount} onChange={e => setAmount(e.target.value)} placeholder="50000" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="weeks">Repayment period</Label>
                  <select id="weeks" value={weeks} onChange={e => setWeeks(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text)' }}>
                    <option value="2">2 weeks (3% fee)</option>
                    <option value="4">4 weeks (4.5% fee)</option>
                    <option value="8">8 weeks (6% fee)</option>
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="purpose">Purpose / stock description</Label>
                  <Input id="purpose" value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Cooking oil and flour for June stock" />
                </div>
              </div>
              {amount && !isNaN(parseFloat(amount)) && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(29,120,116,0.08)', border: '1px solid var(--color-border)' }}>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Total repayment: </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {formatCurrency(parseFloat(amount) * (1 + (weeks <= '2' ? 3 : weeks <= '4' ? 4.5 : 6) / 100))}
                  </span>
                </div>
              )}
              {formError && (
                <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: 'var(--color-error)' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{formError}
                </div>
              )}
              <div className="flex gap-3 mt-5">
                <Button onClick={handleSubmit} disabled={submitting} className="h-10 px-6 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit request'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg" style={{ color: 'var(--color-text)' }}>Financing Requests</CardTitle>
              <button onClick={fetchRequests} className="p-2 rounded-lg hover:bg-muted" aria-label="Refresh">
                <RefreshCw className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading && (
              <div className="p-8 flex flex-col gap-3">
                {[1,2,3].map(i => <div key={i} className="h-14 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--color-border)' }} />)}
              </div>
            )}
            {!loading && error && (
              <div className="p-8 flex flex-col items-center gap-4">
                <AlertCircle className="w-8 h-8" style={{ color: 'var(--color-error)' }} />
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
                <Button variant="outline" onClick={fetchRequests} className="h-9">Retry</Button>
              </div>
            )}
            {!loading && !error && requests.length === 0 && (
              <div className="p-12 flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(29,120,116,0.10)' }}>
                  <PlusCircle className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
                </div>
                <p className="font-semibold" style={{ color: 'var(--color-text)' }}>No financing requests yet</p>
                <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>Submit your first supplier invoice to get funded in under 24 hours.</p>
                <Button onClick={() => setShowForm(true)} className="h-10 px-5" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>New request</Button>
              </div>
            )}
            {!loading && !error && requests.length > 0 && (
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {requests.map(r => (
                  <div key={r.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/40">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{r.supplier_name}</span>
                        <Badge variant={STATUS_COLORS[r.status] as 'default' | 'secondary' | 'destructive' | 'outline'}>{statusLabel(r.status)}</Badge>
                        {r.delivery_confirmed && <Badge variant="outline" className="text-xs" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>Delivered</Badge>}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{r.invoice_number}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{r.purpose}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{formatDate(r.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: 'var(--color-text)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(r.amount, r.currency)}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{r.fee_percent}% fee</p>
                      </div>
                      {(r.status === 'draft' || r.status === 'pending') && (
                        <button onClick={() => handleDelete(r.id)} className="p-2 rounded hover:bg-destructive/10" aria-label="Delete request">
                          <X className="w-4 h-4" style={{ color: 'var(--color-error)' }} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>Quick actions</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setShowForm(true)} variant="outline" className="h-9 text-sm">Request financing</Button>
            <Link to="/settings"><Button variant="outline" className="h-9 text-sm">Account settings</Button></Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
