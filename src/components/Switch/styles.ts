import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

interface SwitchStyleProps {
  size: Size;
  radius: RadiusSize;
  color: string;
  checked: boolean;
  disabled: boolean;
}

const sizeMap: Record<Size, { track: { w: string; h: string }; thumb: string }> = {
  xs: { track: { w: "2rem", h: "1.125rem" }, thumb: "0.875rem" },
  sm: { track: { w: "2.375rem", h: "1.25rem" }, thumb: "1rem" },
  md: { track: { w: "2.75rem", h: "1.5rem" }, thumb: "1.25rem" },
  lg: { track: { w: "3.125rem", h: "1.75rem" }, thumb: "1.5rem" },
  xl: { track: { w: "3.5rem", h: "2rem" }, thumb: "1.75rem" },
};

export function switchStyles(theme: Theme, props: SwitchStyleProps): StylesDefinition {
  const { size, radius, color, checked, disabled } = props;
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[color as keyof typeof theme.colors] || theme.colors.primary;
  const sc = sizeMap[size];

  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.625rem",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--nui-font-family)",
    },
    track: {
      position: "relative" as const,
      width: sc.track.w,
      height: sc.track.h,
      borderRadius: radius === "full" ? "999px" : `var(--nui-radius-${radius})`,
      backgroundColor: checked ? scale[isDark ? 7 : 6] : (isDark ? "var(--nui-color-dark-4, #5c5f66)" : "var(--nui-color-gray-3, #dee2e6)"),
      transition: "background-color 200ms ease",
      cursor: "inherit",
      flexShrink: 0,
    },
    thumb: {
      position: "absolute" as const,
      top: "50%",
      left: checked ? `calc(100% - ${sc.thumb} - 0.125rem)` : "0.125rem",
      transform: "translateY(-50%)",
      width: sc.thumb,
      height: sc.thumb,
      borderRadius: "inherit",
      backgroundColor: "#fff",
      transition: "left 200ms ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    },
    label: {
      fontSize: "var(--nui-font-size-sm)",
      color: "var(--nui-color-text)",
    },
  };
}
