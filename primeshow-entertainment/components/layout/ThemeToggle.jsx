"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ mobile = false }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = "dark";
    try { localStorage.setItem("primeshow-theme", next); } catch {}
  };

  return (
    <button
      type="button"
      className={`theme-toggle${mobile ? " mobile-theme-toggle" : ""}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      {mobile && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
