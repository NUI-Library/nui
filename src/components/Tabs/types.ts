import type { Size, RadiusSize, ThemeColorName } from "../../theme/types";

export type TabsVariant = "default" | "outline" | "pills";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  items: TabItem[];
  variant?: TabsVariant;
  size?: Size;
  radius?: RadiusSize;
  color?: ThemeColorName;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export interface TabsPanelProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}
