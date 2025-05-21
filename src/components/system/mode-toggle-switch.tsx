"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { IconMoonFilled } from "@tabler/icons-react";
import { SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggleSwitch() {
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

  const getBinaryTheme = () => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      const decisionTheme = systemTheme === "dark" ? "light" : "dark";

      return decisionTheme;
    }
    return theme;
  };

  return (
    <SwitchPrimitives.Root
      checked={getBinaryTheme() === "dark"}
      onClick={handleToggle}
      className="peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-background data-[state=unchecked]:bg-primary inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
    >
      <SwitchPrimitives.Thumb className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-background pointer-events-none flex size-5 items-center justify-center rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0">
        {getBinaryTheme() === "dark" ? (
          <IconMoonFilled className="size-3" />
        ) : (
          <SunIcon className="size-3" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
}
