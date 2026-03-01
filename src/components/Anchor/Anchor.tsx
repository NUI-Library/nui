"use client";
import React from "react";
import type { Size, ThemeColorName } from "../../theme/types";

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: Size;
  color?: ThemeColorName;
  underline?: "always" | "hover" | "never";
}

const sizeMap: Record<Size, string> = { xs: "var(--nui-font-size-xs)", sm: "var(--nui-font-size-sm)", md: "var(--nui-font-size-md)", lg: "var(--nui-font-size-lg)", xl: "var(--nui-font-size-xl)" };

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor({ size = "md", color = "primary", underline = "hover", children, style, ...rest }, ref) {
    return (
      <a ref={ref} style={{
        fontSize: sizeMap[size],
        fontFamily: "var(--nui-font-family)",
        color: `var(--nui-color-${color}-6)`,
        textDecoration: underline === "always" ? "underline" : "none",
        cursor: "pointer",
        ...style,
      }} {...rest}>
        {children}
      </a>
    );
  }
);
Anchor.displayName = "NUI.Anchor";
