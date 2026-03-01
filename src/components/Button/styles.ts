import type { Theme, Size, RadiusSize, ThemeColorName } from "../../theme/types";
import type { ButtonVariant } from "./types";
import type { StylesDefinition } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Button Style Generator
// ──────────────────────────────────────────────

interface ButtonStyleProps {
  variant: ButtonVariant;
  size: Size;
  radius: RadiusSize;
  color: ThemeColorName;
  loading: boolean;
  disabled: boolean;
  fullWidth: boolean;
}

const sizeMap: Record<Size, { height: string; padding: string; fontSize: string }> = {
  xs: { height: "1.75rem", padding: "0 0.75rem", fontSize: "var(--nui-font-size-xs)" },
  sm: { height: "2rem", padding: "0 0.875rem", fontSize: "var(--nui-font-size-sm)" },
  md: { height: "2.375rem", padding: "0 1.125rem", fontSize: "var(--nui-font-size-sm)" },
  lg: { height: "2.75rem", padding: "0 1.5rem", fontSize: "var(--nui-font-size-md)" },
  xl: { height: "3.25rem", padding: "0 2rem", fontSize: "var(--nui-font-size-md)" },
};

function getVariantStyles(
  theme: Theme,
  variant: ButtonVariant,
  color: ThemeColorName
): React.CSSProperties {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[color];

  switch (variant) {
    case "filled":
      return {
        backgroundColor: scale[isDark ? 8 : 6],
        color: "#ffffff",
        border: "1px solid transparent",
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: scale[isDark ? 4 : 6],
        border: `1px solid ${scale[isDark ? 4 : 6]}`,
      };
    case "subtle":
      return {
        backgroundColor: "transparent",
        color: scale[isDark ? 4 : 6],
        border: "1px solid transparent",
      };
  }
}

export function buttonStyles(
  theme: Theme,
  props: ButtonStyleProps
): StylesDefinition {
  const { variant, size, radius, color, loading, disabled, fullWidth } = props;
  const sizeConfig = sizeMap[size];
  const variantStyle = getVariantStyles(theme, variant, color);

  return {
    root: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--nui-spacing-sm)",
      height: sizeConfig.height,
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      fontFamily: "var(--nui-font-family)",
      lineHeight: 1,
      borderRadius: `var(--nui-radius-${radius})`,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease, opacity 150ms ease",
      textDecoration: "none",
      userSelect: "none" as const,
      WebkitTapHighlightColor: "transparent",
      ...variantStyle,
    },
    inner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--nui-spacing-sm)",
      opacity: loading ? 0 : 1,
    },
    loader: {
      position: "absolute" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
}
