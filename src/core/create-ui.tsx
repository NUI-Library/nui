"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import type { PartialTheme, Theme, ColorScheme } from "../theme/types";
import { defaultTheme } from "../theme/defaults";
import { deepMerge } from "../utils/deep-merge";
import { generateCSSVariables, cssVariablesToString } from "../theme/css-variables";
import { UIContext } from "./context";

// createUI factory

export interface CreateUIConfig {
  theme?: PartialTheme;
}

export interface UIInstance {
  Provider: React.FC<{ children: React.ReactNode }>;
  theme: Theme;
}

let instanceCounter = 0;

export function createUI(config: CreateUIConfig = {}): UIInstance {
  const instanceId = `nui-${++instanceCounter}`;
  const baseTheme = deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    (config.theme ?? {}) as Record<string, unknown>
  ) as unknown as Theme;

  // Resolve primaryColor into colors.primary
  if (config.theme?.primaryColor && baseTheme.colors[baseTheme.primaryColor]) {
    baseTheme.colors = {
      ...baseTheme.colors,
      primary: baseTheme.colors[baseTheme.primaryColor],
    };
  }

  function Provider({ children }: { children: React.ReactNode }) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
      baseTheme.colorScheme
    );

    const theme = useMemo<Theme>(
      () => ({ ...baseTheme, colorScheme }),
      [colorScheme]
    );

    const toggleColorScheme = useCallback(() => {
      setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const cssVars = useMemo(() => generateCSSVariables(theme), [theme]);
    const styleString = useMemo(() => cssVariablesToString(cssVars), [cssVars]);

    const contextValue = useMemo(
      () => ({ theme, setColorScheme, toggleColorScheme, colorScheme }),
      [theme, toggleColorScheme, colorScheme]
    );

    // Inject CSS variables globally when this is the outermost provider
    useEffect(() => {
      const styleEl = document.createElement("style");
      styleEl.id = `nui-vars-${instanceId}`;
      styleEl.textContent = `[data-nui="${instanceId}"] {\n  ${styleString}\n}`;
      document.head.appendChild(styleEl);
      return () => {
        styleEl.remove();
      };
    }, [styleString]);

    return (
      <UIContext.Provider value={contextValue}>
        <div
          data-nui={instanceId}
          data-color-scheme={colorScheme}
          style={{
            fontFamily: "var(--nui-font-family)",
            color: "var(--nui-color-text)",
            backgroundColor: "var(--nui-color-body)",
            minHeight: "inherit",
          }}
        >
          {children}
        </div>
      </UIContext.Provider>
    );
  }

  Provider.displayName = `NUI.Provider(${instanceId})`;

  return {
    Provider,
    theme: baseTheme,
  };
}
