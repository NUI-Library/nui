import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  children?: React.ReactNode;
}
