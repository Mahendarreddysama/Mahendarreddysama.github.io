"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown, ArrowRight, AudioLines, Building2, CalendarRange, Camera, ClipboardList,
  Clock3, FilePenLine, Film, Globe2, Languages, Map, MapPinned, Megaphone,
  MonitorPlay, Palette, PanelsTopLeft, Play, Projector, Route, Scissors, ScrollText,
  Search, Sparkles, Star, Truck, Users, WandSparkles, Workflow,
} from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ButtonLink from "@/components/ui/ButtonLink";
import RollingDistributionGallery from "@/components/services/RollingDistributionGallery";

const icons = { AudioLines, Building2, CalendarRange, Camera, ClipboardList, Clock3, FilePenLine, Globe2, Languages, Map, MapPinned, Megaphone, MonitorPlay, Palette, PanelsTopLeft, Projector, Route, Scissors, ScrollText, Sparkles, Star, Truck, Users, WandSparkles, Workflow };

function ServiceShell({ navigation, children }) {
  const root = useRef(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => { if (!reduced) gsap.utils.toArray("[data-service-reveal]").forEach(el => gsap.fromTo(el, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: .85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })); }, root);
    return () => { ctx.revert(); };
  }, []);
  return <div ref={root} className="site-wrap services-theme"><SiteHeader items={navigation} activeHref="/services" className="service-header" /><main id="main-content">{children}</main><SiteFooter /></div>;
}

export function ServicesLanding({ content, navigation }) {
  return <ServiceShell navigation={navigation}><section className="services-intro"><div className="grain" /><div className="container services-intro-copy"><div className="eyebrow">One studio. Three connected forces.</div><h1>From the first idea<br />to the <em>first applause.</em></h1><p>PrimeShow brings production, distribution, and exhibition into one complete filmmaking ecosystem.</p><ArrowDown className="services-down" aria-hidden="true" /></div></section><section className="service-card-stage" aria-label="PrimeShow features"><div className="container service-card-grid">{content.map((service, index) => <motion.article key={service.key} className={`service-portal portal-${service.key}`} data-service-reveal whileHover={{ y: -10 }} transition={{ duration: .35 }}><Link href={service.href} aria-label={`Explore ${service.title}`}><Image src={service.image} alt={`${service.title} at PrimeShow Entertainment`} fill sizes="(max-width: 800px) 100vw, 33vw" /><div className="service-portal-shade" /><span className="portal-number">{service.number}</span><div className="portal-copy"><div className="portal-icon">{index === 0 ? <Film /> : index === 1 ? <Globe2 /> : <Projector />}</div><small>{service.eyebrow}</small><h2>{service.title}</h2><p>{service.description}</p><span className="portal-link">Enter division <ArrowRight /></span></div></Link></motion.article>)}</div></section></ServiceShell>;
}

function DivisionHero({ hero, division }) {
  return <section className={`division-hero division-${division}`}><Image src={hero.image} alt={`${hero.title} at PrimeShow Entertainment`} fill priority sizes="100vw" /><div className="division-hero-shade" /><div className="grain" /><motion.div className="container division-hero-copy" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .2 }}><div className="eyebrow">{hero.eyebrow}</div><h1>{hero.title}</h1><p>{hero.body}</p><a href="#overview" className="division-scroll">Explore the craft <ArrowDown /></a></motion.div></section>;
}

function Capabilities({ title, intro, items }) {
  return <section id="overview" className="section service-overview"><div className="container"><div className="section-head" data-service-reveal><div><div className="eyebrow">Integrated capability</div><h2>{title}</h2></div><p>{intro}</p></div><div className="capability-grid">{items.map(([icon, title, text], index) => { const Icon = icons[icon] || Sparkles; return <article className="capability-card" key={title} tabIndex="0" data-service-reveal><span>0{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>; })}</div></div></section>;
}

function Poster({ movie, compact = false }) {
  const posterStyle = movie.poster ? {
    "--poster-image": `url("${movie.poster}")`,
    "--poster-size": "cover",
    "--poster-position": movie.posterFocalPoint || "center center",
  } : { "--poster-x": movie.posterPosition };
  const cardContent = <><div className="catalog-art" style={posterStyle}><span className={`status ${movie.status === "Released" ? "released" : ""}`}>{movie.status}</span>{movie.hasDetailPage !== false && <div className="catalog-hover"><ArrowRight /><p>{movie.synopsis}</p><small>View film</small></div>}</div><div className="catalog-meta"><h3>{movie.title}</h3><p>{movie.year} <span /> {movie.language}</p><small>{movie.genre}</small></div></>;
  return movie.hasDetailPage === false
    ? <article className={`catalog-card ${compact ? "compact" : ""}`}>{cardContent}</article>
    : <Link className={`catalog-card ${compact ? "compact" : ""}`} href={`/movies/${movie.slug}`}>{cardContent}</Link>;
}

function ProductionRail({ movies }) {
  const rail = useRef(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const down = event => {
    dragging.current = true;
    startX.current = event.clientX;
    startScroll.current = rail.current.scrollLeft;
    rail.current.setPointerCapture?.(event.pointerId);
    rail.current.classList.add("is-dragging");
  };
  const move = event => {
    if (dragging.current) rail.current.scrollLeft = startScroll.current - (event.clientX - startX.current);
  };
  const up = () => {
    dragging.current = false;
    rail.current?.classList.remove("is-dragging");
  };
  useEffect(() => {
    const element = rail.current;
    const wheel = event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const canMove = event.deltaY > 0
        ? element.scrollLeft < element.scrollWidth - element.clientWidth
        : element.scrollLeft > 0;
      if (canMove) {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, []);
  return <div ref={rail} className="movie-rail production-rail" aria-label="PrimeShow production slate" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>{movies.map(movie => <Poster movie={movie} key={movie.slug} />)}</div>;
}

function ProductionShowcase({ movies }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Movies", "Web Series", "Released", "Upcoming"];
  const filtered = useMemo(() => movies.filter(movie => {
    const searchText = [movie.title, movie.genre, movie.language, movie.status].filter(Boolean).join(" ").toLowerCase();
    const matchesSearch = searchText.includes(query.trim().toLowerCase());
    const format = movie.format || "Movie";
    const matchesFilter = filter === "All"
      || (filter === "Movies" && format === "Movie")
      || (filter === "Web Series" && format === "Web Series")
      || (filter === "Released" && movie.status === "Released")
      || (filter === "Upcoming" && movie.status !== "Released");
    return matchesSearch && matchesFilter;
  }), [movies, query, filter]);
  const trailers = movies.filter(movie => movie.trailer);
  return <><section className="section catalog-feature"><div className="container"><div className="section-head" data-service-reveal><div><div className="eyebrow">PrimeShow slate</div><h2>Featured <em>productions.</em></h2></div><p>Original stories developed for cultural impact and cinematic scale.</p></div><div className="catalog-tools production-tools"><label className="catalog-search"><Search /><span className="sr-only">Search productions</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search productions" /></label><div className="filter-chips" aria-label="Filter productions">{filters.map(item => <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div></div><p className="production-result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "title" : "titles"}</p></div>{filtered.length ? <ProductionRail movies={filtered} /> : <div className="container"><p className="empty-catalog">No productions match this search or filter.</p></div>}</section><section className="section trailer-section"><div className="container"><div className="section-head" data-service-reveal><div><div className="eyebrow">Watch the craft</div><h2>Trailers &amp; <em>teasers.</em></h2></div><p>Official videos open on YouTube. Nothing autoplays here.</p></div><div className="trailer-grid">{trailers.map(movie => <a className={`trailer-card trailer-${movie.slug}`} key={movie.slug} href={movie.trailer.url} target="_blank" rel="noreferrer"><div className="trailer-art" style={movie.poster ? { "--poster-image": `url("${movie.poster}")`, "--poster-size": "cover", "--poster-position": movie.posterFocalPoint || "center center" } : { "--poster-x": movie.posterPosition }}><span className="trailer-play"><Play fill="currentColor" /></span></div><div><h3>{movie.trailer.title}</h3><p>{movie.language} · {movie.trailer.duration}</p></div></a>)}</div></div></section></>;
}

function DistributionCatalog({ movies }) {
  const [query, setQuery] = useState(""); const [filter, setFilter] = useState("All"); const [page, setPage] = useState(1); const pageSize = 16;
  const filters = ["All", "Pan India", "Released", "Upcoming"];
  const filtered = useMemo(() => movies.filter(movie => {
    const q = movie.title.toLowerCase().includes(query.toLowerCase());
    const f = filter === "All" || movie.territory === filter || movie.status === filter || (filter === "Upcoming" && movie.status !== "Released");
    return q && f;
  }), [movies, query, filter]);
  const visible = filtered.slice(0, page * pageSize);
  return <section className="section distribution-library"><div className="container"><div className="section-head" data-service-reveal><div><div className="eyebrow">Selected releases</div><h2>Distribution <em>catalog.</em></h2></div><p>A selection of titles from PrimeShow’s regional and Pan-India distribution journey.</p></div><div className="catalog-tools"><label className="catalog-search"><Search /><span className="sr-only">Search movies</span><input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search by title" /></label><div className="filter-chips" aria-label="Filter movies">{filters.map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setPage(1); }} aria-pressed={filter === item}>{item}</button>)}</div></div><motion.ol layout className="distribution-title-list">{visible.map((movie, index) => <motion.li layout key={movie.slug}>{movie.isCatalogPlaceholder ? <div className="distribution-title-row"><span className="distribution-title-number">{String(index + 1).padStart(2, "0")}</span><h3>{movie.title}</h3><p>{movie.year} · {movie.language}</p><small>{movie.territory}</small></div> : <Link className="distribution-title-row" href={`/movies/${movie.slug}`}><span className="distribution-title-number">{String(index + 1).padStart(2, "0")}</span><h3>{movie.title}</h3><p>{movie.year} · {movie.language}</p><small>{movie.territory}</small><ArrowRight aria-hidden="true" /></Link>}</motion.li>)}</motion.ol>{!visible.length && <p className="empty-catalog">No films match this search.</p>}{visible.length < filtered.length && <button className="button button-line load-more" onClick={() => setPage(p => p + 1)}><span>Load more titles</span><ArrowDown /></button>}<p className="catalog-note">The titles shown here represent only a selection of PrimeShow’s distribution work. Our wider catalogue includes many more films, markets, and release partnerships than can be presented on a single page.</p></div></section>;
}

function ExhibitionExperience({ content }) {
  const gallery = [
    { key: "interior", label: "Interior", src: "/images/exhibition-interior.webp", alt: "Premium cinema auditorium interior", position: "center center" },
    { key: "premiere", label: "Premiere", src: "/images/exhibition-premiere.webp", alt: "Guests arriving for a cinema premiere", position: "center center" },
    { key: "audience", label: "Audience", src: "/images/exhibition-audience.webp", alt: "Audience enjoying a film together in a cinema", position: "center center" },
    { key: "screen", label: "Screen", src: "/images/exhibition-screen.webp", alt: "Packed premium auditorium facing a large cinema screen", position: "center center" },
  ];
  return <><section className="section exhibition-flow"><div className="container"><div className="section-head" data-service-reveal><div><div className="eyebrow">From locked film to live audience</div><h2>The release<br /><em>in motion.</em></h2></div><p>Eight connected stages turn a finished film into a measurable audience experience.</p></div><ol className="workflow-timeline">{content.workflow.map((step, index) => <li key={step} data-service-reveal><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><i /></li>)}</ol></div></section><section className="section theatre-gallery"><div className="container"><div className="section-head" data-service-reveal><div><div className="eyebrow">The big-screen moment</div><h2>Built for<br /><em>shared emotion.</em></h2></div><p>Theatre interiors, premieres, audiences, and screens arranged as one editorial filmstrip.</p></div><div className="masonry-cinema">{gallery.map((item, index) => <button className={`cinema-frame frame-${index + 1}`} key={item.key} aria-label={`View ${item.label.toLowerCase()} gallery image`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 40vw" style={{ objectPosition: item.position }} /><span>{item.label}</span></button>)}</div></div></section></>;
}

export function DivisionPage({ division, content, navigation }) {
  return <ServiceShell navigation={navigation}><DivisionHero hero={content.hero} division={division} /><Capabilities title={division === "production" ? <>Every discipline.<br /><em>One creative vision.</em></> : division === "distribution" ? <>Every market.<br /><em>One release intelligence.</em></> : <>Every screen.<br /><em>One audience experience.</em></>} intro={division === "production" ? "A connected workflow protects quality from the first conversation through final delivery." : division === "distribution" ? "Market knowledge, partnerships, and coordination give each release the strategy it deserves." : "Planning, partnerships, logistics, and engagement come together around the theatrical moment."} items={content.capabilities} />{division === "production" && <ProductionShowcase movies={content.movies} />}{division === "distribution" && <><RollingDistributionGallery movies={content.galleryMovies || content.movies} /><DistributionCatalog movies={content.movies} /></>}{division === "exhibition" && <ExhibitionExperience content={content} />}<section className="section services-next"><div className="container"><div className="eyebrow">The ecosystem continues</div><h2>See how every division<br /><em>strengthens the story.</em></h2><ButtonLink href="/services" variant="line">Explore all features</ButtonLink></div></section></ServiceShell>;
}
