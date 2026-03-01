"use client";

import React from "react";
import type { DividerProps } from "./types";
import { dividerStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Divider({
  orientation = "horizontal",
  label,
  labelPosition = "center",
  size = "xs",
  color,
}: DividerProps) {
  const styles = useStyles({
    name: "Divider",
    stylesFn: dividerStyles,
    props: { orientation, labelPosition, size, color },
  });

  if (orientation === "vertical") {
    return <div style={styles.root} role="separator" aria-orientation="vertical" />;
  }

  if (!label) {
    return <div style={styles.line} role="separator" />;
  }

  return (
    <div style={styles.root} role="separator">
      {labelPosition !== "left" && <div style={styles.line} />}
      <span style={styles.label}>{label}</span>
      {labelPosition !== "right" && <div style={styles.line} />}
    </div>
  );
}

Divider.displayName = "NUI.Divider";
