"use client";

import React from "react";
import type { CardProps } from "./types";
import { cardStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Card Component
// ──────────────────────────────────────────────

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(props, ref) {
    const {
      padding = "md",
      shadow = "sm",
      radius = "md",
      withBorder = true,
      children,
      style: userStyle,
      ...rest
    } = props;

    const styles = useStyles({
      name: "Card",
      stylesFn: cardStyles,
      props: { padding, shadow, radius, withBorder },
    });

    return (
      <div ref={ref} style={{ ...styles.root, ...userStyle }} {...rest}>
        {children}
      </div>
    );
  }
);

Card.displayName = "NUI.Card";
