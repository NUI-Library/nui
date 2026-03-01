"use client";
import React from "react";
import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";
import { useStyles } from "../../styles/use-styles";

export type ActionIconVariant = "filled" | "outline" | "subtle";

export interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionIconVariant;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  loading?: boolean;
}

const sizeMap: Record<Size, string> = { xs: "1.5rem", sm: "1.75rem", md: "2.125rem", lg: "2.5rem", xl: "3rem" };

function actionIconStyles(theme: Record<string, any>, props: { variant: string; size: string; radius: string; color: string; disabled: boolean }) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color] || theme.colors.primary;
  const dim = sizeMap[props.size as Size] || "2.125rem";
  const v = props.variant;
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      borderRadius: `var(--nui-radius-${props.radius})`,
      border: v === "outline" ? `1px solid ${scale[isDark ? 4 : 6]}` : "1px solid transparent",
      backgroundColor: v === "filled" ? scale[isDark ? 8 : 6] : "transparent",
      color: v === "filled" ? "#fff" : scale[isDark ? 4 : 6],
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.6 : 1,
      transition: "background 150ms, color 150ms",
      padding: 0,
      fontFamily: "var(--nui-font-family)",
    },
  };
}

export const ActionIcon = React.forwardRef<HTMLButtonElement, ActionIconProps>(
  function ActionIcon({ variant = "subtle", size = "md", radius = "md", color = "primary", disabled, children, ...rest }, ref) {
    const styles = useStyles({ name: "ActionIcon", stylesFn: actionIconStyles as any, props: { variant, size, radius, color, disabled: !!disabled } });
    return (
      <button ref={ref} style={styles.root} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
);
ActionIcon.displayName = "NUI.ActionIcon";
