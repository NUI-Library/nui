import type { Size, RadiusSize } from "../../theme/types";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  size?: Size;
  radius?: RadiusSize;
  disabled?: boolean;
}
