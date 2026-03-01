import type { Size } from "../../theme/types";

export interface GroupProps {
  gap?: Size | string;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: React.CSSProperties["flexWrap"];
  grow?: boolean;
  children?: React.ReactNode;
}
