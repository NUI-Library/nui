import { createContext } from "react";
import type { Theme, ColorScheme } from "../theme/types";
import { defaultTheme } from "../theme/defaults";

export interface UIContextValue {
  theme: Theme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  colorScheme: ColorScheme;
}

export const UIContext = createContext<UIContextValue>({
  theme: defaultTheme,
  setColorScheme: () => {},
  toggleColorScheme: () => {},
  colorScheme: "light",
});
