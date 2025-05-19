"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggleButton() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      const decisionTheme = systemTheme === "dark" ? "light" : "dark";

      setTheme(decisionTheme);
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggle}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
