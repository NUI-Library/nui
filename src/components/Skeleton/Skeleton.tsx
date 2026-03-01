"use client";

import React from "react";
import type { SkeletonProps } from "./types";
import { skeletonStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Skeleton({
  width,
  height,
  radius = "md",
  circle = false,
  animate = true,
  visible = true,
  children,
}: SkeletonProps) {
  const styles = useStyles({
    name: "Skeleton",
    stylesFn: skeletonStyles,
    props: { width, height, radius, circle, animate },
  });

  if (!visible && children) {
    return <>{children}</>;
  }

  if (children) {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ visibility: visible ? "hidden" : "visible" }}>{children}</div>
        {visible && (
          <div
            style={{
              ...styles.root,
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
    );
  }

  return <div style={styles.root} />;
}

Skeleton.displayName = "NUI.Skeleton";
