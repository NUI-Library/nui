import type { Theme, Size, RadiusSize, ThemeColorName } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

interface ProgressStyleProps { size: Size; radius: RadiusSize; color: ThemeColorName; value: number; striped: boolean; animated: boolean }

const heightMap: Record<Size, string> = { xs: "4px", sm: "6px", md: "10px", lg: "14px", xl: "20px" };

export function progressStyles(theme: Theme, props: ProgressStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color];
  const h = heightMap[props.size];
  const bgImage = props.striped ? "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)" : "none";
  return {
    root: {
      width: "100%",
      height: h,
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
      borderRadius: `var(--nui-radius-${props.radius})`,
      overflow: "hidden",
      position: "relative" as const,
    },
    bar: {
      height: "100%",
      width: `${Math.min(100, Math.max(0, props.value))}%`,
      backgroundColor: scale[isDark ? 5 : 6],
      borderRadius: `var(--nui-radius-${props.radius})`,
      transition: "width 300ms ease",
      backgroundImage: bgImage,
      backgroundSize: props.striped ? "1rem 1rem" : "auto",
      animation: props.animated ? "nui-progress-stripes 1s linear infinite" : "none",
    },
    label: {
      position: "absolute" as const,
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.6rem",
      fontWeight: 700,
      color: "#fff",
      fontFamily: "var(--nui-font-family)",
    },
  };
}
