"use client";

import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(`theme-${storedTheme}`);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(`theme-${newTheme}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">
        {theme === "light" ? "Light" : "Dark"}
      </span>
      <button
        onClick={toggleTheme}
        className={`
          relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 cursor-pointer
          ${theme === "dark" ? "bg-[var(--primary-color)]" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
          `}
        >
          <span className="text-[var(--secondary-color)]">
        {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
      </span>
        </span>
      </button>
    </div>
  );
}
