import type { Theme } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

export function breadcrumbStyles(_theme: Theme): StylesDefinition {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "0.375rem",
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-sm)",
    },
    separator: {
      color: "var(--nui-color-text-dimmed)",
      display: "flex",
      alignItems: "center",
      userSelect: "none" as const,
    },
    item: {
      color: "var(--nui-color-text-dimmed)",
      textDecoration: "none",
      transition: "color 150ms ease",
      cursor: "pointer",
    },
    itemActive: {
      color: "var(--nui-color-text)",
      fontWeight: 500,
      cursor: "default",
    },
  };
}
