"use client";

import Image from "next/image";
import {
  Award, Clapperboard, Cpu, Handshake, MapPinned,
  Network, Projector, Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const icons = { Award, Clapperboard, Cpu, Handshake, MapPinned, Network, Projector, Sparkles };

function StrengthGrid({ strengths }) {
  return <div className="strength-grid">{strengths.map(item => { const Icon = icons[item.icon]; return <article key={item.title} className="strength-card" tabIndex="0"><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>;
}

function Chapter({ chapter, strengths, index }) {
  const Heading = index === 0 ? "h1" : "h2";
  const content = <div className="chapter-copy"><div className="eyebrow">Chapter {chapter.number} · {chapter.eyebrow}</div><Heading id={`chapter-title-${chapter.number}`}>{chapter.title}</Heading><p>{chapter.body}</p>{chapter.quote && <blockquote>“{chapter.quote}”</blockquote>}</div>;
  return <section id={chapter.id} className={`about-chapter chapter-${chapter.number} layout-${chapter.layout}`} aria-labelledby={`chapter-title-${chapter.number}`}>
    <div className="chapter-bg" aria-hidden="true">{chapter.image && <Image src={chapter.image} alt="" fill priority={chapter.number === "01"} sizes="100vw" />}</div><div className="chapter-shade" /><div className="grain" aria-hidden="true" />
    <div className="chapter-inner container">{chapter.layout === "strength" ? <div className="strength-layout">{content}<StrengthGrid strengths={strengths} /></div> : chapter.layout === "leadership" ? <>{content}<article className="leader-card"><div className="leader-portrait"><Image src={chapter.image} alt={chapter.imageAlt} fill sizes="(max-width: 700px) 80vw, 32vw" /></div><div className="leader-info"><span>Leadership profile</span><h3>{chapter.leader.name}</h3><h4>{chapter.leader.role}</h4><p>{chapter.leader.bio}</p></div></article></> : <>{chapter.layout === "reverse" && <ChapterMedia chapter={chapter} />}{content}{chapter.layout !== "reverse" && <ChapterMedia chapter={chapter} />}</>}</div>
  </section>;
}

function ChapterMedia({ chapter }) {
  const showImageNumber = chapter.number !== "01" && chapter.number !== "03";
  return <figure className="chapter-media"><Image src={chapter.image} alt={chapter.imageAlt} fill priority={chapter.number === "01"} sizes="(max-width: 900px) 100vw, 52vw" /><figcaption>{showImageNumber && <span>{chapter.number}</span>}<p>{chapter.eyebrow}</p></figcaption></figure>;
}

export default function AboutExperience({ content }) {
  return <div className="about-experience about-longform">
    <SiteHeader items={content.navigation} activeHref="/about" className="about-header" />
    <main id="main-content" className="story-stage">{content.chapters.map((chapter, index) => <Chapter key={chapter.id} chapter={chapter} strengths={content.strengths} index={index} />)}</main>
    <SiteFooter />
  </div>;
}
