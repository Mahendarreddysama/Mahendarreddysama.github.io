"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EASE = [0.22, 1, 0.36, 1];

function FirstVisitLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("primeshow-intro")) return;
    sessionStorage.setItem("primeshow-intro", "seen");
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(() => setVisible(false), 2450);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="studio-loader global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 1.018 }}
          transition={{ duration: 0.62, ease: EASE }}
          aria-hidden="true"
        >
          <div className="grain" />
          <motion.div className="loader-mark" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }}><Image src="/images/primeshow-logo.png" alt="" width={360} height={240} priority unoptimized /></motion.div>
          <i />
          <span className="loader-sweep" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlobalCursor() {
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const smoothX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!matchMedia("(pointer:fine) and (min-width:1001px)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (event) => { x.set(event.clientX - 11); y.set(event.clientY - 11); };
    const over = (event) => setHovering(Boolean(event.target.closest("a,button,input,select,textarea,[tabindex]")));
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [x, y]);

  return <motion.div className={`custom-cursor global-cursor ${hovering ? "is-hover" : ""}`} style={{ x: smoothX, y: smoothY }} aria-hidden="true"><span /></motion.div>;
}

function useGlobalMotion(pathname) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer:fine)").matches;
    const compact = matchMedia("(max-width: 1000px)").matches;
    const saveData = navigator.connection?.saveData === true;
    gsap.registerPlugin(ScrollTrigger);

    let raf = 0;
    const lenis = reduced || compact || saveData ? null : new Lenis({ duration: 0.92, smoothWheel: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    const frame = (time) => { lenis?.raf(time); raf = requestAnimationFrame(frame); };
    if (lenis) raf = requestAnimationFrame(frame);

    const progress = document.querySelector(".global-scroll-progress");
    const updateProgress = () => {
      const range = document.documentElement.scrollHeight - innerHeight;
      const amount = range > 0 ? Math.min(scrollY / range, 1) : 0;
      progress?.style.setProperty("transform", `scaleX(${amount})`);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh, { passive: true });
    updateProgress();

    const context = gsap.context(() => {
      if (reduced) return;
      gsap.utils.toArray("main > section:not(.hero):not(.hub-hero):not(.division-hero):not(.about-chapter)").forEach((section) => {
        if (section.hasAttribute("data-motion-seen")) return;
        section.setAttribute("data-motion-seen", "true");
        gsap.fromTo(section, { opacity: 0.82, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 94%", once: true } });
      });
      if (fine && !compact && !saveData) gsap.utils.toArray(".hero-image,.hub-hero > img,.division-hero > img,.movie-detail-hero > img").forEach((media) => {
        gsap.to(media, { yPercent: 4, scale: 1.035, ease: "none", scrollTrigger: { trigger: media.parentElement, start: "top top", end: "bottom top", scrub: 0.7 } });
      });
    });

    let lightTimer = 0;
    const lightObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting || reduced) return;
      const sweep = document.querySelector(".section-light-sweep");
      if (!sweep) return;
      sweep.classList.remove("is-active");
      requestAnimationFrame(() => sweep.classList.add("is-active"));
      window.clearTimeout(lightTimer);
      lightTimer = window.setTimeout(() => sweep.classList.remove("is-active"), 1500);
    }), { rootMargin: "-18% 0px -42%", threshold: 0.05 });
    document.querySelectorAll("main > section").forEach((section) => lightObserver.observe(section));

    const tiltSelector = ".movie-art,.catalog-art,.quiz-poster,.signature-poster,.v-poster,.article-card,.service-portal";
    const tiltTargets = fine && !reduced ? [...document.querySelectorAll(tiltSelector)] : [];
    const cleanups = [];
    tiltTargets.forEach((element) => {
      element.classList.add("motion-tilt");
      const move = (event) => {
        const box = element.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width;
        const py = (event.clientY - box.top) / box.height;
        element.style.setProperty("--tilt-rx", `${(0.5 - py) * 4}deg`);
        element.style.setProperty("--tilt-ry", `${(px - 0.5) * 5}deg`);
        element.style.setProperty("--light-x", `${px * 100}%`);
        element.style.setProperty("--light-y", `${py * 100}%`);
      };
      const leave = () => { element.style.removeProperty("--tilt-rx"); element.style.removeProperty("--tilt-ry"); };
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); element.classList.remove("motion-tilt"); leave(); });
    });

    const magneticTargets = fine && !reduced ? [...document.querySelectorAll(".button:not([style])")] : [];
    magneticTargets.forEach((button) => {
      const move = (event) => {
        const box = button.getBoundingClientRect();
        button.style.translate = `${(event.clientX - box.left - box.width / 2) * 0.09}px ${(event.clientY - box.top - box.height / 2) * 0.09}px`;
      };
      const leave = () => { button.style.translate = "0 0"; };
      button.addEventListener("pointermove", move, { passive: true });
      button.addEventListener("pointerleave", leave);
      cleanups.push(() => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); button.style.removeProperty("translate"); });
    });

    const anchors = [...document.querySelectorAll('a[href^="#"]')];
    anchors.forEach((anchor) => {
      const click = (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target || !lenis) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.05 });
      };
      anchor.addEventListener("click", click);
      cleanups.push(() => anchor.removeEventListener("click", click));
    });

    ScrollTrigger.refresh();
    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lightObserver.disconnect();
      window.clearTimeout(lightTimer);
      cleanups.forEach((cleanup) => cleanup());
      lenis?.destroy();
      lenisRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", refresh);
    };
  }, [pathname]);
}

export default function CinematicMotion({ children }) {
  const pathname = usePathname();
  useGlobalMotion(pathname);

  return (
    <>
      <FirstVisitLoader />
      <GlobalCursor />
      <div className="global-scroll-progress" aria-hidden="true" />
      <div className="section-light-sweep" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="route-motion-stage"
          initial={{ opacity: 0, scale: 0.995, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "none" }}
          exit={{ opacity: 0, scale: 1.004, filter: "blur(4px)" }}
          transition={{ duration: 0.52, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
