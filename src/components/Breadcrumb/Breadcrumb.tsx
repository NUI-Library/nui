"use client";

import React from "react";
import type { BreadcrumbProps } from "./types";
import { breadcrumbStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Breadcrumb({ items, separator = "/" }: BreadcrumbProps) {
  const styles = useStyles({
    name: "Breadcrumb",
    stylesFn: breadcrumbStyles,
    props: {},
  });

  return (
    <nav aria-label="Breadcrumb" style={styles.root}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span style={{ ...styles.item, ...styles.itemActive }}>{item.label}</span>
            ) : item.href ? (
              <a href={item.href} style={styles.item}>{item.label}</a>
            ) : (
              <button
                onClick={item.onClick}
                style={{ ...styles.item, background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit" }}
              >
                {item.label}
              </button>
            )}
            {!isLast && <span style={styles.separator}>{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

Breadcrumb.displayName = "NUI.Breadcrumb";
