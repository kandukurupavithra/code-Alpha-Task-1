import { useState, useEffect, useRef } from 'react'

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#work', label: 'Work' },
  { href: '#team', label: 'Team' },
  { href: '#design', label: 'Design System' },
]

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '340+', label: 'Projects shipped' },
  { value: '$12M', label: 'Client budgets managed' },
  { value: '98%', label: 'On-time delivery rate' },
  { value: '5 yrs', label: 'Studio experience' },
]

const FEATURES = [
  {
    code: '01',
    title: 'Project Tracking',
    body: 'Every deliverable, milestone, and budget — visible at a glance. No status meetings required.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    code: '02',
    title: 'Design System',
    body: 'Tokens, components, and guidelines baked in. Ship consistent work across every touchpoint.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    code: '03',
    title: 'Team Capacity',
    body: 'Utilization tracking per designer. Catch overload before it becomes a delivery problem.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    code: '04',
    title: 'Client Reports',
    body: 'Auto-generated progress reports with real numbers. Professional delivery every time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    code: '05',
    title: 'Asset Library',
    body: 'Centralized storage for every project. No more hunting Slack threads for the final logo file.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    code: '06',
    title: 'Activity Feed',
    body: 'Real-time log of every upload, comment, and status change. Everyone stays in context.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const PROJECTS = [
  {
    code: 'BRD-01',
    name: 'Brand Identity Overhaul',
    client: 'Meridian Capital',
    status: 'In Progress',
    progress: 72,
    img: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&h=500&fit=crop&auto=format',
    alt: 'Minimalist architectural facade with sharp geometric lines',
  },
  {
    code: 'WEB-07',
    name: 'E-Commerce Platform Rebuild',
    client: 'Volta Goods',
    status: 'Review',
    progress: 91,
    img: 'https://images.unsplash.com/photo-1760022638435-aad7c1e684b6?w=800&h=500&fit=crop&auto=format',
    alt: 'Designer reviewing fashion mood board in studio',
  },
  {
    code: 'APP-12',
    name: 'Mobile Onboarding Flows',
    client: 'Solaris Health',
    status: 'In Progress',
    progress: 38,
    img: 'https://images.unsplash.com/photo-1461958508236-9a742665a0d5?w=800&h=500&fit=crop&auto=format',
    alt: 'Colorful cutout letterforms and design elements',
  },
  {
    code: 'DS-03',
    name: 'Design System v2',
    client: 'Internal',
    status: 'Blocked',
    progress: 55,
    img: 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=800&h=500&fit=crop&auto=format',
    alt: "Worm's-eye view of concrete building geometry",
  },
]

const TEAM = [
  { initials: 'AK', name: 'Aria Kim', role: 'Lead Designer', projects: 3, utilization: 88, color: '#f5a623' },
  { initials: 'SL', name: 'Soren Lund', role: 'Brand Strategist', projects: 2, utilization: 62, color: '#5b8af0' },
  { initials: 'JP', name: 'Jules Petit', role: 'UX Designer', projects: 4, utilization: 95, color: '#4caf7d' },
  { initials: 'MR', name: 'Maya Reyes', role: 'Design Systems', projects: 2, utilization: 71, color: '#e05252' },
  { initials: 'EN', name: 'Elias Näkki', role: 'Interaction Designer', projects: 2, utilization: 54, color: '#a78bfa' },
]

const COLOR_PALETTES = [
  { label: 'Void', hex: '#0c0c0b' },
  { label: 'Surface', hex: '#141413' },
  { label: 'Panel', hex: '#1c1c1a' },
  { label: 'Border', hex: '#2a2a27' },
  { label: 'Dim', hex: '#4a4845' },
  { label: 'Muted', hex: '#7a7870' },
  { label: 'Text', hex: '#e8e6df' },
  { label: 'Amber', hex: '#f5a623' },
  { label: 'Blue', hex: '#5b8af0' },
  { label: 'Green', hex: '#4caf7d' },
  { label: 'Red', hex: '#e05252' },
  { label: 'Purple', hex: '#a78bfa' },
]

const TESTIMONIALS = [
  {
    quote: "Studio OS cut our project reporting time in half. Clients now see progress weekly without us lifting a finger.",
    name: 'Helena Voss',
    title: 'Head of Brand, Meridian Capital',
    initials: 'HV',
  },
  {
    quote: "The design system view alone is worth it. Onboarding new designers used to take weeks — now it takes days.",
    name: 'Tom Rideau',
    title: 'Creative Director, Volta Goods',
    initials: 'TR',
  },
  {
    quote: "Finally, a tool that thinks like a design studio — not a software company cosplaying as one.",
    name: 'Priya Menon',
    title: 'Founder, Pattern Studio',
    initials: 'PM',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ProgressBar({ value, color = '#f5a623' }: { value: number; color?: string }) {
  return (
    <div className="h-px w-full" style={{ backgroundColor: '#2a2a27' }}>
      <div className="h-px transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const c: Record<string, string> = {
    'In Progress': '#5b8af0',
    Review: '#f5a623',
    Blocked: '#e05252',
    Completed: '#4caf7d',
  }
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: c[status] ?? '#4a4845' }} />
      <span className="font-mono text-[10px] tracking-widest" style={{ color: c[status] ?? '#4a4845' }}>
        {status.toUpperCase()}
      </span>
    </span>
  )
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Sections ────────────────────────────────────────────────────────────────

function NavBar({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a27] bg-[#0c0c0b]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-[12px] text-[#f5a623] tracking-widest font-600 uppercase">
          Studio OS
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-[10px] tracking-widest uppercase transition-colors
                ${active === l.href ? 'text-[#f5a623]' : 'text-[#4a4845] hover:text-[#7a7870]'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="font-mono text-[10px] tracking-widest uppercase text-[#4a4845] hover:text-[#e8e6df] transition-colors px-4 py-2">
            Log in
          </a>
          <a href="#" className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 bg-[#f5a623] text-[#0c0c0b] font-600 hover:bg-[#c47d10] transition-colors">
            Get Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden text-[#7a7870] hover:text-[#e8e6df] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {open
              ? <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              : <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#2a2a27] bg-[#0c0c0b] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-mono text-[11px] tracking-widest uppercase text-[#4a4845] hover:text-[#f5a623] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#" className="font-mono text-[10px] tracking-widest uppercase px-5 py-2.5 bg-[#f5a623] text-[#0c0c0b] font-600 text-center">
            Get Access
          </a>
        </div>
      )}
    </header>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ background: '#0c0c0b' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1758613655800-98248330920d?w=1600&h=900&fit=crop&auto=format"
          alt="Creative studio with dramatic lighting"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(40%) brightness(0.35)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0c0c0b44 0%, #0c0c0b 85%)' }} />
      </div>

      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-6">
            Studio OS — Creative Project Management
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-700 text-[#e8e6df] leading-[0.92] mb-8">
            The operating<br />
            system for<br />
            <em className="italic text-[#f5a623]">design studios.</em>
          </h1>
          <p className="text-[#7a7870] text-lg font-300 max-w-xl leading-relaxed mb-10">
            Track projects, manage budgets, and ship consistently great work — all in one brutally focused tool built for creative teams.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#features" className="font-mono text-[11px] tracking-widest uppercase px-7 py-3.5 bg-[#f5a623] text-[#0c0c0b] font-600 hover:bg-[#c47d10] transition-colors flex items-center gap-2">
              See how it works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work" className="font-mono text-[11px] tracking-widest uppercase px-7 py-3.5 border border-[#3d3d38] text-[#7a7870] hover:border-[#f5a623] hover:text-[#f5a623] transition-colors">
              View our work
            </a>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2a2a27] border border-[#2a2a27]">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#0c0c0b] px-5 py-4">
              <div className="font-display text-3xl font-600 text-[#e8e6df]">{s.value}</div>
              <div className="font-mono text-[10px] text-[#4a4845] tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#2a2a27]">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { ref, inView } = useInView()
  return (
    <section id="features" ref={ref as React.RefObject<HTMLElement>} className="max-w-7xl mx-auto px-6 py-28">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 items-start">
        {/* Left label */}
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-5">Features</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-600 text-[#e8e6df] leading-tight">
            Everything a studio actually needs.
          </h2>
          <p className="text-[#7a7870] text-sm font-300 leading-relaxed mt-5 max-w-xs">
            No feature bloat. No enterprise cruft. Just the tools that move creative work forward.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2a2a27]">
          {FEATURES.map((f, i) => (
            <div
              key={f.code}
              className={`bg-[#141413] p-6 flex flex-col gap-4 hover:bg-[#1c1c1a] transition-all duration-300 group
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 border border-[#2a2a27] flex items-center justify-center text-[#4a4845] group-hover:text-[#f5a623] group-hover:border-[#f5a623] transition-colors">
                  {f.icon}
                </div>
                <span className="font-mono text-[10px] text-[#2a2a27]">{f.code}</span>
              </div>
              <div>
                <h3 className="text-[#e8e6df] font-600 text-[15px] mb-2">{f.title}</h3>
                <p className="text-[#7a7870] text-[13px] font-300 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkSection() {
  const [active, setActive] = useState(0)
  const { ref, inView } = useInView()

  return (
    <section id="work" ref={ref as React.RefObject<HTMLElement>} className="border-t border-[#2a2a27] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-end justify-between mb-12 gap-4 flex-wrap transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <p className="font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-4">Active Work</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-600 text-[#e8e6df] leading-tight">
              Current projects.
            </h2>
          </div>
          <div className="flex gap-1">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-8 h-1 transition-all ${i === active ? 'bg-[#f5a623]' : 'bg-[#2a2a27] hover:bg-[#3d3d38]'}`}
              />
            ))}
          </div>
        </div>

        {/* Featured project */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-px bg-[#2a2a27] mb-px">
          <div className="relative overflow-hidden bg-[#141413]" style={{ aspectRatio: '16/9' }}>
            {PROJECTS.map((p, i) => (
              <img
                key={p.code}
                src={p.img}
                alt={p.alt}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{
                  opacity: i === active ? 1 : 0,
                  filter: 'grayscale(25%) contrast(1.05)',
                }}
              />
            ))}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0c0c0b55 0%, transparent 60%)' }} />
          </div>

          <div className="bg-[#141413] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-[#f5a623]">{PROJECTS[active].code}</span>
                <StatusDot status={PROJECTS[active].status} />
              </div>
              <h3 className="font-display text-2xl font-600 text-[#e8e6df] leading-snug mb-3">
                {PROJECTS[active].name}
              </h3>
              <p className="font-mono text-[11px] text-[#7a7870]">{PROJECTS[active].client}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[10px] text-[#4a4845] tracking-widest uppercase">Completion</span>
                <span className="font-mono text-[11px] text-[#f5a623]">{PROJECTS[active].progress}%</span>
              </div>
              <div className="h-1 w-full bg-[#2a2a27]">
                <div
                  className="h-1 transition-all duration-700"
                  style={{
                    width: `${PROJECTS[active].progress}%`,
                    backgroundColor: PROJECTS[active].status === 'Blocked' ? '#e05252' : '#f5a623',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-4 gap-px bg-[#2a2a27]">
          {PROJECTS.map((p, i) => (
            <button
              key={p.code}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden transition-all group ${i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              style={{ aspectRatio: '4/3', background: '#1c1c1a' }}
            >
              <img src={p.img} alt={p.alt} className="w-full h-full object-cover" style={{ filter: 'grayscale(40%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#0c0c0b] to-transparent">
                <span className="font-mono text-[9px] text-[#7a7870]">{p.code}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="border-t border-[#2a2a27] py-28 bg-[#141413]">
      <div className="max-w-7xl mx-auto px-6">
        <p className={`font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-16 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          What studios say
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a27]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`bg-[#141413] p-8 flex flex-col gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-display text-[17px] font-300 text-[#e8e6df] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#2a2a27]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-600"
                  style={{ backgroundColor: '#f5a62322', color: '#f5a623', border: '1px solid #f5a62344' }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[12px] font-500 text-[#e8e6df]">{t.name}</div>
                  <div className="font-mono text-[10px] text-[#4a4845]">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const { ref, inView } = useInView()
  return (
    <section id="team" ref={ref as React.RefObject<HTMLElement>} className="border-t border-[#2a2a27] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-5">The studio</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-600 text-[#e8e6df] leading-tight max-w-md">
            Five designers. One operating system.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#2a2a27]">
          {TEAM.map((m, i) => {
            const utilColor = m.utilization > 90 ? '#e05252' : m.utilization > 70 ? '#f5a623' : '#4caf7d'
            return (
              <div
                key={m.initials}
                className={`bg-[#141413] p-6 flex flex-col gap-5 hover:bg-[#1c1c1a] transition-all group cursor-default
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms`, transitionDuration: '600ms' }}
              >
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-[13px] font-600"
                  style={{
                    backgroundColor: m.color + '22',
                    color: m.color,
                    border: `1px solid ${m.color}44`,
                  }}
                >
                  {m.initials}
                </div>
                <div>
                  <div className="text-[14px] font-600 text-[#e8e6df]">{m.name}</div>
                  <div className="font-mono text-[10px] text-[#7a7870] mt-0.5">{m.role}</div>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] text-[#4a4845]">{m.projects} projects</span>
                    <span className="font-mono text-[10px]" style={{ color: utilColor }}>{m.utilization}%</span>
                  </div>
                  <div className="h-px w-full bg-[#2a2a27]">
                    <div className="h-px transition-all duration-700" style={{ width: `${m.utilization}%`, backgroundColor: utilColor }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DesignSystemSection() {
  const [copied, setCopied] = useState<string | null>(null)
  const { ref, inView } = useInView()

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {})
    setCopied(hex)
    setTimeout(() => setCopied(null), 1200)
  }

  const isDark = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 < 128
  }

  return (
    <section id="design" ref={ref as React.RefObject<HTMLElement>} className="border-t border-[#2a2a27] py-28 bg-[#141413]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-5">Design System</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-600 text-[#e8e6df] leading-tight max-w-lg">
            Built on a real token system.
          </h2>
          <p className="text-[#7a7870] text-sm font-300 leading-relaxed mt-5 max-w-md">
            Every color, type size, and spacing value is a token — not a one-off. Change the theme, everything updates.
          </p>
        </div>

        {/* Color palette */}
        <div className={`mb-12 transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-mono text-[10px] text-[#4a4845] tracking-widest uppercase block mb-4">Color tokens</span>
          <div className="flex flex-wrap gap-px bg-[#2a2a27]">
            {COLOR_PALETTES.map(s => {
              const dark = isDark(s.hex)
              return (
                <button
                  key={s.hex}
                  onClick={() => copy(s.hex)}
                  className="group relative overflow-hidden flex flex-col justify-end p-3 transition-all hover:scale-[1.03]"
                  style={{ backgroundColor: s.hex, minWidth: 80, height: 80, flex: '1 1 80px' }}
                  title={`Copy ${s.hex}`}
                >
                  {copied === s.hex && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: s.hex + 'dd' }}>
                      <span className="font-mono text-[9px]" style={{ color: dark ? '#e8e6df' : '#0c0c0b' }}>✓</span>
                    </div>
                  )}
                  <span className="font-mono text-[10px] font-500 leading-none" style={{ color: dark ? '#e8e6df' : '#0c0c0b' }}>{s.label}</span>
                  <span className="font-mono text-[9px] opacity-50 mt-0.5" style={{ color: dark ? '#e8e6df' : '#0c0c0b' }}>{s.hex}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Typography + Buttons in 2-col */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#2a2a27] mb-px transition-all duration-700 delay-150 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          {/* Typography specimen */}
          <div className="bg-[#0c0c0b] p-8 flex flex-col gap-5">
            <span className="font-mono text-[10px] text-[#4a4845] tracking-widest uppercase">Typography</span>
            <p className="font-display text-[52px] font-700 text-[#e8e6df] leading-none">Aa</p>
            <p className="font-display text-2xl font-600 text-[#e8e6df] italic leading-snug">Fraunces — Display</p>
            <p className="text-sm text-[#7a7870] font-300 leading-relaxed max-w-xs">
              Inter for body copy. Clear, neutral, designed for screen at every size and weight.
            </p>
            <p className="font-mono text-[11px] text-[#f5a623]">JetBrains Mono — labels & data</p>
          </div>

          {/* Buttons */}
          <div className="bg-[#0c0c0b] p-8 flex flex-col gap-5">
            <span className="font-mono text-[10px] text-[#4a4845] tracking-widest uppercase">Button system</span>
            <div className="flex flex-col gap-3">
              <button className="font-mono text-[11px] tracking-widest uppercase px-5 py-3 bg-[#f5a623] text-[#0c0c0b] font-600 hover:bg-[#c47d10] transition-colors self-start flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                Primary action
              </button>
              <button className="font-mono text-[11px] tracking-widest uppercase px-5 py-3 border border-[#3d3d38] text-[#e8e6df] hover:border-[#f5a623] hover:text-[#f5a623] transition-colors self-start">
                Secondary action
              </button>
              <div className="flex gap-2">
                <button className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 border border-[#e05252] text-[#e05252] hover:bg-[#e05252] hover:text-[#0c0c0b] transition-colors">
                  Danger
                </button>
                <button className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 bg-[#4caf7d] text-[#0c0c0b] font-600 hover:bg-[#3a9066] transition-colors">
                  Success
                </button>
                <button disabled className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 border border-[#2a2a27] text-[#2a2a27] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div className="flex gap-2 mt-1">
                {[
                  <path key="p" d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
                  <><circle key="c" cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" /><path key="p2" d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
                  <path key="p3" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
                ].map((icon, i) => (
                  <button key={i} className="w-9 h-9 border border-[#3d3d38] text-[#7a7870] hover:border-[#f5a623] hover:text-[#f5a623] transition-colors flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">{icon}</svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Icons strip */}
        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-px bg-[#2a2a27] flex-wrap">
            {[
              { name: 'Arrow', d: 'M5 12h14M13 6l6 6-6 6' },
              { name: 'Check', d: 'M4 12l5 5 11-11' },
              { name: 'Plus', d: 'M12 5v14M5 12h14' },
              { name: 'Close', d: 'M6 6l12 12M18 6L6 18' },
              { name: 'Settings', d: 'M12 2v2m0 16v2M2 12h2m16 0h2' },
              { name: 'Calendar', d: 'M16 2v4M8 2v4M3 10h18' },
            ].map(icon => (
              <div key={icon.name} className="bg-[#0c0c0b] flex flex-col items-center gap-2 py-5 px-6 hover:bg-[#1c1c1a] transition-colors group flex-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#4a4845] group-hover:text-[#f5a623] transition-colors">
                  <path d={icon.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-mono text-[9px] text-[#2a2a27] group-hover:text-[#4a4845] transition-colors">{icon.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="border-t border-[#2a2a27] py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1609605348579-3123e3d40eb8?w=1600&h=600&fit=crop&auto=format"
          alt="Letterpress type blocks scattered on a surface"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(60%) brightness(0.2)' }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <p className="font-mono text-[10px] text-[#f5a623] tracking-widest uppercase mb-6">Early access</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-700 text-[#e8e6df] leading-tight mb-8">
          Run your studio<br />
          <em className="italic text-[#f5a623]">like a machine.</em>
        </h2>
        <p className="text-[#7a7870] text-base font-300 max-w-md mx-auto mb-10 leading-relaxed">
          Studio OS is invite-only while we work with founding studios. Apply for early access below.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@studio.com"
            className="flex-1 px-5 py-3 bg-[#0c0c0b] border border-[#2a2a27] text-[#e8e6df] font-mono text-[12px] placeholder-[#4a4845] focus:outline-none focus:border-[#f5a623] transition-colors"
          />
          <button type="submit" className="font-mono text-[11px] tracking-widest uppercase px-6 py-3 bg-[#f5a623] text-[#0c0c0b] font-600 hover:bg-[#c47d10] transition-colors shrink-0">
            Apply
          </button>
        </form>
        <p className="font-mono text-[10px] text-[#2a2a27] mt-5">No spam. No pitch deck. Just access.</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#2a2a27] bg-[#141413]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-[#f5a623] tracking-widest font-600 uppercase">Studio OS</span>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#" className="font-mono text-[10px] text-[#4a4845] tracking-widest hover:text-[#7a7870] transition-colors uppercase">{l}</a>
          ))}
        </div>
        <span className="font-mono text-[10px] text-[#2a2a27]">© 2026 Studio OS</span>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection('#' + e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#0c0c0b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <NavBar active={activeSection} />
      <div className="pt-14">
        <HeroSection />
        <FeaturesSection />
        <WorkSection />
        <TestimonialsSection />
        <TeamSection />
        <DesignSystemSection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  )
}
