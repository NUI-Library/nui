"use client";

import { useContext } from "react";
import { UIContext } from "../core/context";
import type { UIContextValue } from "../core/context";

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UI Provider created by createUI()");
  }
  return context;
}
