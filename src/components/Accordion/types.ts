import type { RadiusSize } from "../../theme/types";

export interface AccordionItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export type AccordionVariant = "default" | "contained" | "separated";

export interface AccordionProps {
  items: AccordionItem[];
  variant?: AccordionVariant;
  radius?: RadiusSize;
  multiple?: boolean;
  defaultValue?: string[];
}
