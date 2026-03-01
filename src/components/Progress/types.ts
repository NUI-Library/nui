import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";

export interface ProgressProps {
  value: number;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  striped?: boolean;
  animated?: boolean;
  label?: string;
}
