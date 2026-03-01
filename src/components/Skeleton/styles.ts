import type { Theme, RadiusSize } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

interface SkeletonStyleProps {
  width?: string | number;
  height?: string | number;
  radius: RadiusSize;
  circle: boolean;
  animate: boolean;
}

export function skeletonStyles(_theme: Theme, props: SkeletonStyleProps): StylesDefinition {
  const { width, height, radius, circle, animate } = props;
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;

  return {
    root: {
      backgroundColor: "var(--nui-color-border)",
      borderRadius: circle ? "50%" : `var(--nui-radius-${radius})`,
      width: circle ? (w || h || "2rem") : (w || "100%"),
      height: circle ? (w || h || "2rem") : (h || "1rem"),
      overflow: "hidden",
      position: "relative" as const,
      ...(animate && {
        animation: "nui-skeleton-pulse 1.5s ease-in-out infinite",
      }),
    },
  };
}
