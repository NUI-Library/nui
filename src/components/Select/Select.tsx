"use client";
import React from "react";
import type { SelectProps } from "./types";
import { selectStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ value, onChange, options, label, description, error, placeholder, size = "md", radius = "md", disabled }, ref) {
    const styles = useStyles({ name: "Select", stylesFn: selectStyles, props: { size, radius, error: !!error, disabled: !!disabled } });

    return (
      <div style={styles.root}>
        {label && <label style={styles.label}>{label}</label>}
        {description && <p style={styles.description}>{description}</p>}
        <select
          ref={ref}
          style={styles.input}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
          ))}
        </select>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
  }
);
Select.displayName = "NUI.Select";
