# NUI React

A production-ready React UI library with a custom initialization system, powerful theming via CSS variables, and zero external dependencies.

## Installation

```bash
npm install nui-react
# or
yarn add nui-react
# or
pnpm add nui-react
```

### Peer Dependencies

NUI requires React 18 or later:

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { createUI, Button, Input, Card, Modal } from "nui-react";

// 1. Create a UI instance with your theme
const { UIProvider } = createUI({
  theme: {
    primaryColor: "blue",
    colorScheme: "light",
    radius: "md",
    fontFamily: "Inter, sans-serif",
  },
});

// 2. Wrap your app
function App() {
  return (
    <UIProvider>
      <Card padding="lg" shadow="sm">
        <h2>Welcome to NUI</h2>
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="filled">Get Started</Button>
      </Card>
    </UIProvider>
  );
}
```

## Theme Customization

Pass a partial theme to `createUI` to override any defaults:

```tsx
const { UIProvider } = createUI({
  theme: {
    // Change the primary color palette
    primaryColor: "cyan",

    // Default color scheme
    colorScheme: "light",

    // Border radius preset: "xs" | "sm" | "md" | "lg" | "xl" | "full"
    radius: "md",

    // Typography
    fontFamily: "Inter, system-ui, sans-serif",
    fontFamilyMonospace: "JetBrains Mono, monospace",

    // Component-level overrides
    components: {
      Button: {
        defaultProps: {
          variant: "filled",
          size: "md",
          radius: "md",
        },
      },
    },
  },
});
```

All theme values are converted to CSS custom properties (e.g. `--nui-color-primary-filled`, `--nui-radius-md`) so you can reference them in your own styles.

## Components

### Button

Polymorphic button with variants, sizes, loading states, icons, and the `as` prop.

```tsx
<Button variant="filled" size="lg" color="blue">
  Primary Action
</Button>

<Button variant="outline" leftIcon={<IconMail />}>
  Send Email
</Button>

<Button as="a" href="/docs" variant="subtle">
  Read the Docs
</Button>

<Button loading>Submitting...</Button>

<Button disabled>Disabled</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `"filled" \| "outline" \| "subtle"` | `"filled"` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `color` | `ThemeColorName` | `"blue"` |
| `radius` | `RadiusSize` | `"md"` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `leftIcon` | `ReactNode` | - |
| `rightIcon` | `ReactNode` | - |
| `as` | `ElementType` | `"button"` |

### Input

Text input with labels, descriptions, error states, and section slots.

```tsx
<Input
  label="Email Address"
  placeholder="you@example.com"
  description="We'll never share your email."
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

<Input
  placeholder="Search..."
  leftSection={<IconSearch />}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | - |
| `description` | `string` | - |
| `error` | `string` | - |
| `size` | `Size` | `"md"` |
| `radius` | `RadiusSize` | `"md"` |
| `leftSection` | `ReactNode` | - |
| `rightSection` | `ReactNode` | - |
| `disabled` | `boolean` | `false` |

### Card

Container with configurable padding, shadow, and radius.

```tsx
<Card padding="lg" shadow="md" radius="lg" withBorder>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>
```

| Prop | Type | Default |
|------|------|---------|
| `padding` | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `shadow` | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` |
| `radius` | `RadiusSize` | `"md"` |
| `withBorder` | `boolean` | `true` |

### Modal

Overlay modal with portal rendering, escape-to-close, click-outside-to-close, and smooth animations.

```tsx
const [opened, setOpened] = useState(false);

<Button onClick={() => setOpened(true)}>Open Modal</Button>

<Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title="Confirmation"
  size="md"
>
  <p>Are you sure you want to continue?</p>
  <Button onClick={() => setOpened(false)}>Confirm</Button>
</Modal>
```

| Prop | Type | Default |
|------|------|---------|
| `opened` | `boolean` | - |
| `onClose` | `() => void` | - |
| `title` | `string` | - |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` |
| `radius` | `RadiusSize` | `"md"` |
| `overlayOpacity` | `number` | `0.5` |
| `closeOnClickOutside` | `boolean` | `true` |
| `closeOnEscape` | `boolean` | `true` |

## Hooks

### `useUI()`

Access the current theme from any component within `UIProvider`:

```tsx
const { theme, setTheme } = useUI();
```

### `useColorScheme()`

Toggle between light and dark mode:

```tsx
const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
```

### `useStyles()`

Resolve component styles using the theme's styling engine:

```tsx
const styles = useStyles("Button", { variant: "filled", size: "md" });
```

## All Exports

```tsx
// Core
import { createUI, UIContext } from "nui-react";

// Components
import { Button, Input, Card, Modal } from "nui-react";

// Hooks
import { useUI, useColorScheme, useStyles } from "nui-react";

// Theme
import { defaultTheme, defaultColors } from "nui-react";

// Utilities
import { deepMerge } from "nui-react";

// Types
import type {
  Theme,
  PartialTheme,
  ColorScheme,
  Size,
  RadiusSize,
  ThemeColorName,
  ButtonProps,
  ButtonVariant,
  InputProps,
  CardProps,
  ModalProps,
  UIContextValue,
  CreateUIConfig,
  UIInstance,
} from "nui-react";
```

## Building from Source

```bash
git clone <repo-url>
cd nui-react
pnpm install

# Build the library
pnpm build:lib

# Run the playground
pnpm dev
```

## License

MIT
