"use client";
import React from "react";

export interface TitleProps {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: React.CSSProperties["textAlign"];
  children?: React.ReactNode;
}

const sizeMap: Record<number, string> = { 1: "2rem", 2: "1.5rem", 3: "1.25rem", 4: "1.1rem", 5: "1rem", 6: "0.875rem" };
const weightMap: Record<number, number> = { 1: 800, 2: 700, 3: 700, 4: 600, 5: 600, 6: 600 };

export function Title({ order = 1, align, children }: TitleProps) {
  const Tag = `h${order}` as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, {
    style: {
      fontSize: sizeMap[order],
      fontWeight: weightMap[order],
      fontFamily: "var(--nui-font-family)",
      color: "var(--nui-color-text)",
      lineHeight: 1.25,
      margin: 0,
      letterSpacing: "-0.02em",
      textAlign: align,
    },
  }, children);
}
Title.displayName = "NUI.Title";
