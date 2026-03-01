"use client";
import React, { useState } from "react";
import type { AccordionProps } from "./types";
import { accordionStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

export function Accordion({ items, variant = "default", radius = "md", multiple = false, defaultValue = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);
  const styles = useStyles({ name: "Accordion", stylesFn: accordionStyles, props: { variant, radius }, variant: "variant", variantValue: variant });

  const toggle = (value: string) => {
    setOpenItems(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : multiple ? [...prev, value] : [value]
    );
  };

  return (
    <div style={styles.root}>
      {items.map(item => {
        const isOpen = openItems.includes(item.value);
        return (
          <div key={item.value} style={styles.item}>
            <button style={styles.control} onClick={() => !item.disabled && toggle(item.value)} disabled={item.disabled} aria-expanded={isOpen}>
              <span>{item.label}</span>
              <span style={{ ...styles.chevron, ...(isOpen ? styles.chevronOpen : {}) }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </button>
            {isOpen && <div style={styles.panel}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
Accordion.displayName = "NUI.Accordion";
