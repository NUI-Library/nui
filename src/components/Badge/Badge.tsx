"use client";

import React from "react";
import type { BadgeProps } from "./types";
import { badgeStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    { variant = "filled", size = "md", radius = "xl", color = "primary", children, ...rest },
    ref
  ) {
    const styles = useStyles({
      name: "Badge",
      stylesFn: badgeStyles,
      props: { variant, size, radius, color },
      variant: "variant",
      variantValue: variant,
    });

    return (
      <span ref={ref} style={styles.root} {...rest}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "NUI.Badge";
