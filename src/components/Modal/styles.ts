import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Modal Style Generator
// ──────────────────────────────────────────────

interface ModalStyleProps {
  size: Size | string;
  radius: RadiusSize;
  centered: boolean;
  overlayOpacity: number;
  overlayBlur: number;
  zIndex: number;
  isAnimatingIn: boolean;
}

const sizeMap: Record<string, string> = {
  xs: "320px",
  sm: "380px",
  md: "440px",
  lg: "620px",
  xl: "780px",
};

export function modalStyles(_theme: Theme, props: ModalStyleProps): StylesDefinition {
  const {
    size,
    radius,
    centered,
    overlayOpacity,
    overlayBlur,
    zIndex,
    isAnimatingIn,
  } = props;

  const width = sizeMap[size] || size;

  return {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      backdropFilter: overlayBlur > 0 ? `blur(${overlayBlur}px)` : undefined,
      zIndex,
      display: "flex",
      alignItems: centered ? "center" : "flex-start",
      justifyContent: "center",
      padding: centered ? "var(--nui-spacing-md)" : "5vh var(--nui-spacing-md)",
      opacity: isAnimatingIn ? 1 : 0,
      transition: "opacity 200ms ease",
    },
    content: {
      backgroundColor: "var(--nui-color-surface)",
      borderRadius: `var(--nui-radius-${radius})`,
      boxShadow: "var(--nui-shadow-xl)",
      width: "100%",
      maxWidth: width,
      maxHeight: "calc(100vh - 10vh)",
      overflow: "auto",
      position: "relative" as const,
      transform: isAnimatingIn ? "scale(1) translateY(0)" : "scale(0.95) translateY(-10px)",
      opacity: isAnimatingIn ? 1 : 0,
      transition: "transform 200ms ease, opacity 200ms ease",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--nui-spacing-md) var(--nui-spacing-lg)",
      borderBottom: "1px solid var(--nui-color-border-subtle)",
    },
    title: {
      fontSize: "var(--nui-font-size-lg)",
      fontWeight: 600,
      color: "var(--nui-color-text)",
      fontFamily: "var(--nui-font-family)",
      margin: 0,
    },
    closeButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.75rem",
      height: "1.75rem",
      borderRadius: "var(--nui-radius-sm)",
      border: "none",
      backgroundColor: "transparent",
      color: "var(--nui-color-text-dimmed)",
      cursor: "pointer",
      padding: 0,
      transition: "background-color 150ms ease, color 150ms ease",
      fontSize: "1.125rem",
      lineHeight: 1,
    },
    body: {
      padding: "var(--nui-spacing-lg)",
      color: "var(--nui-color-text)",
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-sm)",
    },
  };
}
