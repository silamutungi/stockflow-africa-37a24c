# StockFlow Africa — Brain Memory

## App Context
- **Idea:** StockFlow Africa — An inventory financing platform that connects SMEs with suppliers and investors to fund stock purchases and repay over time.. Features: Request inventory financing from approved suppliers, Supplier invoice confirmation and delivery tracking, Flexible repayment scheduling with transparent fees, Risk assessment and underwriting dashboard for admins, Investor portfolio performance tracking
- **Category:** web app
- **Generated:** 2026-05-04
- **Stack:** React + Vite + TypeScript + Supabase + Vercel
- **Live URL:** https://stockflow-africa-37a24c-7va41em5h-visila.vercel.app
- **Files generated:** 31

## Generation Notes
- Pages: src/pages/Home.tsx, src/pages/Login.tsx, src/pages/Signup.tsx, src/pages/Dashboard.tsx, src/pages/Settings.tsx, src/pages/Pricing.tsx
- Components: src/components/Navbar.tsx, src/components/AppLayout.tsx, src/components/ProtectedRoute.tsx, src/components/Footer.tsx, src/components/ui/button.tsx, src/components/ui/input.tsx, src/components/ui/label.tsx, src/components/ui/card.tsx, src/components/ui/badge.tsx

## Founder Patterns
<!-- Brain learns the founder's preferences here -->
<!-- Updated automatically after every interaction -->
- Edits to date: 0
- Most edited section: unknown
- Primary focus: unknown
- Launch status: not launched

## Edit History
<!-- Brain appends after every edit -->
<!-- Format: [date] instruction → files changed → outcome -->

- [2026-05-04] Add a responsive mobile hamburger nav drawer to the site navigation component. Use useState for open → src/components/Navbar.tsx

- [2026-05-04] Wrap the app logo in the nav component with a React Router Link to '/' so clicking it returns to the → src/components/AppLayout.tsx

## Brain Observations
<!-- Proactive hints Brain has surfaced -->
<!-- Format: [date] category: observation -->

## Lessons Learned
<!-- Mistakes made and fixed — never repeat these -->
<!-- Format: [date] what broke → what fixed it -->
- [2026-05-02] **Auth pages MUST render <Navbar />.** Auth pages (Login.tsx, Signup.tsx, password-reset) are NOT standalone layouts. They render the same global <Navbar /> as marketing pages. A user landing on /login from any source must be able to navigate back to / and to other public pages without using the browser back button. The "centered card on empty background" pattern that LLMs default to for auth pages is a defect, not a design. Always wrap the auth form below a <Navbar />. Diagnosed across 7 of 10 recent builds pre-fix; system-prompt rule + edit.ts rule + UX layer all updated to enforce this.
