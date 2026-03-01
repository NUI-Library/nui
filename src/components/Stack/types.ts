import type { Size } from "../../theme/types";

export interface StackProps {
  gap?: Size | string;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children?: React.ReactNode;
}
