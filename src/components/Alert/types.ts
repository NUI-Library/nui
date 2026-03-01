import type { RadiusSize, ThemeColorName } from "../../theme/types";

export type AlertVariant = "filled" | "outline" | "subtle";

export interface AlertProps {
  variant?: AlertVariant;
  color?: ThemeColorName;
  radius?: RadiusSize;
  title?: string;
  icon?: React.ReactNode;
  withCloseButton?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
