import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  disabled?: boolean;
}
