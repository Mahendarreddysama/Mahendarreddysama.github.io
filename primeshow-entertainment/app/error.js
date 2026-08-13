"use client";
export default function ErrorPage({reset}){return <main id="main-content" className="route-status" role="alert"><div className="eyebrow">Playback interrupted</div><h1>We could not load this story.</h1><p>Please try again. Your place in the experience is safe.</p><button className="button button-gold" onClick={reset}>Try again</button></main>}
