"use client";
import React, { useState } from "react";
import type { TooltipProps } from "./types";
import { tooltipStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Tooltip({ label, position = "top", disabled = false, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const styles = useStyles({ name: "Tooltip", stylesFn: tooltipStyles, props: { position } });

  if (disabled) return <>{children}</>;

  return (
    <span style={styles.wrapper} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>
      {children}
      {visible && <span style={styles.tooltip} role="tooltip">{label}</span>}
    </span>
  );
}
Tooltip.displayName = "NUI.Tooltip";
