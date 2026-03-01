import type { RadiusSize } from "../../theme/types";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: RadiusSize;
  circle?: boolean;
  animate?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
}
