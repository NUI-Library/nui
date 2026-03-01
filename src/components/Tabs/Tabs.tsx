"use client";

import React from "react";
import type { TabsProps, TabsPanelProps } from "./types";
import { tabsStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Tabs({
  value,
  onChange,
  items,
  variant = "default",
  size = "md",
  radius = "md",
  color = "primary",
  fullWidth = false,
  children,
}: TabsProps) {
  const styles = useStyles({
    name: "Tabs",
    stylesFn: tabsStyles,
    props: { variant, size, radius, color, fullWidth },
    variant: "variant",
    variantValue: variant,
  });

  return (
    <div style={styles.root}>
      <div style={styles.list} role="tablist">
        {items.map((item) => {
          const isActive = item.value === value;
          const isDisabled = item.disabled;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isActive}
              disabled={isDisabled}
              style={{
                ...styles.tab,
                ...(isActive ? styles.tabActive : {}),
                ...(isDisabled ? styles.tabDisabled : {}),
              }}
              onClick={() => !isDisabled && onChange(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}

export function TabsPanel({ value, activeValue, children }: TabsPanelProps) {
  if (value !== activeValue) return null;
  return (
    <div role="tabpanel" style={{ padding: "1rem 0" }}>
      {children}
    </div>
  );
}

Tabs.displayName = "NUI.Tabs";
TabsPanel.displayName = "NUI.TabsPanel";
