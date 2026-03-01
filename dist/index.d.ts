import * as React$1 from 'react';
import React__default, { ElementType, PropsWithChildren, ComponentPropsWithoutRef, CSSProperties, ReactNode, ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ColorScheme = "light" | "dark";
type RadiusSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type ColorScale = readonly [
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
interface ThemeColors {
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
type ThemeColorName = keyof ThemeColors;
interface SpacingScale {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
interface RadiusScale {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
}
interface TypographyScale {
    xs: {
        fontSize: string;
        lineHeight: string;
    };
    sm: {
        fontSize: string;
        lineHeight: string;
    };
    md: {
        fontSize: string;
        lineHeight: string;
    };
    lg: {
        fontSize: string;
        lineHeight: string;
    };
    xl: {
        fontSize: string;
        lineHeight: string;
    };
}
interface ShadowScale {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
interface ComponentStyleOverride {
    root?: React.CSSProperties;
    label?: React.CSSProperties;
    inner?: React.CSSProperties;
    input?: React.CSSProperties;
    overlay?: React.CSSProperties;
    body?: React.CSSProperties;
    header?: React.CSSProperties;
    content?: React.CSSProperties;
}
interface ComponentOverride<P = Record<string, unknown>> {
    defaultProps?: Partial<P>;
    styles?: ComponentStyleOverride;
    variants?: Record<string, Record<string, ComponentStyleOverride>>;
}
interface ComponentOverrides {
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
interface Theme {
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
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type PartialTheme = DeepPartial<Theme>;

interface CreateUIConfig {
    theme?: PartialTheme;
}
interface UIInstance {
    Provider: React__default.FC<{
        children: React__default.ReactNode;
    }>;
    theme: Theme;
}
declare function createUI(config?: CreateUIConfig): UIInstance;

interface UIContextValue {
    theme: Theme;
    setColorScheme: (scheme: ColorScheme) => void;
    toggleColorScheme: () => void;
    colorScheme: ColorScheme;
}
declare const UIContext: React$1.Context<UIContextValue>;

declare const defaultTheme: Theme;

declare const defaultColors: ThemeColors;

declare function useUI(): UIContextValue;

interface UseColorSchemeReturn {
    colorScheme: ColorScheme;
    setColorScheme: (scheme: ColorScheme) => void;
    toggleColorScheme: () => void;
    isDark: boolean;
}
declare function useColorScheme(): UseColorSchemeReturn;

type StylesDefinition = Record<string, React.CSSProperties>;
type StylesFn<P = Record<string, unknown>> = (theme: Theme, props: P) => StylesDefinition;
interface UseStylesParams<P = Record<string, unknown>> {
    name: string;
    stylesFn: StylesFn<P>;
    props: P;
    variant?: string;
    variantValue?: string;
}
declare function useStyles<P = Record<string, unknown>>({ name, stylesFn, props, variant, variantValue, }: UseStylesParams<P>): StylesDefinition;

type AsProp<C extends ElementType> = {
    as?: C;
};
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<C extends ElementType, Props = Record<string, never>> = PropsWithChildren<Props & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type ButtonVariant = "filled" | "outline" | "subtle";
interface ButtonBaseProps {
    variant?: ButtonVariant;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
type ButtonProps<C extends ElementType = "button"> = PolymorphicComponentProp<C, ButtonBaseProps>;

declare const Button: <C extends ElementType = "button">(props: ButtonProps<C> & {
    ref?: React__default.ForwardedRef<HTMLButtonElement>;
}) => React__default.ReactElement | null;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    error?: string;
    description?: string;
    size?: Size;
    radius?: RadiusSize;
    required?: boolean;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
}

declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.RefAttributes<HTMLInputElement>>;

type CardPadding = Size | "none";
type CardShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: CardPadding;
    shadow?: CardShadow;
    radius?: RadiusSize;
    withBorder?: boolean;
}

declare const Card: React__default.ForwardRefExoticComponent<CardProps & React__default.RefAttributes<HTMLDivElement>>;

interface ModalProps {
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

declare function Modal(props: ModalProps): React__default.ReactPortal | null;
declare namespace Modal {
    var displayName: string;
}

type BadgeVariant = "filled" | "outline" | "subtle";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
}

declare const Badge: React__default.ForwardRefExoticComponent<BadgeProps & React__default.RefAttributes<HTMLSpanElement>>;

type TabsVariant = "default" | "outline" | "pills";
interface TabItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface TabsProps {
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
interface TabsPanelProps {
    value: string;
    activeValue: string;
    children: React.ReactNode;
}

declare function Tabs({ value, onChange, items, variant, size, radius, color, fullWidth, children, }: TabsProps): react_jsx_runtime.JSX.Element;
declare namespace Tabs {
    var displayName: string;
}
declare function TabsPanel({ value, activeValue, children }: TabsPanelProps): react_jsx_runtime.JSX.Element | null;
declare namespace TabsPanel {
    var displayName: string;
}

interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
}

declare function Breadcrumb({ items, separator }: BreadcrumbProps): react_jsx_runtime.JSX.Element;
declare namespace Breadcrumb {
    var displayName: string;
}

type DividerOrientation = "horizontal" | "vertical";
type DividerLabelPosition = "left" | "center" | "right";
interface DividerProps {
    orientation?: DividerOrientation;
    label?: React.ReactNode;
    labelPosition?: DividerLabelPosition;
    size?: Size;
    color?: string;
}

declare function Divider({ orientation, label, labelPosition, size, color, }: DividerProps): react_jsx_runtime.JSX.Element;
declare namespace Divider {
    var displayName: string;
}

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    radius?: RadiusSize;
    circle?: boolean;
    animate?: boolean;
    visible?: boolean;
    children?: React.ReactNode;
}

declare function Skeleton({ width, height, radius, circle, animate, visible, children, }: SkeletonProps): react_jsx_runtime.JSX.Element;
declare namespace Skeleton {
    var displayName: string;
}

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
    disabled?: boolean;
}

declare function Switch({ checked, onChange, label, size, radius, color, disabled, }: SwitchProps): react_jsx_runtime.JSX.Element;
declare namespace Switch {
    var displayName: string;
}

type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
interface ToastData {
    id: string;
    title?: string;
    message: string;
    color?: ThemeColorName;
    duration?: number;
    radius?: RadiusSize;
}
interface ToastContainerProps {
    position?: ToastPosition;
    zIndex?: number;
}

interface ToastContextValue {
    show: (toast: Omit<ToastData, "id">) => void;
}
declare function useToast(): ToastContextValue;
declare function ToastProvider({ children, position, zIndex, }: ToastContainerProps & {
    children: React__default.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare namespace ToastProvider {
    var displayName: string;
}

interface AvatarProps {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
    children?: React.ReactNode;
}

declare const Avatar: React__default.ForwardRefExoticComponent<AvatarProps & React__default.RefAttributes<HTMLDivElement>>;

type TooltipPosition = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    label: React.ReactNode;
    position?: TooltipPosition;
    color?: string;
    withArrow?: boolean;
    disabled?: boolean;
    children: React.ReactElement;
}

declare function Tooltip({ label, position, disabled, children }: TooltipProps): react_jsx_runtime.JSX.Element;
declare namespace Tooltip {
    var displayName: string;
}

interface ProgressProps {
    value: number;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
    striped?: boolean;
    animated?: boolean;
    label?: string;
}

declare function Progress({ value, size, radius, color, striped, animated, label }: ProgressProps): react_jsx_runtime.JSX.Element;
declare namespace Progress {
    var displayName: string;
}

type AlertVariant = "filled" | "outline" | "subtle";
interface AlertProps {
    variant?: AlertVariant;
    color?: ThemeColorName;
    radius?: RadiusSize;
    title?: string;
    icon?: React.ReactNode;
    withCloseButton?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

declare function Alert({ variant, color, radius, title, icon, withCloseButton, onClose, children }: AlertProps): react_jsx_runtime.JSX.Element;
declare namespace Alert {
    var displayName: string;
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    label?: string;
    description?: string;
    error?: string;
    size?: Size;
    radius?: RadiusSize;
    minRows?: number;
    maxRows?: number;
    autosize?: boolean;
}

declare const TextArea: React__default.ForwardRefExoticComponent<TextAreaProps & React__default.RefAttributes<HTMLTextAreaElement>>;

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps {
    value?: string;
    onChange?: (value: string) => void;
    options: SelectOption[];
    label?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    size?: Size;
    radius?: RadiusSize;
    disabled?: boolean;
}

declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLSelectElement>>;

interface AccordionItem {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
}
type AccordionVariant = "default" | "contained" | "separated";
interface AccordionProps {
    items: AccordionItem[];
    variant?: AccordionVariant;
    radius?: RadiusSize;
    multiple?: boolean;
    defaultValue?: string[];
}

declare function Accordion({ items, variant, radius, multiple, defaultValue }: AccordionProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var displayName: string;
}

type ActionIconVariant = "filled" | "outline" | "subtle";
interface ActionIconProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ActionIconVariant;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
    loading?: boolean;
}
declare const ActionIcon: React__default.ForwardRefExoticComponent<ActionIconProps & React__default.RefAttributes<HTMLButtonElement>>;

interface GroupProps {
    gap?: Size | string;
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
    wrap?: React.CSSProperties["flexWrap"];
    grow?: boolean;
    children?: React.ReactNode;
}

declare function Group({ gap, align, justify, wrap, grow, children }: GroupProps): react_jsx_runtime.JSX.Element;
declare namespace Group {
    var displayName: string;
}

interface StackProps {
    gap?: Size | string;
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
    children?: React.ReactNode;
}

declare function Stack({ gap, align, justify, children }: StackProps): react_jsx_runtime.JSX.Element;
declare namespace Stack {
    var displayName: string;
}

interface TextProps {
    size?: Size;
    color?: ThemeColorName | "dimmed" | "inherit";
    weight?: number;
    align?: React__default.CSSProperties["textAlign"];
    lineClamp?: number;
    truncate?: boolean;
    inline?: boolean;
    children?: React__default.ReactNode;
}
declare function Text({ size, color, weight, align, lineClamp, truncate, inline, children }: TextProps): react_jsx_runtime.JSX.Element;
declare namespace Text {
    var displayName: string;
}

interface TitleProps {
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    align?: CSSProperties["textAlign"];
    children?: ReactNode;
}
declare function Title({ order, align, children }: TitleProps): ReactElement;
declare namespace Title {
    var displayName: string;
}

interface AnchorProps extends React__default.AnchorHTMLAttributes<HTMLAnchorElement> {
    size?: Size;
    color?: ThemeColorName;
    underline?: "always" | "hover" | "never";
}
declare const Anchor: React__default.ForwardRefExoticComponent<AnchorProps & React__default.RefAttributes<HTMLAnchorElement>>;

interface KbdProps {
    size?: Size;
    children?: React__default.ReactNode;
}
declare function Kbd({ size, children }: KbdProps): react_jsx_runtime.JSX.Element;
declare namespace Kbd {
    var displayName: string;
}

interface LoaderProps {
    size?: Size;
    color?: ThemeColorName;
}
declare function Loader({ size, color }: LoaderProps): react_jsx_runtime.JSX.Element;
declare namespace Loader {
    var displayName: string;
}

interface ChipProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: Size;
    radius?: RadiusSize;
    color?: ThemeColorName;
    variant?: "filled" | "outline";
    children?: React__default.ReactNode;
    disabled?: boolean;
}
declare function Chip({ checked, onChange, size, radius, color, variant, disabled, children }: ChipProps): react_jsx_runtime.JSX.Element;
declare namespace Chip {
    var displayName: string;
}

declare function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: Array<Partial<T>>): T;

export { Accordion, type AccordionItem, type AccordionProps, type AccordionVariant, ActionIcon, type ActionIconProps, type ActionIconVariant, Alert, type AlertProps, type AlertVariant, Anchor, type AnchorProps, Avatar, type AvatarProps, Badge, type BadgeProps, type BadgeVariant, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonProps, type ButtonVariant, Card, type CardPadding, type CardProps, type CardShadow, Chip, type ChipProps, type ColorScheme, type CreateUIConfig, Divider, type DividerLabelPosition, type DividerOrientation, type DividerProps, Group, type GroupProps, Input, type InputProps, Kbd, type KbdProps, Loader, type LoaderProps, Modal, type ModalProps, type PartialTheme, type PolymorphicComponentProp, Progress, type ProgressProps, type RadiusSize, Select, type SelectOption, type SelectProps, type Size, Skeleton, type SkeletonProps, Stack, type StackProps, type StylesDefinition, type StylesFn, Switch, type SwitchProps, type TabItem, Tabs, TabsPanel, type TabsPanelProps, type TabsProps, type TabsVariant, Text, TextArea, type TextAreaProps, type TextProps, type Theme, type ThemeColorName, Title, type TitleProps, type ToastContainerProps, type ToastData, type ToastPosition, ToastProvider, Tooltip, type TooltipPosition, type TooltipProps, UIContext, type UIContextValue, type UIInstance, type UseColorSchemeReturn, createUI, deepMerge, defaultColors, defaultTheme, useColorScheme, useStyles, useToast, useUI };
