"use client";
import React from "react";
import type { Size } from "../../theme/types";

export interface KbdProps {
  size?: Size;
  children?: React.ReactNode;
}

const sizeMap: Record<Size, { fontSize: string; padding: string }> = {
  xs: { fontSize: "0.6rem", padding: "0.05rem 0.25rem" },
  sm: { fontSize: "0.7rem", padding: "0.1rem 0.3rem" },
  md: { fontSize: "0.75rem", padding: "0.15rem 0.4rem" },
  lg: { fontSize: "0.85rem", padding: "0.2rem 0.5rem" },
  xl: { fontSize: "0.95rem", padding: "0.25rem 0.6rem" },
};

export function Kbd({ size = "sm", children }: KbdProps) {
  const s = sizeMap[size];
  return (
    <kbd style={{
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--nui-font-family-monospace)",
      fontSize: s.fontSize,
      fontWeight: 600,
      padding: s.padding,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--nui-color-border)",
      borderRadius: "var(--nui-radius-sm)",
      backgroundColor: "var(--nui-color-surface-hover)",
      color: "var(--nui-color-text-dimmed)",
      lineHeight: 1.4,
      borderBottomWidth: "2px",
    }}>
      {children}
    </kbd>
  );
}
Kbd.displayName = "NUI.Kbd";
