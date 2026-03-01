import type { Theme, RadiusSize, ThemeColorName } from "../../theme/types";
import type { AlertVariant } from "./types";
import type { StylesDefinition } from "../../styles/use-styles";

interface AlertStyleProps { variant: AlertVariant; color: ThemeColorName; radius: RadiusSize }

export function alertStyles(theme: Theme, props: AlertStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color];
  const v = props.variant;
  const bg = v === "filled" ? scale[isDark ? 8 : 6] : v === "subtle" ? (isDark ? `${scale[9]}22` : `${scale[1]}`) : "transparent";
  const fg = v === "filled" ? "#fff" : scale[isDark ? 4 : 7];
  const borderC = v === "outline" ? scale[isDark ? 5 : 4] : "transparent";
  return {
    root: {
      display: "flex",
      gap: "0.75rem",
      padding: "0.875rem 1rem",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: bg,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: borderC,
      color: fg,
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-sm)",
      lineHeight: 1.55,
      position: "relative" as const,
    },
    icon: { flexShrink: 0, marginTop: "1px" },
    body: { flex: 1, minWidth: 0 },
    title: { fontWeight: 700, fontSize: "var(--nui-font-size-sm)", marginBottom: "0.25rem" },
    message: { opacity: v === "filled" ? 0.9 : 0.85 },
    closeBtn: {
      position: "absolute" as const,
      top: "0.5rem",
      right: "0.5rem",
      background: "none",
      border: "none",
      color: "inherit",
      opacity: 0.6,
      cursor: "pointer",
      padding: "0.25rem",
      display: "flex",
      alignItems: "center",
    },
  };
}
