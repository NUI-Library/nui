import type { Size, RadiusSize } from "../../theme/types";

export type CardPadding = Size | "none";

export type CardShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  shadow?: CardShadow;
  radius?: RadiusSize;
  withBorder?: boolean;
}
