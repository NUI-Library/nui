"use client";
import React from "react";
import type { GroupProps } from "./types";

const gapMap: Record<string, string> = { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" };

export function Group({ gap = "md", align = "center", justify = "flex-start", wrap = "wrap", grow = false, children }: GroupProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      gap: gapMap[gap] || gap,
      ...(grow ? { "& > *": { flex: 1 } } as unknown as React.CSSProperties : {}),
    }}>
      {children}
    </div>
  );
}
Group.displayName = "NUI.Group";
