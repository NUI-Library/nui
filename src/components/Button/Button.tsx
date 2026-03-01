"use client";

import React, { type ElementType, type MouseEvent } from "react";
import type { ButtonProps } from "./types";
import { buttonStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Spinner (internal)
// ──────────────────────────────────────────────

function Spinner({ size }: { size: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "nui-spin 0.6s linear infinite" }}
    >
      <style>{`@keyframes nui-spin { to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        opacity={0.7}
      />
    </svg>
  );
}

// ──────────────────────────────────────────────
// Button Component
// ──────────────────────────────────────────────

function ButtonInner<C extends ElementType = "button">(
  props: ButtonProps<C>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    as,
    variant = "filled",
    size = "md",
    radius = "md",
    color = "primary",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...rest
  } = props;

  const Component = as || "button";

  const styles = useStyles({
    name: "Button",
    stylesFn: buttonStyles,
    props: { variant, size, radius, color, loading, disabled, fullWidth },
    variant: "variant",
    variantValue: variant,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const spinnerSize = size === "xs" || size === "sm" ? "14" : "18";

  return (
    <Component
      ref={ref}
      style={styles.root}
      disabled={disabled || loading}
      onClick={handleClick}
      role="button"
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <span style={styles.loader}>
          <Spinner size={spinnerSize} />
        </span>
      )}
      <span style={styles.inner}>
        {leftIcon && <span style={{ display: "flex" }}>{leftIcon}</span>}
        {children}
        {rightIcon && <span style={{ display: "flex" }}>{rightIcon}</span>}
      </span>
    </Component>
  );
}

export const Button = React.forwardRef(ButtonInner) as <
  C extends ElementType = "button"
>(
  props: ButtonProps<C> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => React.ReactElement | null;

(Button as React.FC).displayName = "NUI.Button";
