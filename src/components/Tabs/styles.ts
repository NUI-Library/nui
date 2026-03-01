import type { Theme, Size, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";
import type { TabsVariant } from "./types";

interface TabsStyleProps {
  variant: TabsVariant;
  size: Size;
  radius: RadiusSize;
  color: string;
  fullWidth: boolean;
}

const sizeMap: Record<Size, { fontSize: string; padding: string }> = {
  xs: { fontSize: "var(--nui-font-size-xs)", padding: "0.35rem 0.75rem" },
  sm: { fontSize: "var(--nui-font-size-sm)", padding: "0.4rem 0.875rem" },
  md: { fontSize: "var(--nui-font-size-sm)", padding: "0.5rem 1rem" },
  lg: { fontSize: "var(--nui-font-size-md)", padding: "0.55rem 1.25rem" },
  xl: { fontSize: "var(--nui-font-size-md)", padding: "0.625rem 1.5rem" },
};

export function tabsStyles(theme: Theme, props: TabsStyleProps): StylesDefinition {
  const { variant, size, fullWidth } = props;
  const sc = sizeMap[size];

  return {
    root: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0",
    },
    list: {
      display: "flex",
      gap: variant === "pills" ? "0.375rem" : "0",
      ...(fullWidth && { width: "100%" }),
      ...(variant === "default" && {
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: "var(--nui-color-border)",
      }),
      ...(variant === "outline" && {
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "var(--nui-color-border)",
      }),
    },
    tab: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontFamily: "var(--nui-font-family)",
      fontSize: sc.fontSize,
      fontWeight: 500,
      padding: sc.padding,
      border: "none",
      background: "transparent",
      color: "var(--nui-color-text-dimmed)",
      transition: "color 150ms ease, background 150ms ease, border-color 150ms ease",
      ...(fullWidth && { flex: 1 }),
      ...(variant === "pills" && {
        borderRadius: `var(--nui-radius-${props.radius})`,
      }),
      ...(variant === "default" && {
        marginBottom: "-2px",
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: "transparent",
      }),
      ...(variant === "outline" && {
        marginBottom: "-1px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        borderBottomColor: "transparent",
        borderTopLeftRadius: `var(--nui-radius-${props.radius})`,
        borderTopRightRadius: `var(--nui-radius-${props.radius})`,
      }),
    },
    tabActive: {
      color: "var(--nui-color-primary-filled)",
      fontWeight: 600,
      ...(variant === "default" && {
        borderBottomColor: "var(--nui-color-primary-filled)",
      }),
      ...(variant === "outline" && {
        borderColor: "var(--nui-color-border)",
        borderBottomColor: "var(--nui-color-body, #fff)",
        background: "var(--nui-color-surface)",
      }),
      ...(variant === "pills" && {
        backgroundColor: "var(--nui-color-primary-light)",
        color: "var(--nui-color-primary-filled)",
      }),
    },
    tabDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    panel: {
      padding: "1rem 0",
    },
  };
}
