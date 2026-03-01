"use client";
import React from "react";
import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";
import { useStyles } from "../../styles/use-styles";

export interface ChipProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  variant?: "filled" | "outline";
  children?: React.ReactNode;
  disabled?: boolean;
}

function chipStyles(theme: Record<string, any>, props: { size: string; radius: string; color: string; checked: boolean; variant: string; disabled: boolean }) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color] || theme.colors.primary;
  const sizeMap: Record<string, { height: string; padding: string; fontSize: string }> = {
    xs: { height: "1.5rem", padding: "0 0.5rem", fontSize: "var(--nui-font-size-xs)" },
    sm: { height: "1.75rem", padding: "0 0.625rem", fontSize: "var(--nui-font-size-xs)" },
    md: { height: "2rem", padding: "0 0.75rem", fontSize: "var(--nui-font-size-sm)" },
    lg: { height: "2.375rem", padding: "0 1rem", fontSize: "var(--nui-font-size-sm)" },
    xl: { height: "2.75rem", padding: "0 1.25rem", fontSize: "var(--nui-font-size-md)" },
  };
  const s = sizeMap[props.size] || sizeMap.md;
  const isChecked = props.checked;
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: 500,
      fontFamily: "var(--nui-font-family)",
      borderRadius: `var(--nui-radius-${props.radius})`,
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.6 : 1,
      transition: "background 150ms, border-color 150ms, color 150ms",
      border: `1px solid ${isChecked ? scale[isDark ? 5 : 6] : "var(--nui-color-border)"}`,
      backgroundColor: isChecked ? (props.variant === "filled" ? scale[isDark ? 8 : 6] : `${scale[isDark ? 9 : 0]}`) : "transparent",
      color: isChecked ? (props.variant === "filled" ? "#fff" : scale[isDark ? 4 : 7]) : "var(--nui-color-text-dimmed)",
      userSelect: "none" as const,
    },
    check: {
      width: "0.75em",
      height: "0.75em",
      display: isChecked ? "block" : "none",
    },
  };
}

export function Chip({ checked = false, onChange, size = "md", radius = "xl", color = "primary", variant = "outline", disabled, children }: ChipProps) {
  const styles = useStyles({ name: "Chip", stylesFn: chipStyles as any, props: { size, radius, color, checked, variant, disabled: !!disabled } });
  return (
    <button style={styles.root} onClick={() => !disabled && onChange?.(!checked)} disabled={disabled} role="checkbox" aria-checked={checked}>
      {checked && (
        <svg style={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      )}
      {children}
    </button>
  );
}
Chip.displayName = "NUI.Chip";
