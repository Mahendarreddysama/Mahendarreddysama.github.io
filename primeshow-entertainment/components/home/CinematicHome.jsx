"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Boxes, Clapperboard, ExternalLink, Film, Globe2, Layers3, MapPin, Menu, Play, Sparkles, X } from "lucide-react";
import ProcessImpact from "./ProcessImpact";
import HomeContact from "./HomeContact";
import Brand from "@/components/layout/Brand";
import ThemeToggle from "@/components/layout/ThemeToggle";
import RollingDistributionGallery from "@/components/services/RollingDistributionGallery";

function MagneticButton({ href, className = "", icon = "right", children }) {
  return (
    <a href={href} className={`button ${className}`}>
      <span>{children}</span>{icon === "down" ? <ArrowDown size={17} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}<i aria-hidden="true" />
    </a>
  );
}

function Navigation({ items }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`));
    }, { rootMargin: "-35% 0px -55%" });
    items.filter(({ href }) => href.startsWith("#")).forEach(({ href }) => { const element = document.querySelector(href); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Brand priority />
        <div className="desktop-nav">
          {items.map((item) => <a key={item.label} className={active === item.href ? "active" : ""} href={item.href}>{item.label}</a>)}
        </div>
        <div className="nav-tools"><ThemeToggle /><div className="nav-action"><MagneticButton href="#contact" className="button-gold">Collaborate</MagneticButton></div></div>
        <button className="menu-toggle" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
      </nav>
      <div className="mobile-menu" style={{ clipPath: open ? "circle(150% at 88% 7%)" : "circle(0% at 88% 7%)", visibility: open ? "visible" : "hidden", transition: "clip-path .42s cubic-bezier(.76,0,.24,1)" }} aria-hidden={!open} inert={!open ? true : undefined}>
        <button className="menu-close" aria-label="Close navigation" onClick={() => setOpen(false)}><X /></button>
        <ThemeToggle mobile />
        <div className="mobile-links">{items.map((item, index) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}</a>)}<a href="#contact" onClick={() => setOpen(false)}><small>05</small>Collaborate</a></div>
      </div>
    </header>
  );
}

function Counter({ item }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const run = (now) => {
        const progress = Math.min((now - start) / 1300, 1);
        setCount(Math.round(item.value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run); observer.disconnect();
    }, { threshold: .45 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item.value]);
  return <article ref={ref} className="stat-card" tabIndex="0"><div className="stat-value">{item.prefix}{count}{item.suffix}</div><h3>{item.label}</h3></article>;
}

function MovieCard({ movie }) {
  const posterStyle = movie.poster ? {
    "--poster-image": `url("${movie.poster}")`,
    "--poster-size": "cover",
    "--poster-position": movie.posterFocalPoint || "center center",
  } : { "--poster-x": movie.position };
  return (
    <article className="movie-card" tabIndex="0">
      <div className="movie-art" style={posterStyle}>
        <span className={`status ${movie.status === "Released" ? "released" : ""}`}>{movie.status}</span>
        <div className="movie-overlay"><Play size={18} fill="currentColor" /><span>Discover film</span></div>
      </div>
      <div className="movie-meta"><h3>{movie.title}</h3><p>{movie.year} <span /> {movie.language}</p></div>
    </article>
  );
}

function MovieRail({ movies }) {
  const rail = useRef(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const down = (event) => {
    dragging.current = true; startX.current = event.clientX; startScroll.current = rail.current.scrollLeft;
    rail.current.setPointerCapture?.(event.pointerId); rail.current.classList.add("is-dragging");
  };
  const move = (event) => { if (dragging.current) rail.current.scrollLeft = startScroll.current - (event.clientX - startX.current); };
  const up = () => { dragging.current = false; rail.current?.classList.remove("is-dragging"); };
  return <div ref={rail} className="movie-rail" aria-label="Featured productions" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>{movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}</div>;
}

function HomeAboutCarousel({ content }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const total = content.slides.length;
  const go = (next) => {
    const safe = (next + total) % total;
    setIndex(safe);
  };
  const active = content.slides[index];
  const strengthIcons = [ExternalLink, Layers3, Globe2, Film, Boxes, MapPin];
  const featureClass = `about-feature-grid about-feature-${active.layout || "default"}`;

  return (
    <section id="about" className="about about-carousel section" aria-roledescription="carousel" aria-label="Discover PrimeShow" tabIndex="0"
      onKeyDown={(event) => { if (event.key === "ArrowRight") go(index + 1); if (event.key === "ArrowLeft") go(index - 1); }}
      onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current == null) return;
        const distance = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 48) go(index + (distance > 0 ? 1 : -1));
        touchStart.current = null;
      }}>
      <div className="container about-carousel-shell">
        <div className={`about-slide about-slide-${active.layout || "default"}`} key={active.id}>
          <div className="about-slide-lead">
            <div className="about-heading"><div className="eyebrow"><Sparkles size={14} /> {active.eyebrow}</div><h2>{active.title}</h2></div>
            <p>{active.body}</p>
          </div>
          <div className={featureClass}>
            {active.features.map((feature, featureIndex) => {
              const StrengthIcon = strengthIcons[featureIndex];
              return <article className={`about-feature-card ${feature.image ? "has-image" : ""}`} key={feature.title}>
                {feature.image && <div className="about-feature-image"><Image src={feature.image} alt={feature.imageAlt} fill sizes="(max-width: 640px) 46vw, 34vw" unoptimized={active.layout === "leadership"} /></div>}
                {feature.initials && <div className="leader-initials" aria-hidden="true">{feature.initials}</div>}
                {active.layout === "strengths" && <><div className="strength-index" aria-hidden="true">{feature.number}</div><StrengthIcon className="strength-icon" aria-hidden="true" strokeWidth={1.8} /></>}
                <div className="about-feature-copy"><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p></div>
              </article>;
            })}
          </div>
        </div>
        <button type="button" className="about-next" onClick={() => go(index + 1)} aria-label={`Next: ${content.slides[(index + 1) % total].label}`}><ArrowRight aria-hidden="true" /><span>{content.slides[(index + 1) % total].label}</span></button>
        <div className="about-tabs" aria-label="About section pages">
          {content.slides.map((slide, slideIndex) => <button key={slide.id} type="button" className={slideIndex === index ? "active" : ""} onClick={() => setIndex(slideIndex)} aria-current={slideIndex === index ? "true" : undefined}>{slide.label}</button>)}
        </div>
      </div>
      <div className="story-a11y" aria-live="polite">{active.label}, page {index + 1} of {total}</div>
    </section>
  );
}

export default function CinematicHome({ content }) {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    if (content.hero.slides.length < 2) return;
    const timer = window.setInterval(() => setActiveSlide(index => (index + 1) % content.hero.slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [content.hero.slides.length]);

  const slide = content.hero.slides[activeSlide];

  return (
    <div className="site-wrap">
      <Navigation items={content.navigation} />
      <main id="main-content">
        <section id="home" className="hero" aria-roledescription="carousel" aria-label="PrimeShow cinematic stories">
          <div className="hero-slides" aria-live="off">
            <div className={`hero-slide hero-slide-${activeSlide + 1} is-active`} style={{ "--hero-position": slide.position, "--hero-mobile-position": slide.mobilePosition }}>
              <img src={slide.image} alt={slide.alt} width="1672" height="942" fetchPriority="high" decoding="async" className="hero-image" />
            </div>
          </div>
          <div className="hero-overlay" /><div className="ambient-light" /><div className="grain" aria-hidden="true" />
          <div className="hero-content container">
            <div className="eyebrow"><Clapperboard size={15} /> {content.hero.eyebrow}</div>
            <h1>{content.hero.title.map((line) => <span key={line}>{line}</span>)}</h1>
            <p>{content.hero.body}</p>
            <div className="hero-actions"><MagneticButton href="#productions" className="button-gold" icon="down">Explore Our Flagship</MagneticButton><MagneticButton href="#contact" className="button-glass">Let&apos;s Create</MagneticButton></div>
          </div>
          <a className="scroll-cue" href="#impact" aria-label="Scroll to global impact"><span>Scroll to discover</span><ArrowDown size={16} /></a>
        </section>

        <section id="impact" className="stats-section section"><div className="section-glow" /><div className="container stats-grid">{content.statistics.map((item) => <Counter key={item.label} item={item} />)}</div></section>
        <HomeAboutCarousel content={content.about} />
        <section id="productions" className="productions section"><div className="container section-head" data-reveal><div><div className="eyebrow">PrimeShow originals</div><h2>Stories built<br /><em>for the big screen.</em></h2></div><p>Distinctive voices. Unforgettable worlds. A slate powered by bold creative ambition.</p></div><MovieRail movies={content.productions} /><div className="container section-action"><MagneticButton href="/services/production" className="button-line">View All Productions</MagneticButton></div></section>
        <div className="home-distribution-wrap"><RollingDistributionGallery movies={content.distribution} compact /><div className="container section-action centered-action"><MagneticButton href="/services/distribution" className="button-line">View All Distribution</MagneticButton></div></div>
        <ProcessImpact content={content.processImpact} />
        <section id="primeverse" className="hub-cta section"><div className="container"><div className="eyebrow">Primeverse</div><h2>Closer to the stories<br />you love.</h2><p>Behind the scenes, new worlds, and the people bringing every frame to life.</p><Link href="/prime-hub" className="circle-link" aria-label="Enter Primeverse"><ArrowRight /></Link></div></section>
        <HomeContact />
      </main>
      <footer><div className="container"><Brand /><p>Indian storytelling. Global cinematic scale.</p><span>© {new Date().getFullYear()} PrimeShow Entertainment</span><span className="footer-credit">Website created by Mahendar Reddy Sama</span></div></footer>
    </div>
  );
}
