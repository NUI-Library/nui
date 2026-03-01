"use client";
import React from "react";
import type { ProgressProps } from "./types";
import { progressStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Progress({ value, size = "md", radius = "xl", color = "primary", striped = false, animated = false, label }: ProgressProps) {
  const styles = useStyles({ name: "Progress", stylesFn: progressStyles, props: { size, radius, color, value, striped, animated } });

  return (
    <div style={styles.root} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div style={styles.bar} />
      {label && <div style={styles.label}>{label}</div>}
    </div>
  );
}
Progress.displayName = "NUI.Progress";
