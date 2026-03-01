"use client";

import React, { useState, useCallback, useEffect, createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import type { ToastData, ToastContainerProps } from "./types";
import { toastContainerStyles, toastStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

// ─── Toast Context ─────────────────────────────

interface ToastContextValue {
  show: (toast: Omit<ToastData, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

// ─── Single Toast ──────────────────────────────

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) {
  const styles = useStyles({
    name: "Toast",
    stylesFn: toastStyles,
    props: { position: "top-right", color: data.color || "primary", radius: data.radius || "md" },
  });

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(data.id), data.duration || 4000);
    return () => clearTimeout(timer);
  }, [data.id, data.duration, onDismiss]);

  return (
    <div style={styles.root}>
      <div style={styles.indicator} />
      <div style={styles.content}>
        {data.title && <div style={styles.title}>{data.title}</div>}
        <div style={styles.message}>{data.message}</div>
      </div>
      <button style={styles.closeBtn} onClick={() => onDismiss(data.id)} aria-label="Dismiss">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

// ─── Toast Provider ────────────────────────────

export function ToastProvider({
  children,
  position = "top-right",
  zIndex = 9999,
}: ToastContainerProps & { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [mounted, setMounted] = useState(false);
  const idCounter = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  const show = useCallback((toast: Omit<ToastData, "id">) => {
    const id = `nui-toast-${++idCounter.current}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const containerStyles = useStyles({
    name: "ToastContainer",
    stylesFn: toastContainerStyles,
    props: { position },
  });

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {mounted && createPortal(
        <div style={{ ...containerStyles.root, zIndex }}>
          {toasts.map((t) => (
            <ToastItem key={t.id} data={t} onDismiss={dismiss} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = "NUI.ToastProvider";
