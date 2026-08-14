import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

const mobileHeroFocalPoints = {
  hanuman: "72% center",
  syg: "56% center",
  brb: "75% center",
};

export default function MovieDetail({ movie, related }) {
  const heroImage = movie.heroImage || "/images/production-hero.webp";
  const mobileHeroFocalPoint = mobileHeroFocalPoints[movie.slug] || movie.heroFocalPoint || "center center";
  const gallery = movie.gallery || [0, 1, 2].map(index => ({
    image: "/images/production-hero.webp",
    alt: `${movie.title} gallery still ${index + 1}`,
    focalPoint: `${index * 35}% center`,
  }));
  return <main id="main-content" className={`movie-detail movie-detail-${movie.slug}`}><section className="movie-detail-hero" style={{"--movie-hero-desktop":movie.heroFocalPoint || "center center","--movie-hero-mobile":mobileHeroFocalPoint}}><Image src={heroImage} alt={`${movie.title} cinematic banner`} fill priority sizes="100vw" /><div className="movie-detail-shade" /><div className="container movie-detail-copy"><Link href="/services/production" className="back-link"><ArrowLeft /> Production</Link><span className={`status ${movie.status === "Released" ? "released" : ""}`}>{movie.status}</span><h1>{movie.title}</h1><p>{movie.year} · {movie.language} · {movie.genre} · {movie.duration}</p>{movie.trailer && <a className="button button-gold" href={movie.trailer.url} target="_blank" rel="noreferrer"><span>Watch official trailer</span><Play size={16} fill="currentColor" /></a>}</div></section><section className="section movie-story"><div className="container movie-story-grid"><div><div className="eyebrow">Synopsis</div><h2>The <em>story.</em></h2><p>{movie.synopsis}</p></div><dl><div><dt>Release</dt><dd>{movie.releaseDate || "To be announced"}</dd></div><div><dt>Languages</dt><dd>{movie.languages.join(", ")}</dd></div><div><dt>Territory</dt><dd>{movie.territory}</dd></div><div><dt>Status</dt><dd>{movie.status}</dd></div></dl></div></section>{(movie.cast.length > 0 || movie.crew.length > 0) && <section className="section credits"><div className="container credits-grid"><div><div className="eyebrow">Cast</div>{movie.cast.map(name => <h3 key={name}>{name}</h3>)}</div><div><div className="eyebrow">Crew</div>{movie.crew.map(name => <h3 key={name}>{name}</h3>)}</div></div></section>}<section className="section detail-gallery"><div className="container"><div className="eyebrow">Gallery</div><div className="detail-gallery-grid">{gallery.map((item, index) => <figure key={item.image}><Image src={item.image} alt={item.alt || `${movie.title} gallery still ${index + 1}`} fill sizes="(max-width: 640px) 85vw, 33vw" style={{ objectPosition: item.focalPoint || "center center" }} /></figure>)}</div></div></section>{related.length > 0 && <section className="section related-films"><div className="container"><div className="section-head"><div><div className="eyebrow">Continue watching</div><h2>Related <em>films.</em></h2></div></div><div className="related-row">{related.map(item => <Link href={`/movies/${item.slug}`} key={item.slug}><span>{item.status}</span><h3>{item.title}</h3><p>{item.language} · {item.year}</p><ArrowRight /></Link>)}</div></div></section>}</main>;
}
