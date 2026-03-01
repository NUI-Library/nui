export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  label: React.ReactNode;
  position?: TooltipPosition;
  color?: string;
  withArrow?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
}
