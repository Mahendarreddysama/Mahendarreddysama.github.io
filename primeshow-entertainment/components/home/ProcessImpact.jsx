"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProcessImpact({ content }) {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduce) return;

      gsap.fromTo(
        ".process-intro > *",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: .9, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: ".process-intro", start: "top 76%" } },
      );

      gsap.fromTo(
        ".process-line-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".process-timeline", start: "top 68%", end: "bottom 45%", scrub: .8 } },
      );

      gsap.utils.toArray(".process-step").forEach((step) => {
        const copy = step.querySelector(".process-copy");
        const node = step.querySelector(".process-node");
        gsap.fromTo(copy, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 76%" } });
        gsap.fromTo(node, { scale: .2, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: "back.out(2)", scrollTrigger: { trigger: step, start: "top 78%" } });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={root} id="process" className="process-section" aria-labelledby="process-title">
      <div className="container process-intro">
        <div>
          <div className="eyebrow">{content.process.eyebrow}</div>
          <h2 id="process-title">From Discover<br />to <em>Distribute.</em></h2>
        </div>
        <p>{content.process.subtitle}</p>
      </div>

      <div className="process-timeline">
        <div className="process-line" aria-hidden="true"><i className="process-line-fill" /></div>
        {content.process.steps.map((step, index) => (
          <article key={step.number} className={`process-step ${index % 2 ? "step-right" : "step-left"}`}>
            <div className="process-copy">
              <span>Step {step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </div>
            <span className="process-node" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
