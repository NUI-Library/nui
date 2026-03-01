"use client";

import React, { useState, useId } from "react";
import type { InputProps } from "./types";
import { inputStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Input Component
// ──────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      label,
      error,
      description,
      size = "md",
      radius = "md",
      required,
      leftSection,
      rightSection,
      id: providedId,
      onFocus,
      onBlur,
      style: _style,
      ...rest
    } = props;

    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;
    const descriptionId = `${inputId}-description`;

    const [focused, setFocused] = useState(false);

    const styles = useStyles({
      name: "Input",
      stylesFn: inputStyles,
      props: {
        size,
        radius,
        error: !!error,
        hasLeftSection: !!leftSection,
        hasRightSection: !!rightSection,
      },
    });

    const focusRingStyle: React.CSSProperties = focused
      ? {
          borderColor: error
            ? undefined
            : "var(--nui-color-primary-filled)",
          boxShadow: `0 0 0 2px ${
            error
              ? "var(--nui-color-red-2, rgba(255,0,0,0.2))"
              : "var(--nui-color-primary-light)"
          }`,
        }
      : {};

    return (
      <div style={styles.root}>
        {label && (
          <label htmlFor={inputId} style={styles.label}>
            {label}
            {required && (
              <span style={{ color: "var(--nui-color-red-6, #fa5252)", marginLeft: "0.25rem" }}>
                *
              </span>
            )}
          </label>
        )}
        {description && (
          <p id={descriptionId} style={styles.description}>
            {description}
          </p>
        )}
        <div style={styles.inputWrapper}>
          {leftSection && <div style={styles.leftSection}>{leftSection}</div>}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [error && errorId, description && descriptionId]
                .filter(Boolean)
                .join(" ") || undefined
            }
            required={required}
            style={{ ...styles.input, ...focusRingStyle }}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...rest}
          />
          {rightSection && (
            <div style={styles.rightSection}>{rightSection}</div>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" style={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "NUI.Input";
