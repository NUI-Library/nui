import type { Size, RadiusSize } from "../../theme/types";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  description?: string;
  size?: Size;
  radius?: RadiusSize;
  required?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}
