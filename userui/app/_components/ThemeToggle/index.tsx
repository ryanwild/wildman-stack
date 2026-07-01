"use client";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { ComponentProps } from "react";

import style from "./style.module.css";

export type ThemeToggleProps = ComponentProps<"button"> & {};

export const ThemeToggle = ({ className, ...props }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className={className}>
      <button
        className={style.Button}
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
        title="Toggle light/dark theme"
        {...props}
      >
        {resolvedTheme == "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

export default ThemeToggle;
