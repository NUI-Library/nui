import type { Theme, RadiusSize } from "../../theme/types";
import type { AccordionVariant } from "./types";
import type { StylesDefinition } from "../../styles/use-styles";

interface AccordionStyleProps { variant: AccordionVariant; radius: RadiusSize }

export function accordionStyles(theme: Theme, props: AccordionStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const sep = props.variant === "separated";
  return {
    root: { display: "flex", flexDirection: "column" as const, gap: sep ? "0.5rem" : "0" },
    item: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: props.variant === "default" ? "transparent" : "var(--nui-color-border)",
      borderRadius: sep ? `var(--nui-radius-${props.radius})` : "0",
      overflow: "hidden",
      backgroundColor: props.variant === "contained" ? (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)") : "transparent",
      borderBottomColor: props.variant === "default" ? "var(--nui-color-border)" : undefined,
    },
    control: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem 1rem",
      border: "none",
      background: "transparent",
      color: "var(--nui-color-text)",
      fontSize: "var(--nui-font-size-sm)",
      fontWeight: 600,
      fontFamily: "var(--nui-font-family)",
      cursor: "pointer",
      textAlign: "left" as const,
      transition: "background 150ms",
    },
    chevron: { color: "var(--nui-color-text-dimmed)", transition: "transform 200ms ease", display: "flex" },
    chevronOpen: { transform: "rotate(180deg)" },
    panel: {
      padding: "0 1rem 0.75rem",
      fontSize: "var(--nui-font-size-sm)",
      color: "var(--nui-color-text-dimmed)",
      fontFamily: "var(--nui-font-family)",
      lineHeight: 1.6,
    },
  };
}
