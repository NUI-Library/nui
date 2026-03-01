import type { Theme, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";
import type { ToastPosition } from "./types";

interface ToastStyleProps {
  position: ToastPosition;
  color: string;
  radius: RadiusSize;
}

const positionStyles: Record<ToastPosition, React.CSSProperties> = {
  "top-right": { top: "1rem", right: "1rem" },
  "top-left": { top: "1rem", left: "1rem" },
  "bottom-right": { bottom: "1rem", right: "1rem" },
  "bottom-left": { bottom: "1rem", left: "1rem" },
  "top-center": { top: "1rem", left: "50%", transform: "translateX(-50%)" },
  "bottom-center": { bottom: "1rem", left: "50%", transform: "translateX(-50%)" },
};

export function toastContainerStyles(_theme: Theme, props: Pick<ToastStyleProps, "position">): StylesDefinition {
  return {
    root: {
      position: "fixed" as const,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem",
      maxWidth: "380px",
      width: "100%",
      pointerEvents: "none" as const,
      ...positionStyles[props.position],
    },
  };
}

export function toastStyles(theme: Theme, props: ToastStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color as keyof typeof theme.colors] || theme.colors.primary;

  return {
    root: {
      pointerEvents: "auto" as const,
      display: "flex",
      alignItems: "flex-start",
      gap: "0.625rem",
      padding: "0.875rem 1rem",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: isDark ? "var(--nui-color-dark-6, #25262b)" : "#fff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--nui-color-border)",
      boxShadow: "var(--nui-shadow-md)",
      fontFamily: "var(--nui-font-family)",
      animation: "nui-toast-enter 250ms ease",
    },
    indicator: {
      width: "4px",
      alignSelf: "stretch",
      borderRadius: "2px",
      backgroundColor: scale[isDark ? 4 : 6],
      flexShrink: 0,
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.125rem",
    },
    title: {
      fontWeight: 600,
      fontSize: "var(--nui-font-size-sm)",
      color: "var(--nui-color-text)",
    },
    message: {
      fontSize: "var(--nui-font-size-xs)",
      color: "var(--nui-color-text-dimmed)",
      lineHeight: 1.5,
    },
    closeBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.25rem",
      height: "1.25rem",
      border: "none",
      borderRadius: "4px",
      background: "transparent",
      color: "var(--nui-color-text-dimmed)",
      cursor: "pointer",
      padding: 0,
      flexShrink: 0,
    },
  };
}
