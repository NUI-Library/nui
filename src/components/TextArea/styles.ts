import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

interface TextAreaStyleProps { size: Size; radius: RadiusSize; error: boolean; disabled: boolean }

const sizeMap: Record<Size, { padding: string; fontSize: string }> = {
  xs: { padding: "0.35rem 0.6rem", fontSize: "var(--nui-font-size-xs)" },
  sm: { padding: "0.4rem 0.75rem", fontSize: "var(--nui-font-size-sm)" },
  md: { padding: "0.55rem 0.875rem", fontSize: "var(--nui-font-size-sm)" },
  lg: { padding: "0.65rem 1rem", fontSize: "var(--nui-font-size-md)" },
  xl: { padding: "0.8rem 1.125rem", fontSize: "var(--nui-font-size-md)" },
};

export function textAreaStyles(theme: Theme, props: TextAreaStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const s = sizeMap[props.size];
  return {
    root: { display: "flex", flexDirection: "column" as const, gap: "0.25rem" },
    label: { fontSize: "var(--nui-font-size-sm)", fontWeight: 600, color: "var(--nui-color-text)", fontFamily: "var(--nui-font-family)" },
    description: { fontSize: "var(--nui-font-size-xs)", color: "var(--nui-color-text-dimmed)", fontFamily: "var(--nui-font-family)" },
    input: {
      width: "100%",
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: "var(--nui-font-family)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: props.error ? theme.colors.red[isDark ? 5 : 6] : "var(--nui-color-border)",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: "var(--nui-color-input-bg)",
      color: "var(--nui-color-text)",
      outline: "none",
      resize: "vertical" as const,
      minHeight: "4.5rem",
      lineHeight: 1.55,
      opacity: props.disabled ? 0.6 : 1,
      transition: "border-color 150ms ease",
    },
    error: { fontSize: "var(--nui-font-size-xs)", color: theme.colors.red[isDark ? 4 : 6], fontFamily: "var(--nui-font-family)" },
  };
}
