import type { ElementType } from "react";
import type { PolymorphicComponentProp } from "../../utils/polymorphic";
import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";

export type ButtonVariant = "filled" | "outline" | "subtle";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export type ButtonProps<C extends ElementType = "button"> =
  PolymorphicComponentProp<C, ButtonBaseProps>;
