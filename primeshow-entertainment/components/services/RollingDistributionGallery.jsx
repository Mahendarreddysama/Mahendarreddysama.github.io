"use client";

import { useMemo } from "react";
import Link from "next/link";

const rowOffsets = [0, 2, 4];

function galleryStyle(movie) {
  const poster = movie.distributionPoster || movie.poster;
  if (poster) {
    return {
      "--roll-image": `url("${poster}")`,
      "--roll-size": "cover",
      "--roll-position": movie.posterFocalPoint || "center center",
    };
  }
  return {
    "--roll-image": "url('/images/poster-sheet.webp')",
    "--roll-size": "600% 100%",
    "--roll-position": `${movie.posterPosition || "0%"} center`,
  };
}

export default function RollingDistributionGallery({ movies, compact = false }) {
  const rows = useMemo(() => rowOffsets.map((offset) => {
    const source = movies.length ? movies : [{ slug: "hanuman", title: "PrimeShow Release", poster: "/images/posters/hanuman.webp" }];
    return Array.from({ length: 10 }, (_, index) => source[(index + offset) % source.length]);
  }), [movies]);

  return (
    <section className={`distribution-roll ${compact ? "is-compact" : ""}`} aria-labelledby={compact ? "home-distribution-title" : "distribution-gallery-title"}>
      <div className="distribution-roll-intro container">
        <div className="distribution-roll-title">
          <div className="eyebrow">Across screens. Across borders.</div>
          <h2 id={compact ? "home-distribution-title" : "distribution-gallery-title"}>Distribution<br /><em>in motion.</em></h2>
          <p>Stories move through markets, languages, and territories—finding the audiences they were made for.</p>
        </div>
      </div>
      <div className="distribution-roll-motion">
        <div className="distribution-roll-stage">
          <div className="distribution-roll-rows" aria-label="PrimeShow release gallery">
            {rows.map((row, rowIndex) => (
              <div className={`distribution-roll-row roll-row-${rowIndex + 1}`} key={rowIndex}>
                {row.map((movie, index) => {
                  const frame = <span>{movie.title}</span>;
                  const className = `distribution-roll-frame roll-frame-${(index % 5) + 1}`;
                  const key = `${rowIndex}-${movie.slug}-${index}`;
                  return movie.hasDetailPage === false
                    ? <article className={className} style={galleryStyle(movie)} key={key}>{frame}</article>
                    : <Link href={`/movies/${movie.slug}`} className={className} style={galleryStyle(movie)} aria-label={`View ${movie.title}`} key={key}>{frame}</Link>;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
