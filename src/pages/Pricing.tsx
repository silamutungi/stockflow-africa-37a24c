import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'For SMEs just getting started with inventory financing.',
    features: [
      'Up to KES 100,000 per request',
      '2 active requests at a time',
      'Supplier invoice verification',
      'Delivery confirmation',
      'Basic repayment scheduling'
    ],
    cta: 'Start free',
    href: '/signup',
    highlighted: false
  },
  {
    name: 'Growth',
    price: 'KES 2,500',
    period: 'per month',
    description: 'For growing businesses that need larger limits and faster approvals.',
    features: [
      'Up to KES 1,000,000 per request',
      'Unlimited active requests',
      'Priority 4-hour disbursement',
      'Inventory tracking dashboard',
      'Repayment milestone automation',
      'Dedicated account manager',
      'Supplier relationship tools'
    ],
    cta: 'Start free trial',
    href: '/signup',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored to you',
    description: 'For large distributors and multi-branch operations.',
    features: [
      'Unlimited financing amount',
      'Multi-branch management',
      'API access for integrations',
      'Custom repayment terms',
      'Investor dashboard access',
      'White-label options',
      'SLA-backed support'
    ],
    cta: 'Contact sales',
    href: '/signup',
    highlighted: false
  }
]

const faqs = [
  { q: 'How is the financing fee calculated?', a: 'We charge a flat fee based on repayment period: 3% for 2 weeks, 4.5% for 4 weeks, and 6% for 8 weeks. The total repayment is shown before you accept — no surprises.' },
  { q: 'Do I need collateral or a credit score?', a: 'No. We assess your eligibility based on your supplier transaction history and business activity. First-time users start with a conservative limit that grows as you repay on time.' },
  { q: 'When does repayment start?', a: 'Repayment starts only after your supplier confirms delivery in-app. If your stock does not arrive, you do not owe anything for that request.' },
  { q: 'How fast is disbursement?', a: 'Approved requests are disbursed directly to your supplier within 24 hours. Growth plan users receive priority 4-hour disbursement.' },
  { q: 'What currencies are supported?', a: 'Currently KES (Kenya), UGX (Uganda), TZS (Tanzania), and RWF (Rwanda). More currencies are added regularly.' }
]

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Transparent pricing. No hidden fees.</h1>
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>One flat fee per transaction. No subscriptions required to get started.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map(p => (
                <Card key={p.name} className={p.highlighted ? 'ring-2' : ''} style={p.highlighted ? { ringColor: 'var(--color-primary)' } : {}}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-xl" style={{ color: 'var(--color-text)' }}>{p.name}</CardTitle>
                      {p.highlighted && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Most popular</span>
                      )}
                    </div>
                    <div className="flex items-end gap-1 mt-2 mb-1">
                      <span className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{p.price}</span>
                      {p.period !== 'forever' && p.price !== 'Custom' && (
                        <span className="text-sm pb-1" style={{ color: 'var(--color-text-muted)' }}>/{p.period}</span>
                      )}
                    </div>
                    <CardDescription style={{ color: 'var(--color-text-secondary)' }}>{p.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
                          <span className="text-sm" style={{ color: 'var(--color-text)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={p.href}>
                      <Button className="w-full h-11 font-semibold" style={p.highlighted ? { backgroundColor: 'var(--color-primary)', color: '#ffffff' } : {}} variant={p.highlighted ? 'default' : 'outline'}>
                        {p.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--color-text)' }}>Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map(faq => (
                <div key={faq.q} className="pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{faq.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
