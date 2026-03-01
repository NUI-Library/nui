import type { Size, RadiusSize } from "../../theme/types";

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  size?: Size | string;
  radius?: RadiusSize;
  centered?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  withCloseButton?: boolean;
  overlayOpacity?: number;
  overlayBlur?: number;
  children?: React.ReactNode;
  zIndex?: number;
}
