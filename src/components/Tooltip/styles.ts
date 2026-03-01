import type { Theme } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";
import type { TooltipPosition } from "./types";

interface TooltipStyleProps { position: TooltipPosition }

export function tooltipStyles(theme: Theme, props: TooltipStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const bg = isDark ? "#1e293b" : "#1e293b";
  const posMap: Record<TooltipPosition, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "6px" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "6px" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "6px" },
  };
  return {
    wrapper: { position: "relative" as const, display: "inline-flex" },
    tooltip: {
      position: "absolute" as const,
      zIndex: 1000,
      backgroundColor: bg,
      color: "#f8fafc",
      padding: "0.3rem 0.6rem",
      borderRadius: "var(--nui-radius-sm)",
      fontSize: "var(--nui-font-size-xs)",
      fontFamily: "var(--nui-font-family)",
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      ...posMap[props.position],
    },
  };
}
