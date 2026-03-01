"use client";
import React from "react";
import type { AlertProps } from "./types";
import { alertStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Alert({ variant = "subtle", color = "blue", radius = "md", title, icon, withCloseButton, onClose, children }: AlertProps) {
  const styles = useStyles({ name: "Alert", stylesFn: alertStyles, props: { variant, color, radius }, variant: "variant", variantValue: variant });

  return (
    <div style={styles.root} role="alert">
      {icon && <div style={styles.icon}>{icon}</div>}
      <div style={styles.body}>
        {title && <div style={styles.title}>{title}</div>}
        <div style={styles.message}>{children}</div>
      </div>
      {withCloseButton && (
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}
Alert.displayName = "NUI.Alert";
