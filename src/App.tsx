import { useEffect, useState } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { useGSAPAnimations, useCustomCursor } from './hooks/useAnimations';

/* ───────────────────────────── LOADING SCREEN ───────────────────────────── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 3;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1a1a1a] transition-opacity duration-700"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'all' }}
    >
      <div className="text-center">
        <h1
          className="font-playfair text-4xl font-bold tracking-[0.3em] text-[#c8a87e] sm:text-6xl"
          style={{ letterSpacing: '0.3em' }}
        >
          ORIGIN
        </h1>
        <p className="mt-3 font-space text-xs tracking-[0.5em] text-white/40 uppercase">
          Premium Coffee
        </p>
      </div>
      <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-[#c8a87e]/20">
        <div
          className="h-full rounded-full bg-[#c8a87e]"
          style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.3s ease' }}
        />
      </div>
      <p className="mt-3 font-space text-[10px] tracking-[0.3em] text-white/30 uppercase">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}

/* ───────────────────────────── NAVBAR ───────────────────────────── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Origin', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Collection', href: '#products' },
    { label: 'Process', href: '#process' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <nav className="navbar fixed top-0 left-0 z-50 w-full transition-all duration-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c8a87e]/40 bg-[#c8a87e]/10 text-sm font-playfair font-bold text-[#c8a87e] transition-all duration-300 group-hover:border-[#c8a87e] group-hover:bg-[#c8a87e]/20">
            O
          </div>
          <span className="font-playfair text-lg font-bold tracking-[0.2em] text-[#3c2415]">
            ORIGIN
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-space text-xs tracking-[0.2em] text-[#3c2415]/60 uppercase transition-colors duration-300 hover:text-[#c8a87e]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#cta"
            className="magnetic-btn ml-4 inline-flex h-10 items-center justify-center rounded-full border border-[#c8a87e]/40 bg-[#c8a87e]/10 px-6 font-space text-xs tracking-[0.15em] text-[#c8a87e] uppercase transition-all duration-300 hover:bg-[#c8a87e] hover:text-white"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-[2px] w-7 bg-[#3c2415] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}
          />
          <span
            className={`h-[2px] w-7 bg-[#3c2415] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-[#faf6f1]/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? 'max-h-[400px] opacity-100 shadow-lg' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-space text-sm tracking-[0.2em] text-[#3c2415]/70 uppercase transition-colors hover:text-[#c8a87e]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ───────────────────── SCROLL PROGRESS BAR ───────────────────── */
function ScrollProgress() {
  return (
    <div className="fixed top-0 left-0 z-[100] h-[2px] w-full bg-[#c8a87e]/10">
      <div className="scroll-progress h-full w-full origin-left scaleX-0 bg-gradient-to-r from-[#c8a87e] to-[#e8d5b7]" />
    </div>
  );
}

/* ──────────────────────────── HERO SECTION ──────────────────────────── */
function HeroSection() {
  const titleWords = ['ORIGIN', 'COFFEE'];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f1] via-[#faf6f1] to-[#f5f0ea]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#c8a87e]/[0.06] blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#3c2415]/[0.03] blur-3xl" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-[#c8a87e]/10 animate-[spin_30s_linear_infinite]" />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full border border-[#c8a87e]/5" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-[1px] w-16 bg-[#c8a87e]/40" />
          <span className="font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
            Est. 2024 — Artisan Roasters
          </span>
          <div className="h-[1px] w-16 bg-[#c8a87e]/40" />
        </div>

        <h1 className="font-playfair font-bold leading-[0.9] text-[#1a1a1a]">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {titleWords.map((word, i) => (
              <span
                key={word}
                className="hero-title-word inline-block"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
              >
                {i === 1 && (
                  <span className="text-[#c8a87e] italic font-medium"> {word}</span>
                )}
                {i === 0 && word}
              </span>
            ))}
          </div>
        </h1>

        <p className="hero-subtitle mt-8 mx-auto max-w-lg font-inter text-base leading-relaxed text-[#3c2415]/50">
          Where the future meets tradition. Experience coffee crafted with precision,
          delivered with passion — a ritual reimagined for the digital age.
        </p>

        <div className="hero-cta mt-10 flex items-center justify-center gap-6 flex-wrap">
          <a
            href="#products"
            className="magnetic-btn group inline-flex items-center gap-3 rounded-full bg-[#3c2415] px-8 py-4 text-sm font-space tracking-[0.15em] text-[#faf6f1] uppercase transition-all duration-300 hover:bg-[#c8a87e]"
          >
            Explore Collection
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#process"
            className="magnetic-btn inline-flex items-center gap-3 rounded-full border border-[#3c2415]/20 px-8 py-4 text-sm font-space tracking-[0.15em] text-[#3c2415]/70 uppercase transition-all duration-300 hover:border-[#c8a87e] hover:text-[#c8a87e]"
          >
            Our Process
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-space text-[10px] tracking-[0.3em] text-[#3c2415]/30 uppercase">
          Scroll
        </span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-[#c8a87e]/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 h-4 w-full bg-[#c8a87e] animate-[bounce_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── MARQUEE SECTION ───────────────────── */
function MarqueeSection() {
  const words = ['SINGLE ORIGIN', '•', 'HAND ROASTED', '•', 'SUSTAINABLE', '•', 'ARTISAN BLEND', '•', 'FAIR TRADE', '•', 'PRECISION CRAFTED', '•'];

  return (
    <div className="relative z-10 border-y border-[#c8a87e]/10 bg-[#faf6f1] py-5 overflow-hidden">
      <div className="marquee-track whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="mx-6 font-space text-xs tracking-[0.4em] text-[#3c2415]/20 uppercase"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── ABOUT SECTION ───────────────────── */
function AboutSection() {
  return (
    <section id="about" className="about-section relative z-10 py-32 px-6 bg-[#faf6f1]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <span className="about-label font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
              Our Philosophy
            </span>
            <h2 className="about-heading font-playfair text-4xl font-bold leading-tight text-[#1a1a1a] sm:text-5xl lg:text-6xl">
              Every bean tells
              <br />
              <span className="italic text-[#c8a87e]">a story</span> of
              <br />
              origin & craft
            </h2>
            <div className="space-y-4">
              <p className="about-text font-inter text-base leading-relaxed text-[#3c2415]/50">
                At ORIGIN, we believe coffee is more than a beverage — it's a connection
                between earth and cup, tradition and innovation. Each blend is sourced from
                single estates and roasted to perfection.
              </p>
              <p className="about-text font-inter text-base leading-relaxed text-[#3c2415]/50">
                Our commitment to sustainability means working directly with farmers,
                ensuring fair wages, and protecting the ecosystems that grow the world's
                finest coffee.
              </p>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c8a87e]/20 via-[#3c2415]/10 to-[#c8a87e]/5" />
              {/* Decorative coffee art */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Coffee cup icon */}
                  <svg
                    className="w-48 h-48 text-[#3c2415]/10"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M20 30h60v40c0 11-9 20-20 20s-20-9-20-20V30z" />
                    <path d="M80 40h8c3.3 0 6 2.7 6 6v6c0 3.3-2.7 6-6 6h-8" />
                    <path d="M40 15c0-2 1-3 2-3s2 1 2 3" opacity="0.5" />
                    <path d="M50 12c0-2 1-3 2-3s2 1 2 3" opacity="0.4" />
                    <path d="M60 15c0-2 1-3 2-3s2 1 2 3" opacity="0.3" />
                  </svg>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex gap-1">
                      <div className="steam-line w-[2px] h-8 bg-gradient-to-t from-[#c8a87e]/30 to-transparent rounded-full" />
                      <div className="steam-line w-[2px] h-10 bg-gradient-to-t from-[#c8a87e]/20 to-transparent rounded-full" />
                      <div className="steam-line w-[2px] h-6 bg-gradient-to-t from-[#c8a87e]/40 to-transparent rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 float-animation">
                <div className="rounded-2xl bg-[#faf6f1]/90 backdrop-blur-xl px-6 py-4 shadow-xl border border-[#c8a87e]/10">
                  <p className="font-playfair text-2xl font-bold text-[#3c2415]">12+</p>
                  <p className="font-space text-[10px] tracking-[0.2em] text-[#3c2415]/50 uppercase mt-1">
                    Countries Sourced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: '50', label: 'Unique Blends', suffix: '+' },
            { value: '12', label: 'Origin Countries', suffix: '+' },
            { value: '100', label: 'Satisfaction Rate', suffix: '%' },
            { value: '24', label: 'Awards Won', suffix: '+' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="stat-number font-playfair text-3xl font-bold text-[#c8a87e] group-hover:text-[#3c2415] transition-colors duration-300" data-target={stat.value}>
                0
              </p>
              <span className="stat-number font-playfair text-3xl font-bold text-[#c8a87e] group-hover:text-[#3c2415] transition-colors duration-300">
                {stat.suffix}
              </span>
              <p className="mt-2 font-space text-[10px] tracking-[0.2em] text-[#3c2415]/40 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PRODUCTS SECTION ─────────────────── */
function ProductsSection() {
  const products = [
    {
      name: 'Midnight Reserve',
      origin: 'Ethiopian Yirgacheffe',
      notes: 'Dark Chocolate · Cherry · Velvet',
      price: '$42',
      tag: 'Bestseller',
      gradient: 'from-[#1a1a1a] via-[#2d2d2d] to-[#3c2415]',
    },
    {
      name: 'Golden Dawn',
      origin: 'Colombian Supremo',
      notes: 'Caramel · Hazelnut · Honey',
      price: '$38',
      tag: 'Popular',
      gradient: 'from-[#c8a87e] via-[#e8d5b7] to-[#c8a87e]',
    },
    {
      name: 'Crystal Bloom',
      origin: 'Kenyan AA',
      notes: 'Citrus · Blackberry · Jasmine',
      price: '$46',
      tag: 'Limited',
      gradient: 'from-[#f5f0ea] via-[#faf6f1] to-[#e8d5b7]',
    },
    {
      name: 'Zenith Blend',
      origin: 'Sumatran Mandheling',
      notes: 'Earthy · Cedar · Dark Spice',
      price: '$35',
      tag: 'Classic',
      gradient: 'from-[#6b4226] via-[#3c2415] to-[#1a1a1a]',
    },
  ];

  return (
    <section id="products" className="products-section relative z-10 py-32 px-6 bg-[#f5f0ea]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
            The Collection
          </span>
          <h2 className="mt-4 font-playfair text-4xl font-bold text-[#1a1a1a] sm:text-5xl lg:text-6xl">
            Curated for the
            <br />
            <span className="italic text-[#c8a87e]">discerning palate</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <div
              key={i}
              className="product-card group relative overflow-hidden rounded-3xl bg-[#faf6f1] p-1 cursor-pointer"
            >
              <div className={`relative aspect-[3/4] rounded-[22px] bg-gradient-to-br ${product.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
                {/* Product tag */}
                <div className="flex justify-between items-start">
                  <span
                    className={`rounded-full px-3 py-1 text-[9px] font-space tracking-[0.2em] uppercase ${
                      product.name === 'Golden Dawn'
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-white/80'
                    }`}
                  >
                    {product.tag}
                  </span>
                  <span className={`text-xs font-space tracking-wider ${
                    product.name === 'Crystal Bloom' ? 'text-[#3c2415]/50' : 'text-white/50'
                  }`}>
                    0{i + 1}
                  </span>
                </div>

                {/* Center circle decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/5 group-hover:scale-125 transition-transform duration-700" />

                {/* Coffee cup SVG */}
                <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className={`w-20 h-20 ${
                      product.name === 'Crystal Bloom' ? 'text-[#3c2415]/20' : 'text-white/20'
                    } group-hover:scale-110 transition-transform duration-500`}
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20 30h60v40c0 11-9 20-20 20s-20-9-20-20V30z" />
                    <path d="M80 40h8c3.3 0 6 2.7 6 6v6c0 3.3-2.7 6-6 6h-8" />
                  </svg>
                </div>

                {/* Bottom info */}
                <div className={`space-y-3 ${
                  product.name === 'Crystal Bloom' ? 'text-[#3c2415]' : 'text-white'
                }`}>
                  <div>
                    <h3 className="font-playfair text-xl font-bold">{product.name}</h3>
                    <p className={`text-xs mt-1 ${
                      product.name === 'Crystal Bloom' ? 'text-[#3c2415]/50' : 'text-white/50'
                    }`}>
                      {product.origin}
                    </p>
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    product.name === 'Crystal Bloom' ? 'text-[#3c2415]/40' : 'text-white/40'
                  }`}>
                    {product.notes}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="font-playfair text-lg font-bold">{product.price}</span>
                    <button
                      className={`magnetic-btn rounded-full px-4 py-2 text-[10px] font-space tracking-[0.15em] uppercase transition-all duration-300 ${
                        product.name === 'Crystal Bloom'
                          ? 'bg-[#3c2415] text-white hover:bg-[#c8a87e]'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── PROCESS SECTION ───────────────────── */
function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Source',
      description: 'We travel to the world\'s finest coffee regions, building lasting relationships with farmers who share our passion for quality.',
    },
    {
      number: '02',
      title: 'Select',
      description: 'Every bean is hand-selected using advanced sorting technology, ensuring only the top 1% make it into our roasting process.',
    },
    {
      number: '03',
      title: 'Roast',
      description: 'Our master roasters use precision temperature profiles to unlock each bean\'s unique flavor potential, roasted in small batches.',
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'From our roastery to your doorstep within 48 hours. Freshly sealed and tracked with blockchain transparency.',
    },
  ];

  return (
    <section id="process" className="process-section relative z-10 py-32 px-6 bg-[#1a1a1a] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#c8a87e]/[0.03] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c8a87e]/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
            The Journey
          </span>
          <h2 className="mt-4 font-playfair text-4xl font-bold sm:text-5xl lg:text-6xl">
            From farm to
            <br />
            <span className="italic text-[#c8a87e]">your cup</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="process-step relative group">
              {/* Line connector */}
              {i < steps.length - 1 && (
                <div className="process-line absolute left-8 top-20 h-20 w-[2px] bg-gradient-to-b from-[#c8a87e]/40 to-transparent hidden md:block" />
              )}

              <div className="flex gap-8 items-start p-8 rounded-2xl transition-colors duration-500 hover:bg-white/[0.02]">
                {/* Number */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-[#c8a87e]/30 flex items-center justify-center">
                  <span className="font-space text-sm text-[#c8a87e]">{step.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl font-bold text-white group-hover:text-[#c8a87e] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-inter text-sm leading-relaxed text-white/40 max-w-xl">
                    {step.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="hidden lg:flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-[#c8a87e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              {i < steps.length - 1 && (
                <div className="ml-16 h-[1px] bg-gradient-to-r from-[#c8a87e]/10 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── GALLERY SECTION ─────────────────── */
function GallerySection() {
  const galleryItems = [
    { title: 'Ethiopian Highlands', span: 'md:col-span-2 md:row-span-2', gradient: 'from-[#3c2415] to-[#6b4226]' },
    { title: 'Morning Ritual', span: 'md:col-span-1', gradient: 'from-[#c8a87e] to-[#e8d5b7]' },
    { title: 'The Roastery', span: 'md:col-span-1', gradient: 'from-[#1a1a1a] to-[#3c2415]' },
    { title: 'Artisan Pour', span: 'md:col-span-1', gradient: 'from-[#6b4226] to-[#c8a87e]' },
    { title: 'Bean Selection', span: 'md:col-span-1', gradient: 'from-[#f5f0ea] to-[#c8a87e]' },
  ];

  return (
    <section id="gallery" className="gallery-section relative z-10 py-32 px-6 bg-[#faf6f1]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
            Visual Stories
          </span>
          <h2 className="mt-4 font-playfair text-4xl font-bold text-[#1a1a1a] sm:text-5xl lg:text-6xl">
            Moments of
            <br />
            <span className="italic text-[#c8a87e]">coffee culture</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-3 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} group cursor-pointer`}
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-white/20 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute w-14 h-14 rounded-full border border-white/10 group-hover:scale-125 transition-transform duration-700" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-playfair text-lg font-bold text-white">{item.title}</h3>
                <p className="font-space text-[10px] tracking-[0.2em] text-white/60 uppercase mt-1">
                  View More →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── TESTIMONIALS SECTION ─────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "ORIGIN has completely changed my morning ritual. The depth of flavor is unlike anything I've tasted.",
      name: 'Alexandra Chen',
      role: 'Creative Director',
      avatar: 'AC',
    },
    {
      quote: "The attention to detail, from sourcing to delivery, shows a level of craft that's truly rare in today's world.",
      name: 'Marcus Webb',
      role: 'Tech Entrepreneur',
      avatar: 'MW',
    },
    {
      quote: "Every cup feels like a journey. The Midnight Reserve is now my signature blend for client meetings.",
      name: 'Sofia Martinez',
      role: 'Architect',
      avatar: 'SM',
    },
  ];

  return (
    <section className="testimonials-section relative z-10 py-32 px-6 bg-[#f5f0ea]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <span className="font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
            Voices
          </span>
          <h2 className="mt-4 font-playfair text-4xl font-bold text-[#1a1a1a] sm:text-5xl">
            What they <span className="italic text-[#c8a87e]">say</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group rounded-3xl bg-[#faf6f1] p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#c8a87e]/5 border border-transparent hover:border-[#c8a87e]/10"
            >
              {/* Quote mark */}
              <div className="font-playfair text-5xl text-[#c8a87e]/30 mb-4">"</div>

              <p className="font-inter text-sm leading-relaxed text-[#3c2415]/60 mb-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#c8a87e] to-[#3c2415] flex items-center justify-center text-white text-xs font-space font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-space text-sm text-[#3c2415]">{t.name}</p>
                  <p className="font-space text-[10px] tracking-[0.15em] text-[#3c2415]/40 uppercase">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── CTA / NEWSLETTER SECTION ──────────────── */
function CTASection() {
  return (
    <section id="cta" className="cta-section relative z-10 py-32 px-6 bg-[#1a1a1a] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8a87e]/[0.05] blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #c8a87e 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl text-center relative">
        <span className="font-space text-[10px] tracking-[0.5em] text-[#c8a87e] uppercase">
          Join the Movement
        </span>
        <h2 className="cta-heading mt-6 font-playfair text-4xl font-bold text-white sm:text-5xl lg:text-7xl leading-tight">
          Taste the future
          <br />
          <span className="italic text-[#c8a87e]">of coffee</span>
        </h2>
        <p className="mt-6 font-inter text-sm leading-relaxed text-white/40 max-w-lg mx-auto">
          Subscribe to receive exclusive drops, early access to limited editions,
          and a $10 welcome credit.
        </p>

        <div className="cta-button mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 h-12 rounded-full bg-white/5 border border-white/10 px-6 font-space text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c8a87e] transition-colors"
          />
          <button className="magnetic-btn w-full sm:w-auto h-12 rounded-full bg-[#c8a87e] px-8 font-space text-sm tracking-[0.1em] text-white uppercase transition-all duration-300 hover:bg-[#e8d5b7] hover:text-[#1a1a1a] whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p className="mt-4 font-space text-[10px] text-white/20">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}

/* ──────────────── FOOTER ──────────────── */
function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a1a1a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c8a87e]/40 bg-[#c8a87e]/10 text-sm font-playfair font-bold text-[#c8a87e]">
                O
              </div>
              <span className="font-playfair text-lg font-bold tracking-[0.2em] text-white">
                ORIGIN
              </span>
            </div>
            <p className="mt-4 font-inter text-xs leading-relaxed text-white/30 max-w-xs">
              Premium single-origin coffee, crafted for the modern connoisseur.
              Where tradition meets the future.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Explore',
              links: ['Collection', 'Our Story', 'Process', 'Journal'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Press', 'Contact'],
            },
            {
              title: 'Support',
              links: ['FAQ', 'Shipping', 'Returns', 'Gift Cards'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-space text-[10px] tracking-[0.3em] text-[#c8a87e] uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-inter text-xs text-white/30 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-space text-[10px] tracking-[0.2em] text-white/20 uppercase">
            © 2024 ORIGIN Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-space text-[10px] tracking-[0.15em] text-white/20 uppercase hover:text-[#c8a87e] transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────── MAIN APP ──────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const { initAnimations } = useGSAPAnimations();
  useCustomCursor();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        initAnimations();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, initAnimations]);

  return (
    <div className="relative">
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Three.js Background */}
      <ThreeCanvas />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProductsSection />
        <ProcessSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
