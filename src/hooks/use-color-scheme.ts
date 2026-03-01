"use client";

import { useUI } from "./use-ui";
import type { ColorScheme } from "../theme/types";

export interface UseColorSchemeReturn {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  isDark: boolean;
}

export function useColorScheme(): UseColorSchemeReturn {
  const { colorScheme, setColorScheme, toggleColorScheme } = useUI();
  return {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
    isDark: colorScheme === "dark",
  };
}
