import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

interface SelectStyleProps { size: Size; radius: RadiusSize; error: boolean; disabled: boolean }

const sizeMap: Record<Size, { height: string; padding: string; fontSize: string }> = {
  xs: { height: "1.75rem", padding: "0 0.6rem", fontSize: "var(--nui-font-size-xs)" },
  sm: { height: "2rem", padding: "0 0.75rem", fontSize: "var(--nui-font-size-sm)" },
  md: { height: "2.375rem", padding: "0 0.875rem", fontSize: "var(--nui-font-size-sm)" },
  lg: { height: "2.75rem", padding: "0 1rem", fontSize: "var(--nui-font-size-md)" },
  xl: { height: "3.25rem", padding: "0 1.125rem", fontSize: "var(--nui-font-size-md)" },
};

export function selectStyles(theme: Theme, props: SelectStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const s = sizeMap[props.size];
  return {
    root: { display: "flex", flexDirection: "column" as const, gap: "0.25rem" },
    label: { fontSize: "var(--nui-font-size-sm)", fontWeight: 600, color: "var(--nui-color-text)", fontFamily: "var(--nui-font-family)" },
    description: { fontSize: "var(--nui-font-size-xs)", color: "var(--nui-color-text-dimmed)", fontFamily: "var(--nui-font-family)" },
    input: {
      width: "100%",
      height: s.height,
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
      appearance: "none" as const,
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.6 : 1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 0.75rem center",
      paddingRight: "2rem",
      transition: "border-color 150ms ease",
    },
    error: { fontSize: "var(--nui-font-size-xs)", color: theme.colors.red[isDark ? 4 : 6], fontFamily: "var(--nui-font-family)" },
  };
}
