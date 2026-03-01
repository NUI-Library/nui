import type { Size } from "../../theme/types";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerLabelPosition = "left" | "center" | "right";

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: React.ReactNode;
  labelPosition?: DividerLabelPosition;
  size?: Size;
  color?: string;
}
