import type { RadiusSize, ThemeColorName } from "../../theme/types";

export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

export interface ToastData {
  id: string;
  title?: string;
  message: string;
  color?: ThemeColorName;
  duration?: number;
  radius?: RadiusSize;
}

export interface ToastContainerProps {
  position?: ToastPosition;
  zIndex?: number;
}
