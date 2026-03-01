import type { Theme, Size } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";
import type { DividerOrientation, DividerLabelPosition } from "./types";

interface DividerStyleProps {
  orientation: DividerOrientation;
  labelPosition: DividerLabelPosition;
  size: Size;
  color?: string;
}

const thicknessMap: Record<Size, string> = {
  xs: "1px", sm: "1px", md: "2px", lg: "3px", xl: "4px",
};

export function dividerStyles(_theme: Theme, props: DividerStyleProps): StylesDefinition {
  const { orientation, labelPosition, size, color } = props;
  const borderColor = color || "var(--nui-color-border)";
  const thickness = thicknessMap[size];

  return {
    root: {
      display: "flex",
      alignItems: "center",
      ...(orientation === "vertical" && {
        flexDirection: "column" as const,
        alignSelf: "stretch",
        width: thickness,
        minHeight: "1rem",
        backgroundColor: borderColor,
      }),
      ...(orientation === "horizontal" && {
        width: "100%",
        gap: "0.75rem",
      }),
    },
    line: {
      flex: 1,
      height: orientation === "horizontal" ? thickness : "100%",
      width: orientation === "vertical" ? thickness : "auto",
      backgroundColor: borderColor,
      borderRadius: "999px",
    },
    label: {
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-xs)",
      fontWeight: 500,
      color: "var(--nui-color-text-dimmed)",
      whiteSpace: "nowrap" as const,
      ...(labelPosition === "left" && { order: -1 }),
      ...(labelPosition === "right" && { order: 1 }),
    },
  };
}
