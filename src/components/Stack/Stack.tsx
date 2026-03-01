"use client";
import React from "react";
import type { StackProps } from "./types";

const gapMap: Record<string, string> = { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" };

export function Stack({ gap = "md", align = "stretch", justify = "flex-start", children }: StackProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align, justifyContent: justify, gap: gapMap[gap] || gap }}>
      {children}
    </div>
  );
}
Stack.displayName = "NUI.Stack";
