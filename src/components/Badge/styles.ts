import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";
import type { BadgeVariant } from "./types";

interface BadgeStyleProps {
  variant: BadgeVariant;
  size: Size;
  radius: RadiusSize;
  color: string;
}

const sizeMap: Record<Size, { fontSize: string; height: string; padding: string }> = {
  xs: { fontSize: "0.6rem", height: "1.125rem", padding: "0 0.375rem" },
  sm: { fontSize: "0.65rem", height: "1.375rem", padding: "0 0.5rem" },
  md: { fontSize: "0.7rem", height: "1.5rem", padding: "0 0.625rem" },
  lg: { fontSize: "0.75rem", height: "1.75rem", padding: "0 0.75rem" },
  xl: { fontSize: "0.8rem", height: "2rem", padding: "0 0.875rem" },
};

export function badgeStyles(theme: Theme, props: BadgeStyleProps): StylesDefinition {
  const { variant, size, radius, color } = props;
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[color as keyof typeof theme.colors] || theme.colors.primary;
  const sc = sizeMap[size];

  const filled = scale[isDark ? 8 : 6];
  const light = scale[isDark ? 9 : 0];
  const text = scale[isDark ? 4 : 7];

  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--nui-font-family)",
      fontWeight: 700,
      fontSize: sc.fontSize,
      height: sc.height,
      padding: sc.padding,
      borderRadius: `var(--nui-radius-${radius})`,
      letterSpacing: "0.02em",
      textTransform: "uppercase" as const,
      lineHeight: 1,
      whiteSpace: "nowrap" as const,
      userSelect: "none" as const,
      ...(variant === "filled" && {
        backgroundColor: filled,
        color: "#fff",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
      }),
      ...(variant === "outline" && {
        backgroundColor: "transparent",
        color: scale[isDark ? 4 : 6],
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: scale[isDark ? 4 : 6],
      }),
      ...(variant === "subtle" && {
        backgroundColor: light,
        color: text,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
      }),
    },
  };
}
