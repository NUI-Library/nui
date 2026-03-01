import type { Theme, Size, RadiusSize, ThemeColorName } from "../../theme/types";
import type { StylesDefinition } from "../../styles/use-styles";

interface AvatarStyleProps { size: Size; radius: RadiusSize; color: ThemeColorName }

const sizeMap: Record<Size, string> = { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3.25rem", xl: "4rem" };
const fontMap: Record<Size, string> = { xs: "0.5rem", sm: "0.65rem", md: "0.85rem", lg: "1rem", xl: "1.3rem" };

export function avatarStyles(theme: Theme, props: AvatarStyleProps): StylesDefinition {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color];
  const dim = sizeMap[props.size];
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      borderRadius: `var(--nui-radius-${props.radius})`,
      overflow: "hidden",
      backgroundColor: scale[isDark ? 8 : 5],
      color: "#fff",
      fontWeight: 700,
      fontSize: fontMap[props.size],
      fontFamily: "var(--nui-font-family)",
      userSelect: "none" as const,
      flexShrink: 0,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
  };
}
