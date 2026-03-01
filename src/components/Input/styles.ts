import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Input Style Generator
// ──────────────────────────────────────────────

interface InputStyleProps {
  size: Size;
  radius: RadiusSize;
  error: boolean;
  hasLeftSection: boolean;
  hasRightSection: boolean;
}

const sizeMap: Record<Size, { height: string; fontSize: string; padding: string }> = {
  xs: { height: "1.75rem", fontSize: "var(--nui-font-size-xs)", padding: "0 0.5rem" },
  sm: { height: "2rem", fontSize: "var(--nui-font-size-sm)", padding: "0 0.625rem" },
  md: { height: "2.375rem", fontSize: "var(--nui-font-size-sm)", padding: "0 0.75rem" },
  lg: { height: "2.75rem", fontSize: "var(--nui-font-size-md)", padding: "0 0.875rem" },
  xl: { height: "3.25rem", fontSize: "var(--nui-font-size-md)", padding: "0 1rem" },
};

export function inputStyles(theme: Theme, props: InputStyleProps): StylesDefinition {
  const { size, radius, error, hasLeftSection, hasRightSection } = props;
  const sizeConfig = sizeMap[size];
  const isDark = theme.colorScheme === "dark";

  return {
    root: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.25rem",
    },
    label: {
      fontSize: "var(--nui-font-size-sm)",
      fontWeight: 500,
      color: "var(--nui-color-text)",
      fontFamily: "var(--nui-font-family)",
    },
    description: {
      fontSize: "var(--nui-font-size-xs)",
      color: "var(--nui-color-text-dimmed)",
      fontFamily: "var(--nui-font-family)",
      marginTop: "-0.125rem",
    },
    inputWrapper: {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      height: sizeConfig.height,
      fontSize: sizeConfig.fontSize,
      padding: sizeConfig.padding,
      paddingLeft: hasLeftSection ? "2.25rem" : undefined,
      paddingRight: hasRightSection ? "2.25rem" : undefined,
      fontFamily: "var(--nui-font-family)",
      borderRadius: `var(--nui-radius-${radius})`,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: error ? theme.colors.red[isDark ? 5 : 6] : "var(--nui-color-border)",
      backgroundColor: "var(--nui-color-surface)",
      color: "var(--nui-color-text)",
      outline: "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
    },
    leftSection: {
      position: "absolute" as const,
      left: "0.625rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--nui-color-text-dimmed)",
      pointerEvents: "none" as const,
    },
    rightSection: {
      position: "absolute" as const,
      right: "0.625rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--nui-color-text-dimmed)",
    },
    error: {
      fontSize: "var(--nui-font-size-xs)",
      color: theme.colors.red[isDark ? 4 : 6],
      fontFamily: "var(--nui-font-family)",
      marginTop: "0.125rem",
    },
  };
}
