"use client";

import React from "react";
import type { SwitchProps } from "./types";
import { switchStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Switch({
  checked = false,
  onChange,
  label,
  size = "md",
  radius = "full",
  color = "primary",
  disabled = false,
}: SwitchProps) {
  const styles = useStyles({
    name: "Switch",
    stylesFn: switchStyles,
    props: { size, radius, color, checked, disabled },
  });

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label style={styles.root} onClick={handleClick}>
      <div style={styles.track} role="switch" aria-checked={checked} tabIndex={disabled ? -1 : 0} onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleClick(); } }}>
        <div style={styles.thumb} />
      </div>
      {label && <span style={styles.label}>{label}</span>}
    </label>
  );
}

Switch.displayName = "NUI.Switch";
