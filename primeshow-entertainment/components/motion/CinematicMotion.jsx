"use client";

import { useEffect } from "react";

export default function CinematicMotion({ children }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer:fine) and (min-width:1001px)").matches;
    const mobile = window.matchMedia("(max-width:900px)").matches;
    const cursor = document.querySelector(".global-cursor");
    const progress = document.querySelector(".global-scroll-progress");
    const movieRails = [...document.querySelectorAll(".movie-rail")];

    movieRails.forEach((rail) => {
      rail.style.touchAction = "pan-y";
    });

    let cursorFrame = 0;
    const moveCursor = (event) => {
      if (!cursor || !finePointer || reduced) return;
      if (cursorFrame) cancelAnimationFrame(cursorFrame);
      cursorFrame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX - 11}px, ${event.clientY - 11}px, 0)`;
      });
    };

    const updateProgress = () => {
      if (!progress || mobile) return;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const amount = range > 0 ? Math.min(window.scrollY / range, 1) : 0;
      progress.style.transform = `scaleX(${amount})`;
    };

    const allowVerticalRailScroll = (event) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".movie-rail")) return;
      if (event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      event.stopPropagation();
    };

    if (finePointer && !reduced) {
      window.addEventListener("pointermove", moveCursor, { passive: true });
    }
    if (!mobile) {
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }
    window.addEventListener("wheel", allowVerticalRailScroll, { capture: true, passive: true });

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      if (!mobile) window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("wheel", allowVerticalRailScroll, true);
      movieRails.forEach((rail) => {
        rail.style.removeProperty("touch-action");
      });
      if (cursorFrame) cancelAnimationFrame(cursorFrame);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor global-cursor" aria-hidden="true"><span /></div>
      <div className="global-scroll-progress" aria-hidden="true" />
      {children}
    </>
  );
}
