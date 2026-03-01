"use client";
import React from "react";
import type { TextAreaProps } from "./types";
import { textAreaStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, description, error, size = "md", radius = "md", disabled, rows = 4, ...rest }, ref) {
    const styles = useStyles({ name: "TextArea", stylesFn: textAreaStyles, props: { size, radius, error: !!error, disabled: !!disabled } });

    return (
      <div style={styles.root}>
        {label && <label style={styles.label}>{label}</label>}
        {description && <p style={styles.description}>{description}</p>}
        <textarea ref={ref} style={styles.input} disabled={disabled} rows={rows} {...rest} />
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = "NUI.TextArea";
