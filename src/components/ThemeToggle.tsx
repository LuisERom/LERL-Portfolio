"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    // Always enforce dark mode
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Return null to hide the toggle button
  return null;
}
