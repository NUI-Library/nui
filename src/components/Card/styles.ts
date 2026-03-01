import type { Theme, RadiusSize } from "../../theme/types";
import type { CardPadding, CardShadow } from "./types";
import type { StylesDefinition } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Card Style Generator
// ──────────────────────────────────────────────

interface CardStyleProps {
  padding: CardPadding;
  shadow: CardShadow;
  radius: RadiusSize;
  withBorder: boolean;
}

const paddingMap: Record<CardPadding, string> = {
  none: "0",
  xs: "var(--nui-spacing-xs)",
  sm: "var(--nui-spacing-sm)",
  md: "var(--nui-spacing-md)",
  lg: "var(--nui-spacing-lg)",
  xl: "var(--nui-spacing-xl)",
};

export function cardStyles(_theme: Theme, props: CardStyleProps): StylesDefinition {
  const { padding, shadow, radius, withBorder } = props;

  return {
    root: {
      backgroundColor: "var(--nui-color-surface)",
      borderRadius: `var(--nui-radius-${radius})`,
      padding: paddingMap[padding],
      boxShadow: `var(--nui-shadow-${shadow})`,
      border: withBorder ? "1px solid var(--nui-color-border)" : "none",
      overflow: "hidden",
      position: "relative" as const,
    },
  };
}
