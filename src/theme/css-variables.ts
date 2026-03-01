import type { Theme, ThemeColorName, ColorShade } from "./types";

export function generateCSSVariables(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};

  const colorNames: ThemeColorName[] = [
    "primary",
    "secondary",
    "gray",
    "red",
    "green",
    "blue",
    "yellow",
    "cyan",
    "violet",
  ];

  for (const name of colorNames) {
    const scale = theme.colors[name];
    for (let i = 0; i <= 9; i++) {
      vars[`--nui-color-${name}-${i as ColorShade}`] = scale[i];
    }
  }

  const spacingKeys = Object.keys(theme.spacing) as Array<
    keyof typeof theme.spacing
  >;
  for (const key of spacingKeys) {
    vars[`--nui-spacing-${key}`] = theme.spacing[key];
  }

  const radiusKeys = Object.keys(theme.radius) as Array<
    keyof typeof theme.radius
  >;
  for (const key of radiusKeys) {
    vars[`--nui-radius-${key}`] = theme.radius[key];
  }

  const typoKeys = Object.keys(theme.typography) as Array<
    keyof typeof theme.typography
  >;
  for (const key of typoKeys) {
    vars[`--nui-font-size-${key}`] = theme.typography[key].fontSize;
    vars[`--nui-line-height-${key}`] = theme.typography[key].lineHeight;
  }

  const shadowKeys = Object.keys(theme.shadows) as Array<
    keyof typeof theme.shadows
  >;
  for (const key of shadowKeys) {
    vars[`--nui-shadow-${key}`] = theme.shadows[key];
  }

  vars["--nui-font-family"] = theme.fontFamily;
  vars["--nui-font-family-monospace"] = theme.fontFamilyMonospace;

  const isDark = theme.colorScheme === "dark";
  const primary = theme.colors[theme.primaryColor];

  vars["--nui-color-body"] = isDark ? "#1a1b1e" : "#ffffff";
  vars["--nui-color-body-text"] = isDark
    ? theme.colors.gray[1]
    : theme.colors.gray[9];
  vars["--nui-color-surface"] = isDark ? "#25262b" : "#ffffff";
  vars["--nui-color-surface-hover"] = isDark ? "#2c2e33" : theme.colors.gray[0];
  vars["--nui-color-border"] = isDark
    ? theme.colors.gray[7]
    : theme.colors.gray[3];
  vars["--nui-color-border-subtle"] = isDark
    ? theme.colors.gray[8]
    : theme.colors.gray[2];
  vars["--nui-color-text"] = isDark
    ? theme.colors.gray[0]
    : theme.colors.gray[9];
  vars["--nui-color-text-dimmed"] = isDark
    ? theme.colors.gray[5]
    : theme.colors.gray[6];
  vars["--nui-color-primary-filled"] = primary[isDark ? 8 : 6];
  vars["--nui-color-primary-filled-hover"] = primary[isDark ? 7 : 7];
  vars["--nui-color-primary-light"] = isDark
    ? `${primary[9]}33`
    : `${primary[0]}cc`;
  vars["--nui-color-primary-light-hover"] = isDark
    ? `${primary[8]}44`
    : `${primary[1]}cc`;
  vars["--nui-color-primary-text"] = primary[isDark ? 4 : 6];
  vars["--nui-color-overlay"] = isDark
    ? "rgba(0, 0, 0, 0.75)"
    : "rgba(0, 0, 0, 0.5)";

  return vars;
}

export function cssVariablesToString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n  ");
}
