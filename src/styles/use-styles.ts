"use client";

import { useMemo } from "react";
import { useUI } from "../hooks/use-ui";
import type { Theme, ComponentStyleOverride } from "../theme/types";

export type StylesDefinition = Record<string, React.CSSProperties>;

export type StylesFn<P = Record<string, unknown>> = (
  theme: Theme,
  props: P
) => StylesDefinition;

export interface UseStylesParams<P = Record<string, unknown>> {
  name: string;
  stylesFn: StylesFn<P>;
  props: P;
  variant?: string;
  variantValue?: string;
}

export function useStyles<P = Record<string, unknown>>({
  name,
  stylesFn,
  props,
  variant,
  variantValue,
}: UseStylesParams<P>): StylesDefinition {
  const { theme } = useUI();

  return useMemo(() => {
    const baseStyles = stylesFn(theme, props);

    const componentOverride = theme.components[
      name as keyof typeof theme.components
    ] as { styles?: ComponentStyleOverride; variants?: Record<string, Record<string, ComponentStyleOverride>> } | undefined;

    if (componentOverride) {
      if (componentOverride.styles) {
        for (const part of Object.keys(componentOverride.styles) as Array<
          keyof ComponentStyleOverride
        >) {
          if (baseStyles[part] && componentOverride.styles[part]) {
            baseStyles[part] = {
              ...baseStyles[part],
              ...componentOverride.styles[part],
            };
          }
        }
      }

      if (
        variant &&
        variantValue &&
        componentOverride.variants?.[variant]?.[variantValue]
      ) {
        const variantStyles =
          componentOverride.variants[variant][variantValue];
        for (const part of Object.keys(variantStyles) as Array<
          keyof ComponentStyleOverride
        >) {
          if (baseStyles[part] && variantStyles[part]) {
            baseStyles[part] = {
              ...baseStyles[part],
              ...variantStyles[part],
            };
          }
        }
      }
    }

    return baseStyles;
  }, [theme, props, name, variant, variantValue, stylesFn]);
}
