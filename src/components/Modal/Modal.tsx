"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./types";
import { modalStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

// ──────────────────────────────────────────────
// Modal Component
// ──────────────────────────────────────────────

export function Modal(props: ModalProps) {
  const {
    opened,
    onClose,
    title,
    size = "md",
    radius = "md",
    centered = true,
    closeOnEscape = true,
    closeOnClickOutside = true,
    withCloseButton = true,
    overlayOpacity = 0.5,
    overlayBlur = 0,
    children,
    zIndex = 200,
  } = props;

  const [mounted, setMounted] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mount/unmount with animation
  useEffect(() => {
    if (opened) {
      setMounted(true);
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(timer);
    }
  }, [opened]);

  // Escape key handler
  useEffect(() => {
    if (!opened || !closeOnEscape) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [opened, closeOnEscape, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!opened) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [opened]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnClickOutside && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnClickOutside, onClose]
  );

  const styles = useStyles({
    name: "Modal",
    stylesFn: modalStyles,
    props: {
      size,
      radius,
      centered,
      overlayOpacity,
      overlayBlur,
      zIndex,
      isAnimatingIn,
    },
  });

  if (!mounted) return null;

  const modalContent = (
    <div
      style={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "nui-modal-title" : undefined}
    >
      <div ref={contentRef} style={styles.content}>
        {(title || withCloseButton) && (
          <div style={styles.header}>
            {title && (
              <h2 id="nui-modal-title" style={styles.title}>
                {title}
              </h2>
            )}
            {withCloseButton && (
              <button
                type="button"
                onClick={onClose}
                style={styles.closeButton}
                aria-label="Close modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

Modal.displayName = "NUI.Modal";
