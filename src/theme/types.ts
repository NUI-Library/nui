export type ColorScheme = "light" | "dark";

export type RadiusSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type ColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ColorScale = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  gray: ColorScale;
  red: ColorScale;
  green: ColorScale;
  blue: ColorScale;
  yellow: ColorScale;
  cyan: ColorScale;
  violet: ColorScale;
}

export type ThemeColorName = keyof ThemeColors;

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface RadiusScale {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface TypographyScale {
  xs: { fontSize: string; lineHeight: string };
  sm: { fontSize: string; lineHeight: string };
  md: { fontSize: string; lineHeight: string };
  lg: { fontSize: string; lineHeight: string };
  xl: { fontSize: string; lineHeight: string };
}

export interface ShadowScale {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ComponentStyleOverride {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  inner?: React.CSSProperties;
  input?: React.CSSProperties;
  overlay?: React.CSSProperties;
  body?: React.CSSProperties;
  header?: React.CSSProperties;
  content?: React.CSSProperties;
}

export interface ComponentOverride<P = Record<string, unknown>> {
  defaultProps?: Partial<P>;
  styles?: ComponentStyleOverride;
  variants?: Record<string, Record<string, ComponentStyleOverride>>;
}

export interface ComponentOverrides {
  Button?: ComponentOverride;
  Input?: ComponentOverride;
  Card?: ComponentOverride;
  Modal?: ComponentOverride;
  Badge?: ComponentOverride;
  Tabs?: ComponentOverride;
  Breadcrumb?: ComponentOverride;
  Divider?: ComponentOverride;
  Skeleton?: ComponentOverride;
  Switch?: ComponentOverride;
  Toast?: ComponentOverride;
  ToastContainer?: ComponentOverride;
  Avatar?: ComponentOverride;
  Tooltip?: ComponentOverride;
  Progress?: ComponentOverride;
  Alert?: ComponentOverride;
  TextArea?: ComponentOverride;
  Select?: ComponentOverride;
  Accordion?: ComponentOverride;
  ActionIcon?: ComponentOverride;
  Group?: ComponentOverride;
  Stack?: ComponentOverride;
  Text?: ComponentOverride;
  Title?: ComponentOverride;
  Anchor?: ComponentOverride;
  Kbd?: ComponentOverride;
  Loader?: ComponentOverride;
  Chip?: ComponentOverride;
}

export interface Theme {
  colorScheme: ColorScheme;
  primaryColor: ThemeColorName;
  colors: ThemeColors;
  spacing: SpacingScale;
  radius: RadiusScale;
  typography: TypographyScale;
  shadows: ShadowScale;
  fontFamily: string;
  fontFamilyMonospace: string;
  components: ComponentOverrides;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PartialTheme = DeepPartial<Theme>;
