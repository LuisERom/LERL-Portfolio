"use client";

import { useEffect } from "react";

export default function ThemeInit() {
  useEffect(() => {
    try {
      // Always enforce dark mode
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } catch { }
  }, []);

  return null;
}
