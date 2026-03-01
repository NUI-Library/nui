import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";

export type BadgeVariant = "filled" | "outline" | "subtle";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
}
