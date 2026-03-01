import React2, { createContext, useId, useState, useMemo, useContext, useRef, useEffect, useCallback } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/theme/colors.ts
var blue = [
  "#e7f5ff",
  "#d0ebff",
  "#a5d8ff",
  "#74c0fc",
  "#4dabf7",
  "#339af0",
  "#228be6",
  "#1c7ed6",
  "#1971c2",
  "#1864ab"
];
var gray = [
  "#f8f9fa",
  "#f1f3f5",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#868e96",
  "#495057",
  "#343a40",
  "#212529"
];
var red = [
  "#fff5f5",
  "#ffe3e3",
  "#ffc9c9",
  "#ffa8a8",
  "#ff8787",
  "#ff6b6b",
  "#fa5252",
  "#f03e3e",
  "#e03131",
  "#c92a2a"
];
var green = [
  "#ebfbee",
  "#d3f9d8",
  "#b2f2bb",
  "#8ce99a",
  "#69db7c",
  "#51cf66",
  "#40c057",
  "#37b24d",
  "#2f9e44",
  "#2b8a3e"
];
var yellow = [
  "#fff9db",
  "#fff3bf",
  "#ffec99",
  "#ffe066",
  "#ffd43b",
  "#fcc419",
  "#fab005",
  "#f59f00",
  "#f08c00",
  "#e67700"
];
var cyan = [
  "#e3fafc",
  "#c5f6fa",
  "#99e9f2",
  "#66d9e8",
  "#3bc9db",
  "#22b8cf",
  "#15aabf",
  "#1098ad",
  "#0c8599",
  "#0b7285"
];
var violet = [
  "#f3f0ff",
  "#e5dbff",
  "#d0bfff",
  "#b197fc",
  "#9775fa",
  "#845ef7",
  "#7950f2",
  "#7048e8",
  "#6741d9",
  "#5f3dc4"
];
var defaultColors = {
  primary: blue,
  secondary: cyan,
  gray,
  red,
  green,
  blue,
  yellow,
  cyan,
  violet
};

// src/theme/defaults.ts
var defaultTheme = {
  colorScheme: "light",
  primaryColor: "blue",
  colors: defaultColors,
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem"
  },
  radius: {
    none: "0",
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px"
  },
  typography: {
    xs: { fontSize: "0.75rem", lineHeight: "1rem" },
    sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
    md: { fontSize: "1rem", lineHeight: "1.5rem" },
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
    xl: { fontSize: "1.25rem", lineHeight: "1.75rem" }
  },
  shadows: {
    none: "none",
    xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
    sm: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  components: {}
};

// src/utils/deep-merge.ts
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function deepMerge(target, ...sources) {
  const result = { ...target };
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = result[key];
      if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
        result[key] = deepMerge(
          targetVal,
          sourceVal
        );
      } else if (sourceVal !== void 0) {
        result[key] = sourceVal;
      }
    }
  }
  return result;
}

// src/theme/css-variables.ts
function generateCSSVariables(theme) {
  const vars = {};
  const colorNames = [
    "primary",
    "secondary",
    "gray",
    "red",
    "green",
    "blue",
    "yellow",
    "cyan",
    "violet"
  ];
  for (const name of colorNames) {
    const scale = theme.colors[name];
    for (let i = 0; i <= 9; i++) {
      vars[`--nui-color-${name}-${i}`] = scale[i];
    }
  }
  const spacingKeys = Object.keys(theme.spacing);
  for (const key of spacingKeys) {
    vars[`--nui-spacing-${key}`] = theme.spacing[key];
  }
  const radiusKeys = Object.keys(theme.radius);
  for (const key of radiusKeys) {
    vars[`--nui-radius-${key}`] = theme.radius[key];
  }
  const typoKeys = Object.keys(theme.typography);
  for (const key of typoKeys) {
    vars[`--nui-font-size-${key}`] = theme.typography[key].fontSize;
    vars[`--nui-line-height-${key}`] = theme.typography[key].lineHeight;
  }
  const shadowKeys = Object.keys(theme.shadows);
  for (const key of shadowKeys) {
    vars[`--nui-shadow-${key}`] = theme.shadows[key];
  }
  vars["--nui-font-family"] = theme.fontFamily;
  vars["--nui-font-family-monospace"] = theme.fontFamilyMonospace;
  const isDark = theme.colorScheme === "dark";
  const primary = theme.colors[theme.primaryColor];
  vars["--nui-color-body"] = isDark ? "#1a1b1e" : "#ffffff";
  vars["--nui-color-body-text"] = isDark ? theme.colors.gray[1] : theme.colors.gray[9];
  vars["--nui-color-surface"] = isDark ? "#25262b" : "#ffffff";
  vars["--nui-color-surface-hover"] = isDark ? "#2c2e33" : theme.colors.gray[0];
  vars["--nui-color-border"] = isDark ? theme.colors.gray[7] : theme.colors.gray[3];
  vars["--nui-color-border-subtle"] = isDark ? theme.colors.gray[8] : theme.colors.gray[2];
  vars["--nui-color-text"] = isDark ? theme.colors.gray[0] : theme.colors.gray[9];
  vars["--nui-color-text-dimmed"] = isDark ? theme.colors.gray[5] : theme.colors.gray[6];
  vars["--nui-color-primary-filled"] = primary[isDark ? 8 : 6];
  vars["--nui-color-primary-filled-hover"] = primary[isDark ? 7 : 7];
  vars["--nui-color-primary-light"] = isDark ? `${primary[9]}33` : `${primary[0]}cc`;
  vars["--nui-color-primary-light-hover"] = isDark ? `${primary[8]}44` : `${primary[1]}cc`;
  vars["--nui-color-primary-text"] = primary[isDark ? 4 : 6];
  vars["--nui-color-overlay"] = isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.5)";
  return vars;
}
function cssVariablesToString(vars) {
  return Object.entries(vars).map(([key, value]) => `${key}: ${value};`).join("\n  ");
}
var UIContext = createContext({
  theme: defaultTheme,
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  },
  colorScheme: "light"
});
var instanceCounter = 0;
function createUI(config = {}) {
  const instanceId = `nui-${++instanceCounter}`;
  const baseTheme = deepMerge(
    defaultTheme,
    config.theme ?? {}
  );
  if (config.theme?.primaryColor && baseTheme.colors[baseTheme.primaryColor]) {
    baseTheme.colors = {
      ...baseTheme.colors,
      primary: baseTheme.colors[baseTheme.primaryColor]
    };
  }
  function Provider({ children }) {
    const [colorScheme, setColorScheme] = useState(
      baseTheme.colorScheme
    );
    const theme = useMemo(
      () => ({ ...baseTheme, colorScheme }),
      [colorScheme]
    );
    const toggleColorScheme = useCallback(() => {
      setColorScheme((prev) => prev === "light" ? "dark" : "light");
    }, []);
    const cssVars = useMemo(() => generateCSSVariables(theme), [theme]);
    const styleString = useMemo(() => cssVariablesToString(cssVars), [cssVars]);
    const contextValue = useMemo(
      () => ({ theme, setColorScheme, toggleColorScheme, colorScheme }),
      [theme, toggleColorScheme, colorScheme]
    );
    useEffect(() => {
      const styleEl = document.createElement("style");
      styleEl.id = `nui-vars-${instanceId}`;
      styleEl.textContent = `[data-nui="${instanceId}"] {
  ${styleString}
}`;
      document.head.appendChild(styleEl);
      return () => {
        styleEl.remove();
      };
    }, [styleString]);
    return /* @__PURE__ */ jsx(UIContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
      "div",
      {
        "data-nui": instanceId,
        "data-color-scheme": colorScheme,
        style: {
          fontFamily: "var(--nui-font-family)",
          color: "var(--nui-color-text)",
          backgroundColor: "var(--nui-color-body)",
          minHeight: "inherit"
        },
        children
      }
    ) });
  }
  Provider.displayName = `NUI.Provider(${instanceId})`;
  return {
    Provider,
    theme: baseTheme
  };
}
function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UI Provider created by createUI()");
  }
  return context;
}

// src/hooks/use-color-scheme.ts
function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useUI();
  return {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
    isDark: colorScheme === "dark"
  };
}
function useStyles({
  name,
  stylesFn,
  props,
  variant,
  variantValue
}) {
  const { theme } = useUI();
  return useMemo(() => {
    const baseStyles = stylesFn(theme, props);
    const componentOverride = theme.components[name];
    if (componentOverride) {
      if (componentOverride.styles) {
        for (const part of Object.keys(componentOverride.styles)) {
          if (baseStyles[part] && componentOverride.styles[part]) {
            baseStyles[part] = {
              ...baseStyles[part],
              ...componentOverride.styles[part]
            };
          }
        }
      }
      if (variant && variantValue && componentOverride.variants?.[variant]?.[variantValue]) {
        const variantStyles = componentOverride.variants[variant][variantValue];
        for (const part of Object.keys(variantStyles)) {
          if (baseStyles[part] && variantStyles[part]) {
            baseStyles[part] = {
              ...baseStyles[part],
              ...variantStyles[part]
            };
          }
        }
      }
    }
    return baseStyles;
  }, [theme, props, name, variant, variantValue, stylesFn]);
}

// src/components/Button/styles.ts
var sizeMap = {
  xs: { height: "1.75rem", padding: "0 0.75rem", fontSize: "var(--nui-font-size-xs)" },
  sm: { height: "2rem", padding: "0 0.875rem", fontSize: "var(--nui-font-size-sm)" },
  md: { height: "2.375rem", padding: "0 1.125rem", fontSize: "var(--nui-font-size-sm)" },
  lg: { height: "2.75rem", padding: "0 1.5rem", fontSize: "var(--nui-font-size-md)" },
  xl: { height: "3.25rem", padding: "0 2rem", fontSize: "var(--nui-font-size-md)" }
};
function getVariantStyles(theme, variant, color) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[color];
  switch (variant) {
    case "filled":
      return {
        backgroundColor: scale[isDark ? 8 : 6],
        color: "#ffffff",
        border: "1px solid transparent"
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: scale[isDark ? 4 : 6],
        border: `1px solid ${scale[isDark ? 4 : 6]}`
      };
    case "subtle":
      return {
        backgroundColor: "transparent",
        color: scale[isDark ? 4 : 6],
        border: "1px solid transparent"
      };
  }
}
function buttonStyles(theme, props) {
  const { variant, size, radius, color, loading, disabled, fullWidth } = props;
  const sizeConfig = sizeMap[size];
  const variantStyle = getVariantStyles(theme, variant, color);
  return {
    root: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : void 0,
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--nui-spacing-sm)",
      height: sizeConfig.height,
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      fontFamily: "var(--nui-font-family)",
      lineHeight: 1,
      borderRadius: `var(--nui-radius-${radius})`,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease, opacity 150ms ease",
      textDecoration: "none",
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
      ...variantStyle
    },
    inner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--nui-spacing-sm)",
      opacity: loading ? 0 : 1
    },
    loader: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };
}
function Spinner({ size }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      style: { animation: "nui-spin 0.6s linear infinite" },
      children: [
        /* @__PURE__ */ jsx("style", { children: `@keyframes nui-spin { to { transform: rotate(360deg); } }` }),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeDasharray: "31.4 31.4",
            opacity: 0.7
          }
        )
      ]
    }
  );
}
function ButtonInner(props, ref) {
  const {
    as,
    variant = "filled",
    size = "md",
    radius = "md",
    color = "primary",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...rest
  } = props;
  const Component = as || "button";
  const styles = useStyles({
    name: "Button",
    stylesFn: buttonStyles,
    props: { variant, size, radius, color, loading, disabled, fullWidth },
    variant: "variant",
    variantValue: variant
  });
  const handleClick = (e) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
  const spinnerSize = size === "xs" || size === "sm" ? "14" : "18";
  return /* @__PURE__ */ jsxs(
    Component,
    {
      ref,
      style: styles.root,
      disabled: disabled || loading,
      onClick: handleClick,
      role: "button",
      "aria-disabled": disabled || loading,
      "aria-busy": loading,
      ...rest,
      children: [
        loading && /* @__PURE__ */ jsx("span", { style: styles.loader, children: /* @__PURE__ */ jsx(Spinner, { size: spinnerSize }) }),
        /* @__PURE__ */ jsxs("span", { style: styles.inner, children: [
          leftIcon && /* @__PURE__ */ jsx("span", { style: { display: "flex" }, children: leftIcon }),
          children,
          rightIcon && /* @__PURE__ */ jsx("span", { style: { display: "flex" }, children: rightIcon })
        ] })
      ]
    }
  );
}
var Button = React2.forwardRef(ButtonInner);
Button.displayName = "NUI.Button";

// src/components/Input/styles.ts
var sizeMap2 = {
  xs: { height: "1.75rem", fontSize: "var(--nui-font-size-xs)", padding: "0 0.5rem" },
  sm: { height: "2rem", fontSize: "var(--nui-font-size-sm)", padding: "0 0.625rem" },
  md: { height: "2.375rem", fontSize: "var(--nui-font-size-sm)", padding: "0 0.75rem" },
  lg: { height: "2.75rem", fontSize: "var(--nui-font-size-md)", padding: "0 0.875rem" },
  xl: { height: "3.25rem", fontSize: "var(--nui-font-size-md)", padding: "0 1rem" }
};
function inputStyles(theme, props) {
  const { size, radius, error, hasLeftSection, hasRightSection } = props;
  const sizeConfig = sizeMap2[size];
  const isDark = theme.colorScheme === "dark";
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem"
    },
    label: {
      fontSize: "var(--nui-font-size-sm)",
      fontWeight: 500,
      color: "var(--nui-color-text)",
      fontFamily: "var(--nui-font-family)"
    },
    description: {
      fontSize: "var(--nui-font-size-xs)",
      color: "var(--nui-color-text-dimmed)",
      fontFamily: "var(--nui-font-family)",
      marginTop: "-0.125rem"
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    },
    input: {
      width: "100%",
      height: sizeConfig.height,
      fontSize: sizeConfig.fontSize,
      padding: sizeConfig.padding,
      paddingLeft: hasLeftSection ? "2.25rem" : void 0,
      paddingRight: hasRightSection ? "2.25rem" : void 0,
      fontFamily: "var(--nui-font-family)",
      borderRadius: `var(--nui-radius-${radius})`,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: error ? theme.colors.red[isDark ? 5 : 6] : "var(--nui-color-border)",
      backgroundColor: "var(--nui-color-surface)",
      color: "var(--nui-color-text)",
      outline: "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease"
    },
    leftSection: {
      position: "absolute",
      left: "0.625rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--nui-color-text-dimmed)",
      pointerEvents: "none"
    },
    rightSection: {
      position: "absolute",
      right: "0.625rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--nui-color-text-dimmed)"
    },
    error: {
      fontSize: "var(--nui-font-size-xs)",
      color: theme.colors.red[isDark ? 4 : 6],
      fontFamily: "var(--nui-font-family)",
      marginTop: "0.125rem"
    }
  };
}
var Input = React2.forwardRef(
  function Input2(props, ref) {
    const {
      label,
      error,
      description,
      size = "md",
      radius = "md",
      required,
      leftSection,
      rightSection,
      id: providedId,
      onFocus,
      onBlur,
      style: _style,
      ...rest
    } = props;
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;
    const descriptionId = `${inputId}-description`;
    const [focused, setFocused] = useState(false);
    const styles = useStyles({
      name: "Input",
      stylesFn: inputStyles,
      props: {
        size,
        radius,
        error: !!error,
        hasLeftSection: !!leftSection,
        hasRightSection: !!rightSection
      }
    });
    const focusRingStyle = focused ? {
      borderColor: error ? void 0 : "var(--nui-color-primary-filled)",
      boxShadow: `0 0 0 2px ${error ? "var(--nui-color-red-2, rgba(255,0,0,0.2))" : "var(--nui-color-primary-light)"}`
    } : {};
    return /* @__PURE__ */ jsxs("div", { style: styles.root, children: [
      label && /* @__PURE__ */ jsxs("label", { htmlFor: inputId, style: styles.label, children: [
        label,
        required && /* @__PURE__ */ jsx("span", { style: { color: "var(--nui-color-red-6, #fa5252)", marginLeft: "0.25rem" }, children: "*" })
      ] }),
      description && /* @__PURE__ */ jsx("p", { id: descriptionId, style: styles.description, children: description }),
      /* @__PURE__ */ jsxs("div", { style: styles.inputWrapper, children: [
        leftSection && /* @__PURE__ */ jsx("div", { style: styles.leftSection, children: leftSection }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: inputId,
            "aria-invalid": !!error,
            "aria-describedby": [error && errorId, description && descriptionId].filter(Boolean).join(" ") || void 0,
            required,
            style: { ...styles.input, ...focusRingStyle },
            onFocus: (e) => {
              setFocused(true);
              onFocus?.(e);
            },
            onBlur: (e) => {
              setFocused(false);
              onBlur?.(e);
            },
            ...rest
          }
        ),
        rightSection && /* @__PURE__ */ jsx("div", { style: styles.rightSection, children: rightSection })
      ] }),
      error && /* @__PURE__ */ jsx("p", { id: errorId, role: "alert", style: styles.error, children: error })
    ] });
  }
);
Input.displayName = "NUI.Input";

// src/components/Card/styles.ts
var paddingMap = {
  none: "0",
  xs: "var(--nui-spacing-xs)",
  sm: "var(--nui-spacing-sm)",
  md: "var(--nui-spacing-md)",
  lg: "var(--nui-spacing-lg)",
  xl: "var(--nui-spacing-xl)"
};
function cardStyles(_theme, props) {
  const { padding, shadow, radius, withBorder } = props;
  return {
    root: {
      backgroundColor: "var(--nui-color-surface)",
      borderRadius: `var(--nui-radius-${radius})`,
      padding: paddingMap[padding],
      boxShadow: `var(--nui-shadow-${shadow})`,
      border: withBorder ? "1px solid var(--nui-color-border)" : "none",
      overflow: "hidden",
      position: "relative"
    }
  };
}
var Card = React2.forwardRef(
  function Card2(props, ref) {
    const {
      padding = "md",
      shadow = "sm",
      radius = "md",
      withBorder = true,
      children,
      style: userStyle,
      ...rest
    } = props;
    const styles = useStyles({
      name: "Card",
      stylesFn: cardStyles,
      props: { padding, shadow, radius, withBorder }
    });
    return /* @__PURE__ */ jsx("div", { ref, style: { ...styles.root, ...userStyle }, ...rest, children });
  }
);
Card.displayName = "NUI.Card";

// src/components/Modal/styles.ts
var sizeMap3 = {
  xs: "320px",
  sm: "380px",
  md: "440px",
  lg: "620px",
  xl: "780px"
};
function modalStyles(_theme, props) {
  const {
    size,
    radius,
    centered,
    overlayOpacity,
    overlayBlur,
    zIndex,
    isAnimatingIn
  } = props;
  const width = sizeMap3[size] || size;
  return {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      backdropFilter: overlayBlur > 0 ? `blur(${overlayBlur}px)` : void 0,
      zIndex,
      display: "flex",
      alignItems: centered ? "center" : "flex-start",
      justifyContent: "center",
      padding: centered ? "var(--nui-spacing-md)" : "5vh var(--nui-spacing-md)",
      opacity: isAnimatingIn ? 1 : 0,
      transition: "opacity 200ms ease"
    },
    content: {
      backgroundColor: "var(--nui-color-surface)",
      borderRadius: `var(--nui-radius-${radius})`,
      boxShadow: "var(--nui-shadow-xl)",
      width: "100%",
      maxWidth: width,
      maxHeight: "calc(100vh - 10vh)",
      overflow: "auto",
      position: "relative",
      transform: isAnimatingIn ? "scale(1) translateY(0)" : "scale(0.95) translateY(-10px)",
      opacity: isAnimatingIn ? 1 : 0,
      transition: "transform 200ms ease, opacity 200ms ease"
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--nui-spacing-md) var(--nui-spacing-lg)",
      borderBottom: "1px solid var(--nui-color-border-subtle)"
    },
    title: {
      fontSize: "var(--nui-font-size-lg)",
      fontWeight: 600,
      color: "var(--nui-color-text)",
      fontFamily: "var(--nui-font-family)",
      margin: 0
    },
    closeButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.75rem",
      height: "1.75rem",
      borderRadius: "var(--nui-radius-sm)",
      border: "none",
      backgroundColor: "transparent",
      color: "var(--nui-color-text-dimmed)",
      cursor: "pointer",
      padding: 0,
      transition: "background-color 150ms ease, color 150ms ease",
      fontSize: "1.125rem",
      lineHeight: 1
    },
    body: {
      padding: "var(--nui-spacing-lg)",
      color: "var(--nui-color-text)",
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-sm)"
    }
  };
}
function Modal(props) {
  const {
    opened,
    onClose,
    title,
    size = "md",
    radius = "md",
    centered = true,
    closeOnEscape = true,
    closeOnClickOutside = true,
    withCloseButton = true,
    overlayOpacity = 0.5,
    overlayBlur = 0,
    children,
    zIndex = 200
  } = props;
  const [mounted, setMounted] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
    if (opened) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(timer);
    }
  }, [opened]);
  useEffect(() => {
    if (!opened || !closeOnEscape) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [opened, closeOnEscape, onClose]);
  useEffect(() => {
    if (!opened) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [opened]);
  const handleOverlayClick = useCallback(
    (e) => {
      if (closeOnClickOutside && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnClickOutside, onClose]
  );
  const styles = useStyles({
    name: "Modal",
    stylesFn: modalStyles,
    props: {
      size,
      radius,
      centered,
      overlayOpacity,
      overlayBlur,
      zIndex,
      isAnimatingIn
    }
  });
  if (!mounted) return null;
  const modalContent = /* @__PURE__ */ jsx(
    "div",
    {
      style: styles.overlay,
      onClick: handleOverlayClick,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": title ? "nui-modal-title" : void 0,
      children: /* @__PURE__ */ jsxs("div", { ref: contentRef, style: styles.content, children: [
        (title || withCloseButton) && /* @__PURE__ */ jsxs("div", { style: styles.header, children: [
          title && /* @__PURE__ */ jsx("h2", { id: "nui-modal-title", style: styles.title, children: title }),
          withCloseButton && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              style: styles.closeButton,
              "aria-label": "Close modal",
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { style: styles.body, children })
      ] })
    }
  );
  return createPortal(modalContent, document.body);
}
Modal.displayName = "NUI.Modal";

// src/components/Badge/styles.ts
var sizeMap4 = {
  xs: { fontSize: "0.6rem", height: "1.125rem", padding: "0 0.375rem" },
  sm: { fontSize: "0.65rem", height: "1.375rem", padding: "0 0.5rem" },
  md: { fontSize: "0.7rem", height: "1.5rem", padding: "0 0.625rem" },
  lg: { fontSize: "0.75rem", height: "1.75rem", padding: "0 0.75rem" },
  xl: { fontSize: "0.8rem", height: "2rem", padding: "0 0.875rem" }
};
function badgeStyles(theme, props) {
  const { variant, size, radius, color } = props;
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[color] || theme.colors.primary;
  const sc = sizeMap4[size];
  const filled = scale[isDark ? 8 : 6];
  const light = scale[isDark ? 9 : 0];
  const text = scale[isDark ? 4 : 7];
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--nui-font-family)",
      fontWeight: 700,
      fontSize: sc.fontSize,
      height: sc.height,
      padding: sc.padding,
      borderRadius: `var(--nui-radius-${radius})`,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      lineHeight: 1,
      whiteSpace: "nowrap",
      userSelect: "none",
      ...variant === "filled" && {
        backgroundColor: filled,
        color: "#fff",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent"
      },
      ...variant === "outline" && {
        backgroundColor: "transparent",
        color: scale[isDark ? 4 : 6],
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: scale[isDark ? 4 : 6]
      },
      ...variant === "subtle" && {
        backgroundColor: light,
        color: text,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent"
      }
    }
  };
}
var Badge = React2.forwardRef(
  function Badge2({ variant = "filled", size = "md", radius = "xl", color = "primary", children, ...rest }, ref) {
    const styles = useStyles({
      name: "Badge",
      stylesFn: badgeStyles,
      props: { variant, size, radius, color },
      variant: "variant",
      variantValue: variant
    });
    return /* @__PURE__ */ jsx("span", { ref, style: styles.root, ...rest, children });
  }
);
Badge.displayName = "NUI.Badge";

// src/components/Tabs/styles.ts
var sizeMap5 = {
  xs: { fontSize: "var(--nui-font-size-xs)", padding: "0.35rem 0.75rem" },
  sm: { fontSize: "var(--nui-font-size-sm)", padding: "0.4rem 0.875rem" },
  md: { fontSize: "var(--nui-font-size-sm)", padding: "0.5rem 1rem" },
  lg: { fontSize: "var(--nui-font-size-md)", padding: "0.55rem 1.25rem" },
  xl: { fontSize: "var(--nui-font-size-md)", padding: "0.625rem 1.5rem" }
};
function tabsStyles(theme, props) {
  const { variant, size, fullWidth } = props;
  const sc = sizeMap5[size];
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "0"
    },
    list: {
      display: "flex",
      gap: variant === "pills" ? "0.375rem" : "0",
      ...fullWidth && { width: "100%" },
      ...variant === "default" && {
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: "var(--nui-color-border)"
      },
      ...variant === "outline" && {
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "var(--nui-color-border)"
      }
    },
    tab: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontFamily: "var(--nui-font-family)",
      fontSize: sc.fontSize,
      fontWeight: 500,
      padding: sc.padding,
      border: "none",
      background: "transparent",
      color: "var(--nui-color-text-dimmed)",
      transition: "color 150ms ease, background 150ms ease, border-color 150ms ease",
      ...fullWidth && { flex: 1 },
      ...variant === "pills" && {
        borderRadius: `var(--nui-radius-${props.radius})`
      },
      ...variant === "default" && {
        marginBottom: "-2px",
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: "transparent"
      },
      ...variant === "outline" && {
        marginBottom: "-1px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        borderBottomColor: "transparent",
        borderTopLeftRadius: `var(--nui-radius-${props.radius})`,
        borderTopRightRadius: `var(--nui-radius-${props.radius})`
      }
    },
    tabActive: {
      color: "var(--nui-color-primary-filled)",
      fontWeight: 600,
      ...variant === "default" && {
        borderBottomColor: "var(--nui-color-primary-filled)"
      },
      ...variant === "outline" && {
        borderColor: "var(--nui-color-border)",
        borderBottomColor: "var(--nui-color-body, #fff)",
        background: "var(--nui-color-surface)"
      },
      ...variant === "pills" && {
        backgroundColor: "var(--nui-color-primary-light)",
        color: "var(--nui-color-primary-filled)"
      }
    },
    tabDisabled: {
      opacity: 0.5,
      cursor: "not-allowed"
    },
    panel: {
      padding: "1rem 0"
    }
  };
}
function Tabs({
  value,
  onChange,
  items,
  variant = "default",
  size = "md",
  radius = "md",
  color = "primary",
  fullWidth = false,
  children
}) {
  const styles = useStyles({
    name: "Tabs",
    stylesFn: tabsStyles,
    props: { variant, size, radius, color, fullWidth },
    variant: "variant",
    variantValue: variant
  });
  return /* @__PURE__ */ jsxs("div", { style: styles.root, children: [
    /* @__PURE__ */ jsx("div", { style: styles.list, role: "tablist", children: items.map((item) => {
      const isActive = item.value === value;
      const isDisabled = item.disabled;
      return /* @__PURE__ */ jsx(
        "button",
        {
          role: "tab",
          "aria-selected": isActive,
          disabled: isDisabled,
          style: {
            ...styles.tab,
            ...isActive ? styles.tabActive : {},
            ...isDisabled ? styles.tabDisabled : {}
          },
          onClick: () => !isDisabled && onChange(item.value),
          children: item.label
        },
        item.value
      );
    }) }),
    children
  ] });
}
function TabsPanel({ value, activeValue, children }) {
  if (value !== activeValue) return null;
  return /* @__PURE__ */ jsx("div", { role: "tabpanel", style: { padding: "1rem 0" }, children });
}
Tabs.displayName = "NUI.Tabs";
TabsPanel.displayName = "NUI.TabsPanel";

// src/components/Breadcrumb/styles.ts
function breadcrumbStyles(_theme) {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "0.375rem",
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-sm)"
    },
    separator: {
      color: "var(--nui-color-text-dimmed)",
      display: "flex",
      alignItems: "center",
      userSelect: "none"
    },
    item: {
      color: "var(--nui-color-text-dimmed)",
      textDecoration: "none",
      transition: "color 150ms ease",
      cursor: "pointer"
    },
    itemActive: {
      color: "var(--nui-color-text)",
      fontWeight: 500,
      cursor: "default"
    }
  };
}
function Breadcrumb({ items, separator = "/" }) {
  const styles = useStyles({
    name: "Breadcrumb",
    stylesFn: breadcrumbStyles,
    props: {}
  });
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", style: styles.root, children: items.map((item, index) => {
    const isLast = index === items.length - 1;
    return /* @__PURE__ */ jsxs(React2.Fragment, { children: [
      isLast ? /* @__PURE__ */ jsx("span", { style: { ...styles.item, ...styles.itemActive }, children: item.label }) : item.href ? /* @__PURE__ */ jsx("a", { href: item.href, style: styles.item, children: item.label }) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: item.onClick,
          style: { ...styles.item, background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit" },
          children: item.label
        }
      ),
      !isLast && /* @__PURE__ */ jsx("span", { style: styles.separator, children: separator })
    ] }, index);
  }) });
}
Breadcrumb.displayName = "NUI.Breadcrumb";

// src/components/Divider/styles.ts
var thicknessMap = {
  xs: "1px",
  sm: "1px",
  md: "2px",
  lg: "3px",
  xl: "4px"
};
function dividerStyles(_theme, props) {
  const { orientation, labelPosition, size, color } = props;
  const borderColor = color || "var(--nui-color-border)";
  const thickness = thicknessMap[size];
  return {
    root: {
      display: "flex",
      alignItems: "center",
      ...orientation === "vertical" && {
        flexDirection: "column",
        alignSelf: "stretch",
        width: thickness,
        minHeight: "1rem",
        backgroundColor: borderColor
      },
      ...orientation === "horizontal" && {
        width: "100%",
        gap: "0.75rem"
      }
    },
    line: {
      flex: 1,
      height: orientation === "horizontal" ? thickness : "100%",
      width: orientation === "vertical" ? thickness : "auto",
      backgroundColor: borderColor,
      borderRadius: "999px"
    },
    label: {
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-xs)",
      fontWeight: 500,
      color: "var(--nui-color-text-dimmed)",
      whiteSpace: "nowrap",
      ...labelPosition === "left" && { order: -1 },
      ...labelPosition === "right" && { order: 1 }
    }
  };
}
function Divider({
  orientation = "horizontal",
  label,
  labelPosition = "center",
  size = "xs",
  color
}) {
  const styles = useStyles({
    name: "Divider",
    stylesFn: dividerStyles,
    props: { orientation, labelPosition, size, color }
  });
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx("div", { style: styles.root, role: "separator", "aria-orientation": "vertical" });
  }
  if (!label) {
    return /* @__PURE__ */ jsx("div", { style: styles.line, role: "separator" });
  }
  return /* @__PURE__ */ jsxs("div", { style: styles.root, role: "separator", children: [
    labelPosition !== "left" && /* @__PURE__ */ jsx("div", { style: styles.line }),
    /* @__PURE__ */ jsx("span", { style: styles.label, children: label }),
    labelPosition !== "right" && /* @__PURE__ */ jsx("div", { style: styles.line })
  ] });
}
Divider.displayName = "NUI.Divider";

// src/components/Skeleton/styles.ts
function skeletonStyles(_theme, props) {
  const { width, height, radius, circle, animate } = props;
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;
  return {
    root: {
      backgroundColor: "var(--nui-color-border)",
      borderRadius: circle ? "50%" : `var(--nui-radius-${radius})`,
      width: circle ? w || h || "2rem" : w || "100%",
      height: circle ? w || h || "2rem" : h || "1rem",
      overflow: "hidden",
      position: "relative",
      ...animate && {
        animation: "nui-skeleton-pulse 1.5s ease-in-out infinite"
      }
    }
  };
}
function Skeleton({
  width,
  height,
  radius = "md",
  circle = false,
  animate = true,
  visible = true,
  children
}) {
  const styles = useStyles({
    name: "Skeleton",
    stylesFn: skeletonStyles,
    props: { width, height, radius, circle, animate }
  });
  if (!visible && children) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  if (children) {
    return /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx("div", { style: { visibility: visible ? "hidden" : "visible" }, children }),
      visible && /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            ...styles.root,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%"
          }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx("div", { style: styles.root });
}
Skeleton.displayName = "NUI.Skeleton";

// src/components/Switch/styles.ts
var sizeMap6 = {
  xs: { track: { w: "2rem", h: "1.125rem" }, thumb: "0.875rem" },
  sm: { track: { w: "2.375rem", h: "1.25rem" }, thumb: "1rem" },
  md: { track: { w: "2.75rem", h: "1.5rem" }, thumb: "1.25rem" },
  lg: { track: { w: "3.125rem", h: "1.75rem" }, thumb: "1.5rem" },
  xl: { track: { w: "3.5rem", h: "2rem" }, thumb: "1.75rem" }
};
function switchStyles(theme, props) {
  const { size, radius, color, checked, disabled } = props;
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[color] || theme.colors.primary;
  const sc = sizeMap6[size];
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.625rem",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--nui-font-family)"
    },
    track: {
      position: "relative",
      width: sc.track.w,
      height: sc.track.h,
      borderRadius: radius === "full" ? "999px" : `var(--nui-radius-${radius})`,
      backgroundColor: checked ? scale[isDark ? 7 : 6] : isDark ? "var(--nui-color-dark-4, #5c5f66)" : "var(--nui-color-gray-3, #dee2e6)",
      transition: "background-color 200ms ease",
      cursor: "inherit",
      flexShrink: 0
    },
    thumb: {
      position: "absolute",
      top: "50%",
      left: checked ? `calc(100% - ${sc.thumb} - 0.125rem)` : "0.125rem",
      transform: "translateY(-50%)",
      width: sc.thumb,
      height: sc.thumb,
      borderRadius: "inherit",
      backgroundColor: "#fff",
      transition: "left 200ms ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
    },
    label: {
      fontSize: "var(--nui-font-size-sm)",
      color: "var(--nui-color-text)"
    }
  };
}
function Switch({
  checked = false,
  onChange,
  label,
  size = "md",
  radius = "full",
  color = "primary",
  disabled = false
}) {
  const styles = useStyles({
    name: "Switch",
    stylesFn: switchStyles,
    props: { size, radius, color, checked, disabled }
  });
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };
  return /* @__PURE__ */ jsxs("label", { style: styles.root, onClick: handleClick, children: [
    /* @__PURE__ */ jsx("div", { style: styles.track, role: "switch", "aria-checked": checked, tabIndex: disabled ? -1 : 0, onKeyDown: (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    }, children: /* @__PURE__ */ jsx("div", { style: styles.thumb }) }),
    label && /* @__PURE__ */ jsx("span", { style: styles.label, children: label })
  ] });
}
Switch.displayName = "NUI.Switch";

// src/components/Toast/styles.ts
var positionStyles = {
  "top-right": { top: "1rem", right: "1rem" },
  "top-left": { top: "1rem", left: "1rem" },
  "bottom-right": { bottom: "1rem", right: "1rem" },
  "bottom-left": { bottom: "1rem", left: "1rem" },
  "top-center": { top: "1rem", left: "50%", transform: "translateX(-50%)" },
  "bottom-center": { bottom: "1rem", left: "50%", transform: "translateX(-50%)" }
};
function toastContainerStyles(_theme, props) {
  return {
    root: {
      position: "fixed",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      maxWidth: "380px",
      width: "100%",
      pointerEvents: "none",
      ...positionStyles[props.position]
    }
  };
}
function toastStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color] || theme.colors.primary;
  return {
    root: {
      pointerEvents: "auto",
      display: "flex",
      alignItems: "flex-start",
      gap: "0.625rem",
      padding: "0.875rem 1rem",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: isDark ? "var(--nui-color-dark-6, #25262b)" : "#fff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--nui-color-border)",
      boxShadow: "var(--nui-shadow-md)",
      fontFamily: "var(--nui-font-family)",
      animation: "nui-toast-enter 250ms ease"
    },
    indicator: {
      width: "4px",
      alignSelf: "stretch",
      borderRadius: "2px",
      backgroundColor: scale[isDark ? 4 : 6],
      flexShrink: 0
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.125rem"
    },
    title: {
      fontWeight: 600,
      fontSize: "var(--nui-font-size-sm)",
      color: "var(--nui-color-text)"
    },
    message: {
      fontSize: "var(--nui-font-size-xs)",
      color: "var(--nui-color-text-dimmed)",
      lineHeight: 1.5
    },
    closeBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.25rem",
      height: "1.25rem",
      border: "none",
      borderRadius: "4px",
      background: "transparent",
      color: "var(--nui-color-text-dimmed)",
      cursor: "pointer",
      padding: 0,
      flexShrink: 0
    }
  };
}
var ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
function ToastItem({ data, onDismiss }) {
  const styles = useStyles({
    name: "Toast",
    stylesFn: toastStyles,
    props: { position: "top-right", color: data.color || "primary", radius: data.radius || "md" }
  });
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(data.id), data.duration || 4e3);
    return () => clearTimeout(timer);
  }, [data.id, data.duration, onDismiss]);
  return /* @__PURE__ */ jsxs("div", { style: styles.root, children: [
    /* @__PURE__ */ jsx("div", { style: styles.indicator }),
    /* @__PURE__ */ jsxs("div", { style: styles.content, children: [
      data.title && /* @__PURE__ */ jsx("div", { style: styles.title, children: data.title }),
      /* @__PURE__ */ jsx("div", { style: styles.message, children: data.message })
    ] }),
    /* @__PURE__ */ jsx("button", { style: styles.closeBtn, onClick: () => onDismiss(data.id), "aria-label": "Dismiss", children: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ] }) })
  ] });
}
function ToastProvider({
  children,
  position = "top-right",
  zIndex = 9999
}) {
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const idCounter = useRef(0);
  useEffect(() => {
    setMounted(true);
  }, []);
  const show = useCallback((toast) => {
    const id = `nui-toast-${++idCounter.current}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const containerStyles = useStyles({
    name: "ToastContainer",
    stylesFn: toastContainerStyles,
    props: { position }
  });
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { show }, children: [
    children,
    mounted && createPortal(
      /* @__PURE__ */ jsx("div", { style: { ...containerStyles.root, zIndex }, children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { data: t, onDismiss: dismiss }, t.id)) }),
      document.body
    )
  ] });
}
ToastProvider.displayName = "NUI.ToastProvider";

// src/components/Avatar/styles.ts
var sizeMap7 = { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3.25rem", xl: "4rem" };
var fontMap = { xs: "0.5rem", sm: "0.65rem", md: "0.85rem", lg: "1rem", xl: "1.3rem" };
function avatarStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color];
  const dim = sizeMap7[props.size];
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
      userSelect: "none",
      flexShrink: 0
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  };
}
function getInitials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}
var Avatar = React2.forwardRef(
  function Avatar2({ src, alt, name, size = "md", radius = "full", color = "primary", children, ...rest }, ref) {
    const [imgError, setImgError] = useState(false);
    const styles = useStyles({ name: "Avatar", stylesFn: avatarStyles, props: { size, radius, color } });
    const showImage = src && !imgError;
    const fallback = children || (name ? getInitials(name) : "?");
    return /* @__PURE__ */ jsx("div", { ref, style: styles.root, ...rest, children: showImage ? /* @__PURE__ */ jsx("img", { src, alt: alt || name || "", style: styles.image, onError: () => setImgError(true) }) : fallback });
  }
);
Avatar.displayName = "NUI.Avatar";

// src/components/Tooltip/styles.ts
function tooltipStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const bg = isDark ? "#1e293b" : "#1e293b";
  const posMap = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "6px" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "6px" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "6px" }
  };
  return {
    wrapper: { position: "relative", display: "inline-flex" },
    tooltip: {
      position: "absolute",
      zIndex: 1e3,
      backgroundColor: bg,
      color: "#f8fafc",
      padding: "0.3rem 0.6rem",
      borderRadius: "var(--nui-radius-sm)",
      fontSize: "var(--nui-font-size-xs)",
      fontFamily: "var(--nui-font-family)",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      ...posMap[props.position]
    }
  };
}
function Tooltip({ label, position = "top", disabled = false, children }) {
  const [visible, setVisible] = useState(false);
  const styles = useStyles({ name: "Tooltip", stylesFn: tooltipStyles, props: { position } });
  if (disabled) return /* @__PURE__ */ jsx(Fragment, { children });
  return /* @__PURE__ */ jsxs("span", { style: styles.wrapper, onMouseEnter: () => setVisible(true), onMouseLeave: () => setVisible(false), onFocus: () => setVisible(true), onBlur: () => setVisible(false), children: [
    children,
    visible && /* @__PURE__ */ jsx("span", { style: styles.tooltip, role: "tooltip", children: label })
  ] });
}
Tooltip.displayName = "NUI.Tooltip";

// src/components/Progress/styles.ts
var heightMap = { xs: "4px", sm: "6px", md: "10px", lg: "14px", xl: "20px" };
function progressStyles(theme, props) {
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
      position: "relative"
    },
    bar: {
      height: "100%",
      width: `${Math.min(100, Math.max(0, props.value))}%`,
      backgroundColor: scale[isDark ? 5 : 6],
      borderRadius: `var(--nui-radius-${props.radius})`,
      transition: "width 300ms ease",
      backgroundImage: bgImage,
      backgroundSize: props.striped ? "1rem 1rem" : "auto",
      animation: props.animated ? "nui-progress-stripes 1s linear infinite" : "none"
    },
    label: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.6rem",
      fontWeight: 700,
      color: "#fff",
      fontFamily: "var(--nui-font-family)"
    }
  };
}
function Progress({ value, size = "md", radius = "xl", color = "primary", striped = false, animated = false, label }) {
  const styles = useStyles({ name: "Progress", stylesFn: progressStyles, props: { size, radius, color, value, striped, animated } });
  return /* @__PURE__ */ jsxs("div", { style: styles.root, role: "progressbar", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": 100, children: [
    /* @__PURE__ */ jsx("div", { style: styles.bar }),
    label && /* @__PURE__ */ jsx("div", { style: styles.label, children: label })
  ] });
}
Progress.displayName = "NUI.Progress";

// src/components/Alert/styles.ts
function alertStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color];
  const v = props.variant;
  const bg = v === "filled" ? scale[isDark ? 8 : 6] : v === "subtle" ? isDark ? `${scale[9]}22` : `${scale[1]}` : "transparent";
  const fg = v === "filled" ? "#fff" : scale[isDark ? 4 : 7];
  const borderC = v === "outline" ? scale[isDark ? 5 : 4] : "transparent";
  return {
    root: {
      display: "flex",
      gap: "0.75rem",
      padding: "0.875rem 1rem",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: bg,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: borderC,
      color: fg,
      fontFamily: "var(--nui-font-family)",
      fontSize: "var(--nui-font-size-sm)",
      lineHeight: 1.55,
      position: "relative"
    },
    icon: { flexShrink: 0, marginTop: "1px" },
    body: { flex: 1, minWidth: 0 },
    title: { fontWeight: 700, fontSize: "var(--nui-font-size-sm)", marginBottom: "0.25rem" },
    message: { opacity: v === "filled" ? 0.9 : 0.85 },
    closeBtn: {
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem",
      background: "none",
      border: "none",
      color: "inherit",
      opacity: 0.6,
      cursor: "pointer",
      padding: "0.25rem",
      display: "flex",
      alignItems: "center"
    }
  };
}
function Alert({ variant = "subtle", color = "blue", radius = "md", title, icon, withCloseButton, onClose, children }) {
  const styles = useStyles({ name: "Alert", stylesFn: alertStyles, props: { variant, color, radius }, variant: "variant", variantValue: variant });
  return /* @__PURE__ */ jsxs("div", { style: styles.root, role: "alert", children: [
    icon && /* @__PURE__ */ jsx("div", { style: styles.icon, children: icon }),
    /* @__PURE__ */ jsxs("div", { style: styles.body, children: [
      title && /* @__PURE__ */ jsx("div", { style: styles.title, children: title }),
      /* @__PURE__ */ jsx("div", { style: styles.message, children })
    ] }),
    withCloseButton && /* @__PURE__ */ jsx("button", { style: styles.closeBtn, onClick: onClose, "aria-label": "Close", children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ] }) })
  ] });
}
Alert.displayName = "NUI.Alert";

// src/components/TextArea/styles.ts
var sizeMap8 = {
  xs: { padding: "0.35rem 0.6rem", fontSize: "var(--nui-font-size-xs)" },
  sm: { padding: "0.4rem 0.75rem", fontSize: "var(--nui-font-size-sm)" },
  md: { padding: "0.55rem 0.875rem", fontSize: "var(--nui-font-size-sm)" },
  lg: { padding: "0.65rem 1rem", fontSize: "var(--nui-font-size-md)" },
  xl: { padding: "0.8rem 1.125rem", fontSize: "var(--nui-font-size-md)" }
};
function textAreaStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const s = sizeMap8[props.size];
  return {
    root: { display: "flex", flexDirection: "column", gap: "0.25rem" },
    label: { fontSize: "var(--nui-font-size-sm)", fontWeight: 600, color: "var(--nui-color-text)", fontFamily: "var(--nui-font-family)" },
    description: { fontSize: "var(--nui-font-size-xs)", color: "var(--nui-color-text-dimmed)", fontFamily: "var(--nui-font-family)" },
    input: {
      width: "100%",
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: "var(--nui-font-family)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: props.error ? theme.colors.red[isDark ? 5 : 6] : "var(--nui-color-border)",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: "var(--nui-color-input-bg)",
      color: "var(--nui-color-text)",
      outline: "none",
      resize: "vertical",
      minHeight: "4.5rem",
      lineHeight: 1.55,
      opacity: props.disabled ? 0.6 : 1,
      transition: "border-color 150ms ease"
    },
    error: { fontSize: "var(--nui-font-size-xs)", color: theme.colors.red[isDark ? 4 : 6], fontFamily: "var(--nui-font-family)" }
  };
}
var TextArea = React2.forwardRef(
  function TextArea2({ label, description, error, size = "md", radius = "md", disabled, rows = 4, ...rest }, ref) {
    const styles = useStyles({ name: "TextArea", stylesFn: textAreaStyles, props: { size, radius, error: !!error, disabled: !!disabled } });
    return /* @__PURE__ */ jsxs("div", { style: styles.root, children: [
      label && /* @__PURE__ */ jsx("label", { style: styles.label, children: label }),
      description && /* @__PURE__ */ jsx("p", { style: styles.description, children: description }),
      /* @__PURE__ */ jsx("textarea", { ref, style: styles.input, disabled, rows, ...rest }),
      error && /* @__PURE__ */ jsx("p", { style: styles.error, children: error })
    ] });
  }
);
TextArea.displayName = "NUI.TextArea";

// src/components/Select/styles.ts
var sizeMap9 = {
  xs: { height: "1.75rem", padding: "0 0.6rem", fontSize: "var(--nui-font-size-xs)" },
  sm: { height: "2rem", padding: "0 0.75rem", fontSize: "var(--nui-font-size-sm)" },
  md: { height: "2.375rem", padding: "0 0.875rem", fontSize: "var(--nui-font-size-sm)" },
  lg: { height: "2.75rem", padding: "0 1rem", fontSize: "var(--nui-font-size-md)" },
  xl: { height: "3.25rem", padding: "0 1.125rem", fontSize: "var(--nui-font-size-md)" }
};
function selectStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const s = sizeMap9[props.size];
  return {
    root: { display: "flex", flexDirection: "column", gap: "0.25rem" },
    label: { fontSize: "var(--nui-font-size-sm)", fontWeight: 600, color: "var(--nui-color-text)", fontFamily: "var(--nui-font-family)" },
    description: { fontSize: "var(--nui-font-size-xs)", color: "var(--nui-color-text-dimmed)", fontFamily: "var(--nui-font-family)" },
    input: {
      width: "100%",
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: "var(--nui-font-family)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: props.error ? theme.colors.red[isDark ? 5 : 6] : "var(--nui-color-border)",
      borderRadius: `var(--nui-radius-${props.radius})`,
      backgroundColor: "var(--nui-color-input-bg)",
      color: "var(--nui-color-text)",
      outline: "none",
      appearance: "none",
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.6 : 1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 0.75rem center",
      paddingRight: "2rem",
      transition: "border-color 150ms ease"
    },
    error: { fontSize: "var(--nui-font-size-xs)", color: theme.colors.red[isDark ? 4 : 6], fontFamily: "var(--nui-font-family)" }
  };
}
var Select = React2.forwardRef(
  function Select2({ value, onChange, options, label, description, error, placeholder, size = "md", radius = "md", disabled }, ref) {
    const styles = useStyles({ name: "Select", stylesFn: selectStyles, props: { size, radius, error: !!error, disabled: !!disabled } });
    return /* @__PURE__ */ jsxs("div", { style: styles.root, children: [
      label && /* @__PURE__ */ jsx("label", { style: styles.label, children: label }),
      description && /* @__PURE__ */ jsx("p", { style: styles.description, children: description }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          ref,
          style: styles.input,
          value,
          onChange: (e) => onChange?.(e.target.value),
          disabled,
          children: [
            placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: placeholder }),
            options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value))
          ]
        }
      ),
      error && /* @__PURE__ */ jsx("p", { style: styles.error, children: error })
    ] });
  }
);
Select.displayName = "NUI.Select";

// src/components/Accordion/styles.ts
function accordionStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const sep = props.variant === "separated";
  return {
    root: { display: "flex", flexDirection: "column", gap: sep ? "0.5rem" : "0" },
    item: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: props.variant === "default" ? "transparent" : "var(--nui-color-border)",
      borderRadius: sep ? `var(--nui-radius-${props.radius})` : "0",
      overflow: "hidden",
      backgroundColor: props.variant === "contained" ? isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)" : "transparent",
      borderBottomColor: props.variant === "default" ? "var(--nui-color-border)" : void 0
    },
    control: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem 1rem",
      border: "none",
      background: "transparent",
      color: "var(--nui-color-text)",
      fontSize: "var(--nui-font-size-sm)",
      fontWeight: 600,
      fontFamily: "var(--nui-font-family)",
      cursor: "pointer",
      textAlign: "left",
      transition: "background 150ms"
    },
    chevron: { color: "var(--nui-color-text-dimmed)", transition: "transform 200ms ease", display: "flex" },
    chevronOpen: { transform: "rotate(180deg)" },
    panel: {
      padding: "0 1rem 0.75rem",
      fontSize: "var(--nui-font-size-sm)",
      color: "var(--nui-color-text-dimmed)",
      fontFamily: "var(--nui-font-family)",
      lineHeight: 1.6
    }
  };
}
function Accordion({ items, variant = "default", radius = "md", multiple = false, defaultValue = [] }) {
  const [openItems, setOpenItems] = useState(defaultValue);
  const styles = useStyles({ name: "Accordion", stylesFn: accordionStyles, props: { variant, radius }, variant: "variant", variantValue: variant });
  const toggle = (value) => {
    setOpenItems(
      (prev) => prev.includes(value) ? prev.filter((v) => v !== value) : multiple ? [...prev, value] : [value]
    );
  };
  return /* @__PURE__ */ jsx("div", { style: styles.root, children: items.map((item) => {
    const isOpen = openItems.includes(item.value);
    return /* @__PURE__ */ jsxs("div", { style: styles.item, children: [
      /* @__PURE__ */ jsxs("button", { style: styles.control, onClick: () => !item.disabled && toggle(item.value), disabled: item.disabled, "aria-expanded": isOpen, children: [
        /* @__PURE__ */ jsx("span", { children: item.label }),
        /* @__PURE__ */ jsx("span", { style: { ...styles.chevron, ...isOpen ? styles.chevronOpen : {} }, children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6 6-6" }) }) })
      ] }),
      isOpen && /* @__PURE__ */ jsx("div", { style: styles.panel, children: item.content })
    ] }, item.value);
  }) });
}
Accordion.displayName = "NUI.Accordion";
var sizeMap10 = { xs: "1.5rem", sm: "1.75rem", md: "2.125rem", lg: "2.5rem", xl: "3rem" };
function actionIconStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color] || theme.colors.primary;
  const dim = sizeMap10[props.size] || "2.125rem";
  const v = props.variant;
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      borderRadius: `var(--nui-radius-${props.radius})`,
      border: v === "outline" ? `1px solid ${scale[isDark ? 4 : 6]}` : "1px solid transparent",
      backgroundColor: v === "filled" ? scale[isDark ? 8 : 6] : "transparent",
      color: v === "filled" ? "#fff" : scale[isDark ? 4 : 6],
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.6 : 1,
      transition: "background 150ms, color 150ms",
      padding: 0,
      fontFamily: "var(--nui-font-family)"
    }
  };
}
var ActionIcon = React2.forwardRef(
  function ActionIcon2({ variant = "subtle", size = "md", radius = "md", color = "primary", disabled, children, ...rest }, ref) {
    const styles = useStyles({ name: "ActionIcon", stylesFn: actionIconStyles, props: { variant, size, radius, color, disabled: !!disabled } });
    return /* @__PURE__ */ jsx("button", { ref, style: styles.root, disabled, ...rest, children });
  }
);
ActionIcon.displayName = "NUI.ActionIcon";
var gapMap = { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" };
function Group({ gap = "md", align = "center", justify = "flex-start", wrap = "wrap", grow = false, children }) {
  return /* @__PURE__ */ jsx("div", { style: {
    display: "flex",
    flexDirection: "row",
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    gap: gapMap[gap] || gap,
    ...grow ? { "& > *": { flex: 1 } } : {}
  }, children });
}
Group.displayName = "NUI.Group";
var gapMap2 = { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" };
function Stack({ gap = "md", align = "stretch", justify = "flex-start", children }) {
  return /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: align, justifyContent: justify, gap: gapMap2[gap] || gap }, children });
}
Stack.displayName = "NUI.Stack";
var sizeMap11 = { xs: "var(--nui-font-size-xs)", sm: "var(--nui-font-size-sm)", md: "var(--nui-font-size-md)", lg: "var(--nui-font-size-lg)", xl: "var(--nui-font-size-xl)" };
function Text({ size = "md", color, weight, align, lineClamp, truncate, inline, children }) {
  const colorVal = color === "dimmed" ? "var(--nui-color-text-dimmed)" : color === "inherit" ? "inherit" : color ? `var(--nui-color-${color}-6)` : "var(--nui-color-text)";
  const Tag = inline ? "span" : "p";
  const style = {
    fontSize: sizeMap11[size],
    fontFamily: "var(--nui-font-family)",
    color: colorVal,
    fontWeight: weight,
    textAlign: align,
    margin: 0,
    lineHeight: 1.55,
    ...truncate ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } : {},
    ...lineClamp ? { display: "-webkit-box", WebkitLineClamp: lineClamp, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}
  };
  return /* @__PURE__ */ jsx(Tag, { style, children });
}
Text.displayName = "NUI.Text";
var sizeMap12 = { 1: "2rem", 2: "1.5rem", 3: "1.25rem", 4: "1.1rem", 5: "1rem", 6: "0.875rem" };
var weightMap = { 1: 800, 2: 700, 3: 700, 4: 600, 5: 600, 6: 600 };
function Title({ order = 1, align, children }) {
  const Tag = `h${order}`;
  return React2.createElement(Tag, {
    style: {
      fontSize: sizeMap12[order],
      fontWeight: weightMap[order],
      fontFamily: "var(--nui-font-family)",
      color: "var(--nui-color-text)",
      lineHeight: 1.25,
      margin: 0,
      letterSpacing: "-0.02em",
      textAlign: align
    }
  }, children);
}
Title.displayName = "NUI.Title";
var sizeMap13 = { xs: "var(--nui-font-size-xs)", sm: "var(--nui-font-size-sm)", md: "var(--nui-font-size-md)", lg: "var(--nui-font-size-lg)", xl: "var(--nui-font-size-xl)" };
var Anchor = React2.forwardRef(
  function Anchor2({ size = "md", color = "primary", underline = "hover", children, style, ...rest }, ref) {
    return /* @__PURE__ */ jsx("a", { ref, style: {
      fontSize: sizeMap13[size],
      fontFamily: "var(--nui-font-family)",
      color: `var(--nui-color-${color}-6)`,
      textDecoration: underline === "always" ? "underline" : "none",
      cursor: "pointer",
      ...style
    }, ...rest, children });
  }
);
Anchor.displayName = "NUI.Anchor";
var sizeMap14 = {
  xs: { fontSize: "0.6rem", padding: "0.05rem 0.25rem" },
  sm: { fontSize: "0.7rem", padding: "0.1rem 0.3rem" },
  md: { fontSize: "0.75rem", padding: "0.15rem 0.4rem" },
  lg: { fontSize: "0.85rem", padding: "0.2rem 0.5rem" },
  xl: { fontSize: "0.95rem", padding: "0.25rem 0.6rem" }
};
function Kbd({ size = "sm", children }) {
  const s = sizeMap14[size];
  return /* @__PURE__ */ jsx("kbd", { style: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--nui-font-family-monospace)",
    fontSize: s.fontSize,
    fontWeight: 600,
    padding: s.padding,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--nui-color-border)",
    borderRadius: "var(--nui-radius-sm)",
    backgroundColor: "var(--nui-color-surface-hover)",
    color: "var(--nui-color-text-dimmed)",
    lineHeight: 1.4,
    borderBottomWidth: "2px"
  }, children });
}
Kbd.displayName = "NUI.Kbd";
var sizeMap15 = { xs: "16px", sm: "20px", md: "28px", lg: "36px", xl: "48px" };
function Loader({ size = "md", color = "primary" }) {
  const dim = sizeMap15[size];
  return /* @__PURE__ */ jsx("svg", { width: dim, height: dim, viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg", style: { animation: "nui-spin 1s linear infinite" }, children: /* @__PURE__ */ jsx("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ jsxs("g", { transform: "translate(1 1)", strokeWidth: "3", children: [
    /* @__PURE__ */ jsx("circle", { strokeOpacity: ".25", cx: "18", cy: "18", r: "18", stroke: `var(--nui-color-${color}-6)` }),
    /* @__PURE__ */ jsx("path", { d: "M36 18c0-9.94-8.06-18-18-18", stroke: `var(--nui-color-${color}-6)`, strokeLinecap: "round" })
  ] }) }) });
}
Loader.displayName = "NUI.Loader";
function chipStyles(theme, props) {
  const isDark = theme.colorScheme === "dark";
  const scale = theme.colors[props.color] || theme.colors.primary;
  const sizeMap16 = {
    xs: { height: "1.5rem", padding: "0 0.5rem", fontSize: "var(--nui-font-size-xs)" },
    sm: { height: "1.75rem", padding: "0 0.625rem", fontSize: "var(--nui-font-size-xs)" },
    md: { height: "2rem", padding: "0 0.75rem", fontSize: "var(--nui-font-size-sm)" },
    lg: { height: "2.375rem", padding: "0 1rem", fontSize: "var(--nui-font-size-sm)" },
    xl: { height: "2.75rem", padding: "0 1.25rem", fontSize: "var(--nui-font-size-md)" }
  };
  const s = sizeMap16[props.size] || sizeMap16.md;
  const isChecked = props.checked;
  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: 500,
      fontFamily: "var(--nui-font-family)",
      borderRadius: `var(--nui-radius-${props.radius})`,
      cursor: props.disabled ? "not-allowed" : "pointer",
      opacity: props.disabled ? 0.6 : 1,
      transition: "background 150ms, border-color 150ms, color 150ms",
      border: `1px solid ${isChecked ? scale[isDark ? 5 : 6] : "var(--nui-color-border)"}`,
      backgroundColor: isChecked ? props.variant === "filled" ? scale[isDark ? 8 : 6] : `${scale[isDark ? 9 : 0]}` : "transparent",
      color: isChecked ? props.variant === "filled" ? "#fff" : scale[isDark ? 4 : 7] : "var(--nui-color-text-dimmed)",
      userSelect: "none"
    },
    check: {
      width: "0.75em",
      height: "0.75em",
      display: isChecked ? "block" : "none"
    }
  };
}
function Chip({ checked = false, onChange, size = "md", radius = "xl", color = "primary", variant = "outline", disabled, children }) {
  const styles = useStyles({ name: "Chip", stylesFn: chipStyles, props: { size, radius, color, checked, variant, disabled: !!disabled } });
  return /* @__PURE__ */ jsxs("button", { style: styles.root, onClick: () => !disabled && onChange?.(!checked), disabled, role: "checkbox", "aria-checked": checked, children: [
    checked && /* @__PURE__ */ jsx("svg", { style: styles.check, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
    children
  ] });
}
Chip.displayName = "NUI.Chip";

export { Accordion, ActionIcon, Alert, Anchor, Avatar, Badge, Breadcrumb, Button, Card, Chip, Divider, Group, Input, Kbd, Loader, Modal, Progress, Select, Skeleton, Stack, Switch, Tabs, TabsPanel, Text, TextArea, Title, ToastProvider, Tooltip, UIContext, createUI, deepMerge, defaultColors, defaultTheme, useColorScheme, useStyles, useToast, useUI };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map