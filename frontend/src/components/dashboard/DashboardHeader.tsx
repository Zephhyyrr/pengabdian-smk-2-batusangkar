"use client";

import { useState, useEffect } from "react";

type DashboardHeaderProps = {
  title: string;
};

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="flex justify-between h-15 mb-4 items-center dark:border-gray-700">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsDark(!isDark)}
          className="dark:bg-gray-800 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 px-3 py-1 rounded">
          {isDark ? "☀️" : "🌙"}
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
}
