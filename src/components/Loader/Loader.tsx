"use client";
import React from "react";
import type { Size, ThemeColorName } from "../../theme/types";

export interface LoaderProps {
  size?: Size;
  color?: ThemeColorName;
}

const sizeMap: Record<Size, string> = { xs: "16px", sm: "20px", md: "28px", lg: "36px", xl: "48px" };

export function Loader({ size = "md", color = "primary" }: LoaderProps) {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" style={{ animation: "nui-spin 1s linear infinite" }}>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="3">
          <circle strokeOpacity=".25" cx="18" cy="18" r="18" stroke={`var(--nui-color-${color}-6)`} />
          <path d="M36 18c0-9.94-8.06-18-18-18" stroke={`var(--nui-color-${color}-6)`} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
Loader.displayName = "NUI.Loader";
