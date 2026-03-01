"use client";
import React from "react";
import type { Size, ThemeColorName } from "../../theme/types";

export interface TextProps {
  size?: Size;
  color?: ThemeColorName | "dimmed" | "inherit";
  weight?: number;
  align?: React.CSSProperties["textAlign"];
  lineClamp?: number;
  truncate?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
}

const sizeMap: Record<Size, string> = { xs: "var(--nui-font-size-xs)", sm: "var(--nui-font-size-sm)", md: "var(--nui-font-size-md)", lg: "var(--nui-font-size-lg)", xl: "var(--nui-font-size-xl)" };

export function Text({ size = "md", color, weight, align, lineClamp, truncate, inline, children }: TextProps) {
  const colorVal = color === "dimmed" ? "var(--nui-color-text-dimmed)" : color === "inherit" ? "inherit" : color ? `var(--nui-color-${color}-6)` : "var(--nui-color-text)";
  const Tag = inline ? "span" : "p";
  const style: React.CSSProperties = {
    fontSize: sizeMap[size],
    fontFamily: "var(--nui-font-family)",
    color: colorVal,
    fontWeight: weight,
    textAlign: align,
    margin: 0,
    lineHeight: 1.55,
    ...(truncate ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } : {}),
    ...(lineClamp ? { display: "-webkit-box", WebkitLineClamp: lineClamp, WebkitBoxOrient: "vertical" as const, overflow: "hidden" } : {}),
  };
  return <Tag style={style}>{children}</Tag>;
}
Text.displayName = "NUI.Text";
