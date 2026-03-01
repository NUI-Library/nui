import type { Size, RadiusSize } from "../../theme/types";

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  description?: string;
  error?: string;
  size?: Size;
  radius?: RadiusSize;
  minRows?: number;
  maxRows?: number;
  autosize?: boolean;
}
