import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'

const features = [
  {
    icon: Zap,
    title: 'Disbursement in under 24 hours',
    description: 'Your verified invoice triggers same-day supplier payment. Stock arrives before your competitors place their order.'
  },
  {
    icon: Shield,
    title: 'No credit score required',
    description: 'We underwrite based on your supplier transaction history. Build your limit by repaying on time — not by visiting a bank.'
  },
  {
    icon: CheckCircle,
    title: 'Real-time delivery confirmation',
    description: 'Suppliers confirm delivery in-app. Repayment only starts after your stock arrives — no disputes, no surprises.'
  },
  {
    icon: TrendingUp,
    title: 'Transparent fee structure',
    description: 'One flat fee shown before you accept. No hidden charges, no rollover penalties, no subscription required.'
  },
  {
    icon: Clock,
    title: 'Flexible repayment scheduling',
    description: 'Split repayments across 2, 4, or 8 weeks aligned to your sales cycle. Adjust as your cash flow changes.'
  },
  {
    icon: BarChart2,
    title: 'Inventory tied to repayment',
    description: 'Track your financed stock from invoice to shelf to sale. Repayment milestones update automatically as you sell.'
  }
]

const steps = [
  { number: '01', title: 'Upload your supplier invoice', desc: 'Photograph or upload any invoice from an approved supplier.' },
  { number: '02', title: 'Get a funding decision in 2 hours', desc: 'Our system checks your transaction history and gives a transparent offer.' },
  { number: '03', title: 'Supplier gets paid directly', desc: 'Funds go straight to your supplier the same day you accept.' },
  { number: '04', title: 'Repay as you sell', desc: 'Weekly micro-repayments aligned to your actual sales cycle.' }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIweW91bmclMjBBZnJpY2FuJTIwZW50cmVwcmVuZXVyJTIwaW4lMjBtb2Rlcm4lMjBidXNpbmVzcyUyMGF0dGlyZSUyMHN0YW5kfGVufDB8MHx8fDE3Nzc5MTI2NzV8MA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: '#4ECDC4' }}>Inventory Financing for African SMEs</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Fund your stock in 24 hours. No credit score required.
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              StockFlow connects you directly to approved suppliers with real-time invoice verification. Your supplier gets paid today. You repay as you sell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="h-14 px-10 text-base font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                  Start free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="h-14 px-10 text-base font-semibold border-white/40 text-white hover:bg-gray-900/10">
                  See pricing
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-12">
              {['No hidden fees', 'Sub-24h disbursement', 'Supplier paid directly'].map(item => (
                <div key={item} className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#4ECDC4' }} />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Built for how African businesses actually work</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Every feature solves a real pain point — not a feature checklist.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(29,120,116,0.10)' }}>
                  <f.icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: 'var(--color-text)' }}>From invoice to stock in four steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(s => (
              <div key={s.number} className="flex flex-col">
                <span className="text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>{s.number}</span>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to fund your next stock order?</h2>
          <p className="text-lg text-white/80 mb-10">Join thousands of SMEs across East Africa already using StockFlow.</p>
          <Link to="/signup">
            <Button className="h-14 px-12 text-base font-semibold" style={{ backgroundColor: '#ffffff', color: 'var(--color-primary)' }}>
              Get started free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
