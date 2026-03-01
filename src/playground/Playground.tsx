"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createUI } from "../core/create-ui";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Badge } from "../components/Badge";
import { Tabs, TabsPanel } from "../components/Tabs";
import { Breadcrumb } from "../components/Breadcrumb";
import { Divider } from "../components/Divider";
import { Skeleton } from "../components/Skeleton";
import { Switch } from "../components/Switch";
import { ToastProvider, useToast } from "../components/Toast";
import { Avatar } from "../components/Avatar";
import { Tooltip } from "../components/Tooltip";
import { Progress } from "../components/Progress";
import { Alert } from "../components/Alert";
import { TextArea } from "../components/TextArea";
import { Select } from "../components/Select";
import { Accordion } from "../components/Accordion";
import { ActionIcon } from "../components/ActionIcon";
import { Group } from "../components/Group";
import { Stack } from "../components/Stack";
import { Text } from "../components/Text";
import { Title } from "../components/Title";
import { Anchor } from "../components/Anchor";
import { Kbd } from "../components/Kbd";
import { Loader } from "../components/Loader";
import { Chip } from "../components/Chip";
import { useColorScheme } from "../hooks/use-color-scheme";

const ui = createUI({ theme: { primaryColor: "violet", colorScheme: "light" } });

// ─── Navigation ────────────────────────────────
type NavItem = { id: string; label: string; group: string; keywords?: string };

const NAV: NavItem[] = [
  { id: "getting-started", label: "Getting Started", group: "Guide", keywords: "intro overview quick start" },
  { id: "installation", label: "Installation", group: "Guide", keywords: "npm yarn pnpm setup" },
  { id: "theming", label: "Theming", group: "Guide", keywords: "colors dark mode css variables" },
  { id: "button", label: "Button", group: "Inputs", keywords: "click action submit" },
  { id: "input", label: "Input", group: "Inputs", keywords: "text field form" },
  { id: "textarea", label: "TextArea", group: "Inputs", keywords: "multiline text" },
  { id: "select", label: "Select", group: "Inputs", keywords: "dropdown option" },
  { id: "switch", label: "Switch", group: "Inputs", keywords: "toggle boolean" },
  { id: "chip", label: "Chip", group: "Inputs", keywords: "filter select tag" },
  { id: "actionicon", label: "ActionIcon", group: "Inputs", keywords: "icon button" },
  { id: "card", label: "Card", group: "Data Display", keywords: "surface container" },
  { id: "badge", label: "Badge", group: "Data Display", keywords: "label tag status" },
  { id: "avatar", label: "Avatar", group: "Data Display", keywords: "user image profile" },
  { id: "accordion", label: "Accordion", group: "Data Display", keywords: "collapse expand" },
  { id: "tabs", label: "Tabs", group: "Navigation", keywords: "tab panel switch" },
  { id: "breadcrumb", label: "Breadcrumb", group: "Navigation", keywords: "path trail" },
  { id: "anchor", label: "Anchor", group: "Navigation", keywords: "link href" },
  { id: "modal", label: "Modal", group: "Overlays", keywords: "dialog popup" },
  { id: "tooltip", label: "Tooltip", group: "Overlays", keywords: "hover hint" },
  { id: "toast", label: "Toast", group: "Feedback", keywords: "notification snackbar" },
  { id: "alert", label: "Alert", group: "Feedback", keywords: "warning info error" },
  { id: "progress", label: "Progress", group: "Feedback", keywords: "bar loading percent" },
  { id: "skeleton", label: "Skeleton", group: "Feedback", keywords: "loading placeholder" },
  { id: "loader", label: "Loader", group: "Feedback", keywords: "spinner loading" },
  { id: "divider", label: "Divider", group: "Layout", keywords: "separator line" },
  { id: "group", label: "Group", group: "Layout", keywords: "horizontal flex row" },
  { id: "stack", label: "Stack", group: "Layout", keywords: "vertical flex column" },
  { id: "text", label: "Text", group: "Typography", keywords: "paragraph body" },
  { id: "title", label: "Title", group: "Typography", keywords: "heading h1 h2 h3" },
  { id: "kbd", label: "Kbd", group: "Typography", keywords: "keyboard shortcut" },
  { id: "about", label: "About NUI", group: "Meta", keywords: "team philosophy github" },
];

const GROUPS = ["Guide", "Inputs", "Data Display", "Navigation", "Overlays", "Feedback", "Layout", "Typography", "Meta"] as const;

// ─── Icons ─────────────────────────────────────
function SearchIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function MoonIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>; }
function SunIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>; }
function GithubIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>; }
function MenuIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }

// ─── Code Block ────────────────────────────────
function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="docs-codeblock">
      <div className="docs-codeblock-header"><span className="docs-codeblock-lang">{lang}</span></div>
      <div className="docs-codeblock-body">
        <button className="docs-copy-btn" onClick={copy} aria-label="Copy">
          {copied ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
        </button>
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

function Demo({ children, direction = "row" }: { children: React.ReactNode; direction?: "row" | "column" }) {
  return <div className="docs-demo" style={{ display: "flex", flexDirection: direction, flexWrap: "wrap", gap: "0.75rem", alignItems: direction === "row" ? "center" : "stretch" }}>{children}</div>;
}

function PropsTable({ data }: { data: { name: string; type: string; default: string; desc: string }[] }) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>{data.map(r => <tr key={r.name}><td><code>{r.name}</code></td><td><code className="docs-type">{r.type}</code></td><td><code>{r.default}</code></td><td>{r.desc}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

// ─── Search Modal ──────────────────────────────
function SearchModal({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim() === "" ? NAV : NAV.filter(n => `${n.label} ${n.group} ${n.keywords || ""}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => { if (open) { setQuery(""); setActiveIdx(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);
  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      else if (e.key === "Enter" && results[activeIdx]) { onNavigate(results[activeIdx].id); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, activeIdx, onClose, onNavigate]);

  if (!open) return null;
  return (
    <div className="docs-search-overlay" onClick={onClose}>
      <div className="docs-search-modal" onClick={e => e.stopPropagation()}>
        <div className="docs-search-input-wrap">
          <SearchIcon size={18} />
          <input ref={inputRef} className="docs-search-input" placeholder="Search components..." value={query} onChange={e => setQuery(e.target.value)} />
          <span className="docs-kbd">Esc</span>
        </div>
        <div className="docs-search-results">
          {results.length === 0 ? <div className="docs-search-empty">No results found.</div> : results.map((item, i) => (
            <button key={item.id} className={`docs-search-item ${i === activeIdx ? "docs-search-item-active" : ""}`} onClick={() => { onNavigate(item.id); onClose(); }}>
              <span className="docs-search-item-group">{item.group}</span>
              <span className="docs-search-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page Content ──────────────────────────────
function PageContent({ section }: { section: string }) {
  switch (section) {
    case "getting-started": return <GettingStartedPage />;
    case "installation": return <InstallationPage />;
    case "theming": return <ThemingPage />;
    case "button": return <ButtonPage />;
    case "input": return <InputPage />;
    case "textarea": return <TextAreaPage />;
    case "select": return <SelectPage />;
    case "switch": return <SwitchPage />;
    case "chip": return <ChipPage />;
    case "actionicon": return <ActionIconPage />;
    case "card": return <CardPage />;
    case "badge": return <BadgePage />;
    case "avatar": return <AvatarPage />;
    case "accordion": return <AccordionPage />;
    case "tabs": return <TabsPage />;
    case "breadcrumb": return <BreadcrumbPage />;
    case "anchor": return <AnchorPage />;
    case "modal": return <ModalPage />;
    case "tooltip": return <TooltipPage />;
    case "toast": return <ToastPage />;
    case "alert": return <AlertPage />;
    case "progress": return <ProgressPage />;
    case "skeleton": return <SkeletonPage />;
    case "loader": return <LoaderPage />;
    case "divider": return <DividerPage />;
    case "group": return <GroupPage />;
    case "stack": return <StackPage />;
    case "text": return <TextPage />;
    case "title": return <TitlePage />;
    case "kbd": return <KbdPage />;
    case "about": return <AboutPage />;
    default: return <GettingStartedPage />;
  }
}

// ───────────────────── Guide Pages ─────────────
function GettingStartedPage() {
  return (
    <>
      <h1 className="docs-page-title">Getting Started</h1>
      <p className="docs-page-desc">NUI is a zero-dependency React UI library with powerful theming, CSS variable injection, and a component-per-folder architecture. 27+ components ready to use.</p>
      <div className="docs-features-grid">
        {[
          { t: "Zero Dependencies", d: "Only react and react-dom as peer deps. No CSS-in-JS runtime." },
          { t: "Powerful Theming", d: "10-shade color scales, dark mode, full CSS variable generation." },
          { t: "createUI() Factory", d: "Isolated instances with their own context, theme, and CSS scope." },
          { t: "27+ Components", d: "Buttons, inputs, cards, modals, tabs, toasts, and more." },
          { t: "Polymorphic Components", d: "Render as any element with type-safe `as` prop." },
          { t: "Tree Shakeable", d: "ESM + CJS dual output with sideEffects: false." },
          { t: "TypeScript First", d: "Full type definitions for every component and hook." },
          { t: "Dark Mode Built-in", d: "One toggle switches the entire theme via CSS variables." },
        ].map(f => <div key={f.t} className="docs-feature-card"><h3>{f.t}</h3><p>{f.d}</p></div>)}
      </div>
      <h2 className="docs-h2">Quick Start</h2>
      <CodeBlock code={`import { createUI, Button } from "nui-react";

const { UIProvider } = createUI({
  theme: { primaryColor: "blue" }
});

function App() {
  return (
    <UIProvider>
      <Button>Click me</Button>
    </UIProvider>
  );
}`} />
    </>
  );
}

function InstallationPage() {
  return (
    <>
      <h1 className="docs-page-title">Installation</h1>
      <p className="docs-page-desc">Install NUI with your preferred package manager.</p>
      <h2 className="docs-h2">npm</h2>
      <CodeBlock code="npm install nui-react" lang="bash" />
      <h2 className="docs-h2">yarn</h2>
      <CodeBlock code="yarn add nui-react" lang="bash" />
      <h2 className="docs-h2">pnpm</h2>
      <CodeBlock code="pnpm add nui-react" lang="bash" />
      <h2 className="docs-h2">Setup</h2>
      <p className="docs-text">Wrap your app in the UIProvider from <code>createUI()</code>:</p>
      <CodeBlock code={`import { createUI } from "nui-react";

const { UIProvider } = createUI({
  theme: {
    primaryColor: "blue",
    colorScheme: "light",
  },
});

export default function App({ children }) {
  return <UIProvider>{children}</UIProvider>;
}`} />
    </>
  );
}

function ThemingPage() {
  return (
    <>
      <h1 className="docs-page-title">Theming</h1>
      <p className="docs-page-desc">NUI generates CSS custom properties from your theme object. Every token maps to a <code>--nui-*</code> variable.</p>
      <h2 className="docs-h2">Theme Object</h2>
      <CodeBlock code={`createUI({
  theme: {
    primaryColor: "blue",    // or "red", "green", "cyan", "violet"...
    colorScheme: "light",    // "light" | "dark"
    fontFamily: "Inter, sans-serif",
    radius: { md: "8px" },
    spacing: { md: "1rem" },
    components: {
      Button: {
        defaultProps: { radius: "lg" },
        styles: { root: { fontWeight: 700 } },
      },
    },
  },
});`} />
      <h2 className="docs-h2">Dark Mode</h2>
      <p className="docs-text">Use the <code>useColorScheme()</code> hook to toggle dark mode at runtime. The entire UI re-themes instantly.</p>
      <CodeBlock code={`import { useColorScheme } from "nui-react";

function ThemeToggle() {
  const { colorScheme, toggle } = useColorScheme();
  return <Button onClick={toggle}>{colorScheme} mode</Button>;
}`} />
      <h2 className="docs-h2">Color Scales</h2>
      <p className="docs-text">Each color has a 10-shade scale (0-9). Shade 6 is the default filled color in light mode, shade 8 in dark mode. Available colors: <code>primary</code>, <code>secondary</code>, <code>gray</code>, <code>red</code>, <code>green</code>, <code>blue</code>, <code>yellow</code>, <code>cyan</code>, <code>violet</code>.</p>
      <h2 className="docs-h2">Component Overrides</h2>
      <p className="docs-text">Override any component globally via <code>theme.components</code>:</p>
      <CodeBlock code={`components: {
  Button: {
    defaultProps: { radius: "xl", size: "lg" },
    styles: { root: { textTransform: "uppercase" } },
    variants: {
      variant: {
        filled: { root: { boxShadow: "0 2px 8px rgba(0,0,0,0.2)" } },
      },
    },
  },
}`} />
    </>
  );
}

// ───────────────────── Input Pages ─────────────
function ButtonPage() {
  return (
    <>
      <h1 className="docs-page-title">Button</h1>
      <p className="docs-page-desc">Polymorphic button with variants, sizes, loading states, and icon support.</p>
      <CodeBlock code={`import { Button } from "nui-react";`} />
      <h2 className="docs-h2">Variants</h2>
      <Demo><Button variant="filled">Filled</Button><Button variant="outline">Outline</Button><Button variant="subtle">Subtle</Button></Demo>
      <CodeBlock code={`<Button variant="filled">Filled</Button>
<Button variant="outline">Outline</Button>
<Button variant="subtle">Subtle</Button>`} />
      <h2 className="docs-h2">Sizes</h2>
      <Demo><Button size="xs">XS</Button><Button size="sm">SM</Button><Button size="md">MD</Button><Button size="lg">LG</Button><Button size="xl">XL</Button></Demo>
      <h2 className="docs-h2">Colors</h2>
      <Demo><Button color="blue">Blue</Button><Button color="red">Red</Button><Button color="green">Green</Button><Button color="cyan">Cyan</Button><Button color="violet">Violet</Button></Demo>
      <h2 className="docs-h2">Loading</h2>
      <Demo><Button loading>Loading</Button><Button loading variant="outline">Loading</Button></Demo>
      <CodeBlock code={`<Button loading>Loading</Button>`} />
      <h2 className="docs-h2">Full Width</h2>
      <Demo direction="column"><Button fullWidth>Full Width Button</Button></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "variant", type: '"filled" | "outline" | "subtle"', default: '"filled"', desc: "Visual style" },
        { name: "size", type: "Size", default: '"md"', desc: "Button size" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Theme color" },
        { name: "radius", type: "RadiusSize", default: '"md"', desc: "Border radius" },
        { name: "loading", type: "boolean", default: "false", desc: "Shows spinner" },
        { name: "disabled", type: "boolean", default: "false", desc: "Disabled state" },
        { name: "fullWidth", type: "boolean", default: "false", desc: "Stretches to container" },
        { name: "as", type: "ElementType", default: '"button"', desc: "Polymorphic element" },
      ]} />
    </>
  );
}

function InputPage() {
  return (
    <>
      <h1 className="docs-page-title">Input</h1>
      <p className="docs-page-desc">Text input with label, description, error states, and section slots.</p>
      <CodeBlock code={`import { Input } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Input label="Email" placeholder="you@example.com" /><Input label="Password" placeholder="Enter password" error="Password is required" /></Demo>
      <CodeBlock code={`<Input label="Email" placeholder="you@example.com" />
<Input label="Password" error="Password is required" />`} />
      <h2 className="docs-h2">With Description</h2>
      <Demo direction="column"><Input label="Username" description="Choose a unique username" placeholder="john_doe" /></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "label", type: "string", default: "-", desc: "Input label" },
        { name: "description", type: "string", default: "-", desc: "Helper text below label" },
        { name: "error", type: "string", default: "-", desc: "Error message" },
        { name: "size", type: "Size", default: '"md"', desc: "Input size" },
        { name: "radius", type: "RadiusSize", default: '"md"', desc: "Border radius" },
      ]} />
    </>
  );
}

function TextAreaPage() {
  return (
    <>
      <h1 className="docs-page-title">TextArea</h1>
      <p className="docs-page-desc">Multi-line text input with label, description, and error support.</p>
      <CodeBlock code={`import { TextArea } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><TextArea label="Message" placeholder="Type your message..." /><TextArea label="Bio" description="Tell us about yourself" error="Required field" /></Demo>
      <CodeBlock code={`<TextArea label="Message" placeholder="Type your message..." />
<TextArea label="Bio" error="Required field" />`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "label", type: "string", default: "-", desc: "Label text" },
        { name: "description", type: "string", default: "-", desc: "Helper text" },
        { name: "error", type: "string", default: "-", desc: "Error message" },
        { name: "size", type: "Size", default: '"md"', desc: "TextArea size" },
        { name: "rows", type: "number", default: "4", desc: "Visible rows" },
      ]} />
    </>
  );
}

function SelectPage() {
  const [val, setVal] = useState("");
  return (
    <>
      <h1 className="docs-page-title">Select</h1>
      <p className="docs-page-desc">Native select dropdown with consistent styling across browsers.</p>
      <CodeBlock code={`import { Select } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Select label="Framework" placeholder="Pick one" value={val} onChange={setVal} options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }, { value: "svelte", label: "Svelte" }]} /></Demo>
      <CodeBlock code={`<Select
  label="Framework"
  placeholder="Pick one"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]}
/>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "options", type: "SelectOption[]", default: "[]", desc: "Array of { value, label, disabled? }" },
        { name: "value", type: "string", default: "-", desc: "Selected value" },
        { name: "onChange", type: "(value: string) => void", default: "-", desc: "Change handler" },
        { name: "label", type: "string", default: "-", desc: "Label text" },
        { name: "placeholder", type: "string", default: "-", desc: "Placeholder text" },
        { name: "error", type: "string", default: "-", desc: "Error message" },
      ]} />
    </>
  );
}

function SwitchPage() {
  const [on, setOn] = useState(false);
  return (
    <>
      <h1 className="docs-page-title">Switch</h1>
      <p className="docs-page-desc">Toggle switch for boolean values with label support.</p>
      <CodeBlock code={`import { Switch } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo><Switch checked={on} onChange={setOn} label="Enable notifications" /><Switch checked disabled label="Disabled" /></Demo>
      <CodeBlock code={`<Switch checked={on} onChange={setOn} label="Enable notifications" />`} />
      <h2 className="docs-h2">Sizes & Colors</h2>
      <Demo><Switch checked size="sm" label="Small" color="green" onChange={() => {}} /><Switch checked size="md" label="Medium" color="blue" onChange={() => {}} /><Switch checked size="lg" label="Large" color="violet" onChange={() => {}} /></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "checked", type: "boolean", default: "false", desc: "Checked state" },
        { name: "onChange", type: "(v: boolean) => void", default: "-", desc: "Change handler" },
        { name: "label", type: "string", default: "-", desc: "Label text" },
        { name: "size", type: "Size", default: '"md"', desc: "Switch size" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Active color" },
        { name: "disabled", type: "boolean", default: "false", desc: "Disabled state" },
      ]} />
    </>
  );
}

function ChipPage() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <>
      <h1 className="docs-page-title">Chip</h1>
      <p className="docs-page-desc">Selectable chip for filter groups, tags, and multi-select patterns.</p>
      <CodeBlock code={`import { Chip } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo><Chip checked={a} onChange={setA}>React</Chip><Chip checked={b} onChange={setB}>Vue</Chip><Chip disabled>Disabled</Chip></Demo>
      <CodeBlock code={`<Chip checked={checked} onChange={setChecked}>React</Chip>`} />
      <h2 className="docs-h2">Filled Variant</h2>
      <Demo><Chip checked variant="filled" color="blue" onChange={() => {}}>Blue</Chip><Chip checked variant="filled" color="green" onChange={() => {}}>Green</Chip><Chip checked variant="filled" color="red" onChange={() => {}}>Red</Chip></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "checked", type: "boolean", default: "false", desc: "Selected state" },
        { name: "onChange", type: "(v: boolean) => void", default: "-", desc: "Toggle handler" },
        { name: "variant", type: '"filled" | "outline"', default: '"outline"', desc: "Visual style" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Color" },
        { name: "size", type: "Size", default: '"md"', desc: "Chip size" },
      ]} />
    </>
  );
}

function ActionIconPage() {
  return (
    <>
      <h1 className="docs-page-title">ActionIcon</h1>
      <p className="docs-page-desc">Icon-only button with variant and color support.</p>
      <CodeBlock code={`import { ActionIcon } from "nui-react";`} />
      <h2 className="docs-h2">Variants</h2>
      <Demo>
        <ActionIcon variant="filled" color="blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg></ActionIcon>
        <ActionIcon variant="outline" color="blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg></ActionIcon>
        <ActionIcon variant="subtle" color="blue"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg></ActionIcon>
      </Demo>
      <CodeBlock code={`<ActionIcon variant="filled" color="blue">
  <PlusIcon />
</ActionIcon>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "variant", type: '"filled" | "outline" | "subtle"', default: '"subtle"', desc: "Visual style" },
        { name: "size", type: "Size", default: '"md"', desc: "Button size" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Color" },
        { name: "radius", type: "RadiusSize", default: '"md"', desc: "Border radius" },
      ]} />
    </>
  );
}

// ───────────────────── Data Display ────────────
function CardPage() {
  return (
    <>
      <h1 className="docs-page-title">Card</h1>
      <p className="docs-page-desc">Surface container with padding, shadow, and radius variants.</p>
      <CodeBlock code={`import { Card } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Card><Text>This is a basic card with default styling.</Text></Card><Card shadow="md" padding="xl"><Title order={4}>Featured</Title><Text size="sm" color="dimmed">Card with more padding and shadow.</Text></Card></Demo>
      <CodeBlock code={`<Card shadow="md" padding="xl">
  <Title order={4}>Featured</Title>
  <Text size="sm" color="dimmed">Content</Text>
</Card>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "padding", type: '"none" | "sm" | "md" | "lg" | "xl"', default: '"md"', desc: "Inner padding" },
        { name: "shadow", type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"', default: '"sm"', desc: "Box shadow" },
        { name: "radius", type: "RadiusSize", default: '"md"', desc: "Border radius" },
        { name: "withBorder", type: "boolean", default: "true", desc: "Show border" },
      ]} />
    </>
  );
}

function BadgePage() {
  return (
    <>
      <h1 className="docs-page-title">Badge</h1>
      <p className="docs-page-desc">Label for status, categories, and counts.</p>
      <CodeBlock code={`import { Badge } from "nui-react";`} />
      <h2 className="docs-h2">Variants</h2>
      <Demo><Badge variant="filled">Filled</Badge><Badge variant="outline">Outline</Badge><Badge variant="subtle">Subtle</Badge></Demo>
      <h2 className="docs-h2">Colors</h2>
      <Demo><Badge color="blue">Blue</Badge><Badge color="red">Red</Badge><Badge color="green">Green</Badge><Badge color="yellow">Yellow</Badge><Badge color="cyan">Cyan</Badge><Badge color="violet">Violet</Badge></Demo>
      <CodeBlock code={`<Badge color="green" variant="filled">Active</Badge>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "variant", type: '"filled" | "outline" | "subtle"', default: '"filled"', desc: "Visual style" },
        { name: "size", type: "Size", default: '"md"', desc: "Badge size" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Color" },
        { name: "radius", type: "RadiusSize", default: '"xl"', desc: "Border radius" },
      ]} />
    </>
  );
}

function AvatarPage() {
  return (
    <>
      <h1 className="docs-page-title">Avatar</h1>
      <p className="docs-page-desc">User avatar with image, initials fallback, and color support.</p>
      <CodeBlock code={`import { Avatar } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo>
        <Avatar name="John Doe" color="blue" />
        <Avatar name="Alice Smith" color="green" />
        <Avatar name="Bob" color="red" size="lg" />
        <Avatar color="violet" size="xl">V</Avatar>
      </Demo>
      <CodeBlock code={`<Avatar name="John Doe" color="blue" />
<Avatar color="violet" size="xl">V</Avatar>`} />
      <h2 className="docs-h2">Sizes</h2>
      <Demo><Avatar name="A" size="xs" /><Avatar name="B" size="sm" /><Avatar name="C" size="md" /><Avatar name="D" size="lg" /><Avatar name="E" size="xl" /></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "src", type: "string", default: "-", desc: "Image URL" },
        { name: "name", type: "string", default: "-", desc: "Name for initials fallback" },
        { name: "size", type: "Size", default: '"md"', desc: "Avatar size" },
        { name: "radius", type: "RadiusSize", default: '"full"', desc: "Border radius" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Background color" },
      ]} />
    </>
  );
}

function AccordionPage() {
  return (
    <>
      <h1 className="docs-page-title">Accordion</h1>
      <p className="docs-page-desc">Collapsible content sections with multiple style variants.</p>
      <CodeBlock code={`import { Accordion } from "nui-react";`} />
      <h2 className="docs-h2">Default</h2>
      <Demo direction="column">
        <Accordion items={[
          { value: "a", label: "What is NUI?", content: "NUI is a zero-dependency React UI library with powerful theming." },
          { value: "b", label: "How does theming work?", content: "NUI generates CSS custom properties from a theme object." },
          { value: "c", label: "Is it tree-shakeable?", content: "Yes, NUI outputs ESM with sideEffects: false." },
        ]} />
      </Demo>
      <CodeBlock code={`<Accordion items={[
  { value: "a", label: "Question?", content: "Answer." },
  { value: "b", label: "Another?", content: "Yes." },
]} />`} />
      <h2 className="docs-h2">Separated Variant</h2>
      <Demo direction="column">
        <Accordion variant="separated" items={[
          { value: "a", label: "First item", content: "Content for the first item." },
          { value: "b", label: "Second item", content: "Content for the second item." },
        ]} />
      </Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "items", type: "AccordionItem[]", default: "-", desc: "{ value, label, content, disabled? }" },
        { name: "variant", type: '"default" | "contained" | "separated"', default: '"default"', desc: "Visual style" },
        { name: "multiple", type: "boolean", default: "false", desc: "Allow multiple open" },
        { name: "defaultValue", type: "string[]", default: "[]", desc: "Initially open items" },
      ]} />
    </>
  );
}

// ───────────────────── Navigation Pages ────────
function TabsPage() {
  const [tab, setTab] = useState("a");
  return (
    <>
      <h1 className="docs-page-title">Tabs</h1>
      <p className="docs-page-desc">Tab navigation with content panels and multiple style variants.</p>
      <CodeBlock code={`import { Tabs, TabsPanel } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column">
        <Tabs value={tab} onChange={setTab} items={[{ value: "a", label: "Overview" }, { value: "b", label: "Features" }, { value: "c", label: "Pricing" }]}>
          <TabsPanel value="a" activeValue={tab}><Text>Overview content</Text></TabsPanel>
          <TabsPanel value="b" activeValue={tab}><Text>Features content</Text></TabsPanel>
          <TabsPanel value="c" activeValue={tab}><Text>Pricing content</Text></TabsPanel>
        </Tabs>
      </Demo>
      <CodeBlock code={`<Tabs value={tab} onChange={setTab} items={items}>
  <TabsPanel value="a" activeValue={tab}>Content</TabsPanel>
</Tabs>`} />
      <h2 className="docs-h2">Variants</h2>
      <Demo direction="column">
        <Text size="sm" weight={600}>Pills</Text>
        <Tabs value="a" onChange={() => {}} variant="pills" items={[{ value: "a", label: "Tab 1" }, { value: "b", label: "Tab 2" }]} />
        <Text size="sm" weight={600}>Outline</Text>
        <Tabs value="a" onChange={() => {}} variant="outline" items={[{ value: "a", label: "Tab 1" }, { value: "b", label: "Tab 2" }]} />
      </Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "value", type: "string", default: "-", desc: "Active tab value" },
        { name: "onChange", type: "(v: string) => void", default: "-", desc: "Tab change handler" },
        { name: "items", type: "TabItem[]", default: "-", desc: "{ value, label, disabled? }" },
        { name: "variant", type: '"default" | "outline" | "pills"', default: '"default"', desc: "Tab style" },
      ]} />
    </>
  );
}

function BreadcrumbPage() {
  return (
    <>
      <h1 className="docs-page-title">Breadcrumb</h1>
      <p className="docs-page-desc">Navigation trail showing the path to the current page.</p>
      <CodeBlock code={`import { Breadcrumb } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo><Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Docs", href: "#" }, { label: "Breadcrumb" }]} /></Demo>
      <CodeBlock code={`<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Breadcrumb" },
]} />`} />
      <h2 className="docs-h2">Custom Separator</h2>
      <Demo><Breadcrumb separator=">" items={[{ label: "Home", href: "#" }, { label: "Settings", href: "#" }, { label: "Profile" }]} /></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "items", type: "BreadcrumbItem[]", default: "-", desc: "{ label, href?, onClick? }" },
        { name: "separator", type: "ReactNode", default: '"/"', desc: "Separator character" },
      ]} />
    </>
  );
}

function AnchorPage() {
  return (
    <>
      <h1 className="docs-page-title">Anchor</h1>
      <p className="docs-page-desc">Styled anchor element with theme color and underline control.</p>
      <CodeBlock code={`import { Anchor } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo><Anchor href="#">Default link</Anchor><Anchor href="#" color="red">Red link</Anchor><Anchor href="#" underline="always">Always underlined</Anchor></Demo>
      <CodeBlock code={`<Anchor href="#" color="red">Red link</Anchor>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Link color" },
        { name: "size", type: "Size", default: '"md"', desc: "Font size" },
        { name: "underline", type: '"always" | "hover" | "never"', default: '"hover"', desc: "Underline behavior" },
      ]} />
    </>
  );
}

// ───────────────────── Overlay Pages ───────────
function ModalPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1 className="docs-page-title">Modal</h1>
      <p className="docs-page-desc">Dialog overlay with portal rendering, escape-to-close, and animations.</p>
      <CodeBlock code={`import { Modal } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo><Button onClick={() => setOpen(true)}>Open Modal</Button></Demo>
      <Modal opened={open} onClose={() => setOpen(false)} title="Modal Title"><Text>This is a modal dialog. Press Escape or click outside to close.</Text><div style={{ marginTop: "1rem" }}><Button onClick={() => setOpen(false)}>Close</Button></div></Modal>
      <CodeBlock code={`<Modal opened={open} onClose={close} title="Title">
  <Text>Modal content</Text>
</Modal>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "opened", type: "boolean", default: "false", desc: "Visibility state" },
        { name: "onClose", type: "() => void", default: "-", desc: "Close handler" },
        { name: "title", type: "ReactNode", default: "-", desc: "Modal title" },
        { name: "size", type: "Size", default: '"md"', desc: "Modal width" },
        { name: "radius", type: "RadiusSize", default: '"md"', desc: "Border radius" },
        { name: "closeOnClickOutside", type: "boolean", default: "true", desc: "Close on backdrop click" },
        { name: "closeOnEscape", type: "boolean", default: "true", desc: "Close on Escape key" },
      ]} />
    </>
  );
}

function TooltipPage() {
  return (
    <>
      <h1 className="docs-page-title">Tooltip</h1>
      <p className="docs-page-desc">Contextual hint shown on hover with position control.</p>
      <CodeBlock code={`import { Tooltip } from "nui-react";`} />
      <h2 className="docs-h2">Positions</h2>
      <Demo>
        <Tooltip label="Top tooltip" position="top"><Button variant="outline">Top</Button></Tooltip>
        <Tooltip label="Bottom tooltip" position="bottom"><Button variant="outline">Bottom</Button></Tooltip>
        <Tooltip label="Left tooltip" position="left"><Button variant="outline">Left</Button></Tooltip>
        <Tooltip label="Right tooltip" position="right"><Button variant="outline">Right</Button></Tooltip>
      </Demo>
      <CodeBlock code={`<Tooltip label="Tooltip text" position="top">
  <Button>Hover me</Button>
</Tooltip>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "label", type: "ReactNode", default: "-", desc: "Tooltip content" },
        { name: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', desc: "Placement" },
        { name: "disabled", type: "boolean", default: "false", desc: "Disable tooltip" },
      ]} />
    </>
  );
}

// ───────────────────── Feedback Pages ──────────
function ToastPage() {
  const toast = useToast();
  return (
    <>
      <h1 className="docs-page-title">Toast</h1>
      <p className="docs-page-desc">Notification system with ToastProvider, useToast hook, auto-dismiss, and positioning.</p>
      <CodeBlock code={`import { ToastProvider, useToast } from "nui-react";`} />
      <h2 className="docs-h2">Usage</h2>
      <Demo>
        <Button onClick={() => toast.show({ title: "Success", message: "Operation completed.", color: "green" })}>Success</Button>
        <Button onClick={() => toast.show({ title: "Error", message: "Something went wrong.", color: "red" })} color="red">Error</Button>
        <Button onClick={() => toast.show({ title: "Info", message: "Here is some info.", color: "blue" })} variant="outline">Info</Button>
      </Demo>
      <CodeBlock code={`const toast = useToast();
toast.show({ title: "Success", message: "Done!", color: "green" });`} />
      <h2 className="docs-h2">Setup</h2>
      <CodeBlock code={`// Wrap your app
<ToastProvider position="top-right">
  <App />
</ToastProvider>`} />
      <h2 className="docs-h2">Toast Options</h2>
      <PropsTable data={[
        { name: "title", type: "string", default: "-", desc: "Toast title" },
        { name: "message", type: "string", default: "-", desc: "Toast message" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Indicator color" },
        { name: "duration", type: "number", default: "4000", desc: "Auto-dismiss ms" },
      ]} />
    </>
  );
}

function AlertPage() {
  return (
    <>
      <h1 className="docs-page-title">Alert</h1>
      <p className="docs-page-desc">Contextual feedback messages for user actions.</p>
      <CodeBlock code={`import { Alert } from "nui-react";`} />
      <h2 className="docs-h2">Variants</h2>
      <Demo direction="column">
        <Alert title="Info" color="blue" variant="subtle">This is a subtle info alert.</Alert>
        <Alert title="Success" color="green" variant="filled">Operation completed.</Alert>
        <Alert title="Warning" color="yellow" variant="outline">Please check your input.</Alert>
        <Alert title="Error" color="red" variant="filled" withCloseButton onClose={() => {}}>Something went wrong.</Alert>
      </Demo>
      <CodeBlock code={`<Alert title="Info" color="blue" variant="subtle">
  This is an alert message.
</Alert>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "variant", type: '"filled" | "outline" | "subtle"', default: '"subtle"', desc: "Visual style" },
        { name: "color", type: "ThemeColorName", default: '"blue"', desc: "Alert color" },
        { name: "title", type: "string", default: "-", desc: "Alert title" },
        { name: "icon", type: "ReactNode", default: "-", desc: "Icon element" },
        { name: "withCloseButton", type: "boolean", default: "false", desc: "Show close button" },
      ]} />
    </>
  );
}

function ProgressPage() {
  return (
    <>
      <h1 className="docs-page-title">Progress</h1>
      <p className="docs-page-desc">Progress bar with striped and animated variants.</p>
      <CodeBlock code={`import { Progress } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Progress value={65} /><Progress value={40} color="green" /><Progress value={80} color="red" size="lg" /></Demo>
      <CodeBlock code={`<Progress value={65} />
<Progress value={40} color="green" />`} />
      <h2 className="docs-h2">Striped & Animated</h2>
      <Demo direction="column"><Progress value={55} striped /><Progress value={70} striped animated color="cyan" /></Demo>
      <h2 className="docs-h2">With Label</h2>
      <Demo direction="column"><Progress value={75} size="xl" label="75%" /></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "value", type: "number", default: "0", desc: "Progress 0-100" },
        { name: "size", type: "Size", default: '"md"', desc: "Bar height" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Bar color" },
        { name: "striped", type: "boolean", default: "false", desc: "Striped pattern" },
        { name: "animated", type: "boolean", default: "false", desc: "Animate stripes" },
        { name: "label", type: "string", default: "-", desc: "Centered label text" },
      ]} />
    </>
  );
}

function SkeletonPage() {
  return (
    <>
      <h1 className="docs-page-title">Skeleton</h1>
      <p className="docs-page-desc">Placeholder loading animation for content that is loading.</p>
      <CodeBlock code={`import { Skeleton } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Skeleton height="1rem" width="60%" /><Skeleton height="1rem" width="80%" /><Skeleton height="1rem" width="40%" /></Demo>
      <h2 className="docs-h2">Circle</h2>
      <Demo><Skeleton circle width="3rem" height="3rem" /><Skeleton circle width="2rem" height="2rem" /></Demo>
      <CodeBlock code={`<Skeleton height="1rem" width="60%" />
<Skeleton circle width="3rem" height="3rem" />`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "width", type: "string | number", default: '"100%"', desc: "Skeleton width" },
        { name: "height", type: "string | number", default: "-", desc: "Skeleton height" },
        { name: "circle", type: "boolean", default: "false", desc: "Circle shape" },
        { name: "radius", type: "RadiusSize", default: '"md"', desc: "Border radius" },
        { name: "animate", type: "boolean", default: "true", desc: "Pulse animation" },
        { name: "visible", type: "boolean", default: "true", desc: "Show skeleton" },
      ]} />
    </>
  );
}

function LoaderPage() {
  return (
    <>
      <h1 className="docs-page-title">Loader</h1>
      <p className="docs-page-desc">Spinning loading indicator with size and color support.</p>
      <CodeBlock code={`import { Loader } from "nui-react";`} />
      <h2 className="docs-h2">Sizes</h2>
      <Demo><Loader size="xs" /><Loader size="sm" /><Loader size="md" /><Loader size="lg" /><Loader size="xl" /></Demo>
      <h2 className="docs-h2">Colors</h2>
      <Demo><Loader color="blue" /><Loader color="red" /><Loader color="green" /><Loader color="violet" /></Demo>
      <CodeBlock code={`<Loader size="md" color="blue" />`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "size", type: "Size", default: '"md"', desc: "Loader size" },
        { name: "color", type: "ThemeColorName", default: '"primary"', desc: "Spinner color" },
      ]} />
    </>
  );
}

// ───────────────────── Layout Pages ────────────
function DividerPage() {
  return (
    <>
      <h1 className="docs-page-title">Divider</h1>
      <p className="docs-page-desc">Horizontal or vertical separator with optional label.</p>
      <CodeBlock code={`import { Divider } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Divider /><Divider label="OR" /><Divider label="Left" labelPosition="left" /><Divider label="Right" labelPosition="right" /></Demo>
      <CodeBlock code={`<Divider />
<Divider label="OR" />
<Divider label="Left" labelPosition="left" />`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', desc: "Direction" },
        { name: "label", type: "ReactNode", default: "-", desc: "Label text" },
        { name: "labelPosition", type: '"left" | "center" | "right"', default: '"center"', desc: "Label position" },
      ]} />
    </>
  );
}

function GroupPage() {
  return (
    <>
      <h1 className="docs-page-title">Group</h1>
      <p className="docs-page-desc">Horizontal flex container with gap, alignment, and wrapping control.</p>
      <CodeBlock code={`import { Group } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Group><Button>One</Button><Button variant="outline">Two</Button><Button variant="subtle">Three</Button></Group></Demo>
      <CodeBlock code={`<Group gap="md" justify="flex-start">
  <Button>One</Button>
  <Button>Two</Button>
</Group>`} />
      <h2 className="docs-h2">Justify</h2>
      <Demo direction="column">
        <Group justify="center"><Badge>A</Badge><Badge>B</Badge><Badge>C</Badge></Group>
        <Group justify="space-between"><Badge>Left</Badge><Badge>Right</Badge></Group>
      </Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "gap", type: "Size | string", default: '"md"', desc: "Gap between items" },
        { name: "align", type: "CSS alignItems", default: '"center"', desc: "Vertical alignment" },
        { name: "justify", type: "CSS justifyContent", default: '"flex-start"', desc: "Horizontal alignment" },
        { name: "wrap", type: "CSS flexWrap", default: '"wrap"', desc: "Wrapping behavior" },
      ]} />
    </>
  );
}

function StackPage() {
  return (
    <>
      <h1 className="docs-page-title">Stack</h1>
      <p className="docs-page-desc">Vertical flex container for stacking elements with consistent spacing.</p>
      <CodeBlock code={`import { Stack } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo direction="column"><Stack gap="sm"><Button fullWidth>First</Button><Button fullWidth variant="outline">Second</Button><Button fullWidth variant="subtle">Third</Button></Stack></Demo>
      <CodeBlock code={`<Stack gap="sm">
  <Button fullWidth>First</Button>
  <Button fullWidth>Second</Button>
</Stack>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "gap", type: "Size | string", default: '"md"', desc: "Gap between items" },
        { name: "align", type: "CSS alignItems", default: '"stretch"', desc: "Horizontal alignment" },
        { name: "justify", type: "CSS justifyContent", default: '"flex-start"', desc: "Vertical alignment" },
      ]} />
    </>
  );
}

// ───────────────────── Typography Pages ────────
function TextPage() {
  return (
    <>
      <h1 className="docs-page-title">Text</h1>
      <p className="docs-page-desc">Body text component with size, color, weight, truncation, and line clamping.</p>
      <CodeBlock code={`import { Text } from "nui-react";`} />
      <h2 className="docs-h2">Sizes</h2>
      <Demo direction="column"><Text size="xs">Extra small text</Text><Text size="sm">Small text</Text><Text size="md">Medium text (default)</Text><Text size="lg">Large text</Text><Text size="xl">Extra large text</Text></Demo>
      <h2 className="docs-h2">Colors</h2>
      <Demo direction="column"><Text>Default color</Text><Text color="dimmed">Dimmed text</Text><Text color="blue">Blue text</Text><Text color="red">Red text</Text></Demo>
      <CodeBlock code={`<Text size="sm" color="dimmed">Muted text</Text>
<Text weight={700}>Bold text</Text>`} />
      <h2 className="docs-h2">Truncate & Line Clamp</h2>
      <Demo direction="column"><Text truncate>{'This is a very long text that will be truncated with an ellipsis when it overflows the container width.'}</Text><Text lineClamp={2}>{'This text will be clamped to two lines maximum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</Text></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "size", type: "Size", default: '"md"', desc: "Font size" },
        { name: "color", type: 'ThemeColorName | "dimmed"', default: "-", desc: "Text color" },
        { name: "weight", type: "number", default: "-", desc: "Font weight" },
        { name: "truncate", type: "boolean", default: "false", desc: "Truncate with ellipsis" },
        { name: "lineClamp", type: "number", default: "-", desc: "Max lines" },
        { name: "inline", type: "boolean", default: "false", desc: "Render as span" },
      ]} />
    </>
  );
}

function TitlePage() {
  return (
    <>
      <h1 className="docs-page-title">Title</h1>
      <p className="docs-page-desc">Heading component rendering h1-h6 with consistent styling.</p>
      <CodeBlock code={`import { Title } from "nui-react";`} />
      <h2 className="docs-h2">Orders</h2>
      <Demo direction="column"><Title order={1}>Heading 1</Title><Title order={2}>Heading 2</Title><Title order={3}>Heading 3</Title><Title order={4}>Heading 4</Title><Title order={5}>Heading 5</Title><Title order={6}>Heading 6</Title></Demo>
      <CodeBlock code={`<Title order={1}>Page Title</Title>
<Title order={3}>Section Title</Title>`} />
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "order", type: "1 | 2 | 3 | 4 | 5 | 6", default: "1", desc: "Heading level (h1-h6)" },
        { name: "align", type: "CSS textAlign", default: "-", desc: "Text alignment" },
      ]} />
    </>
  );
}

function KbdPage() {
  return (
    <>
      <h1 className="docs-page-title">Kbd</h1>
      <p className="docs-page-desc">Keyboard key indicator for shortcuts and hotkeys.</p>
      <CodeBlock code={`import { Kbd } from "nui-react";`} />
      <h2 className="docs-h2">Basic</h2>
      <Demo><Kbd>Ctrl</Kbd><Text inline size="sm" color="dimmed">+</Text><Kbd>C</Kbd><span style={{ width: "1.5rem" }} /><Kbd>Cmd</Kbd><Text inline size="sm" color="dimmed">+</Text><Kbd>K</Kbd></Demo>
      <CodeBlock code={`<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>`} />
      <h2 className="docs-h2">Sizes</h2>
      <Demo><Kbd size="xs">XS</Kbd><Kbd size="sm">SM</Kbd><Kbd size="md">MD</Kbd><Kbd size="lg">LG</Kbd></Demo>
      <h2 className="docs-h2">Props</h2>
      <PropsTable data={[
        { name: "size", type: "Size", default: '"sm"', desc: "Key size" },
        { name: "children", type: "ReactNode", default: "-", desc: "Key label" },
      ]} />
    </>
  );
}

// ───────────────────── About Page ──────────────
function AboutPage() {
  return (
    <>
      <h1 className="docs-page-title">About NUI</h1>
      <p className="docs-page-desc">NUI is a React UI library built for developers who want full control over their component system.</p>
      <h2 className="docs-h2">Philosophy</h2>
      <p className="docs-text">NUI was built on three principles:</p>
      <ul className="docs-list">
        <li><strong>Zero runtime overhead</strong> -- Styles are computed once and use CSS custom properties. No CSS-in-JS runtime.</li>
        <li><strong>Full theme control</strong> -- Every token (colors, spacing, radius, typography, shadows) is configurable and injected as CSS variables.</li>
        <li><strong>Component isolation</strong> -- <code>createUI()</code> produces scoped instances. Multiple theme contexts can coexist.</li>
      </ul>
      <h2 className="docs-h2">Contributing</h2>
      <p className="docs-text">We welcome contributions. The component architecture follows a consistent pattern: <code>types.ts</code> for prop interfaces, <code>styles.ts</code> for the style function, and the component TSX file wiring them together via <code>useStyles</code>.</p>
      <h2 className="docs-h2">Links</h2>
      <ul className="docs-list">
        <li><Anchor href="https://github.com/NUI-Library/nui" target="_blank">GitHub Repository</Anchor></li>
        <li><Anchor href="https://www.npmjs.com/package/nui-react" target="_blank">npm Package</Anchor></li>
      </ul>
      <h2 className="docs-h2">License</h2>
      <p className="docs-text">NUI is released under the MIT License.</p>
    </>
  );
}

// ─── Main Docs Layout ──────────────────────────
function DocsLayout() {
  const [section, setSection] = useState("getting-started");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const navigate = useCallback((id: string) => { setSection(id); setSidebarOpen(false); window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="docs-root" data-nui-scheme={colorScheme}>
      {/* Navbar */}
      <header className="docs-navbar">
        <div className="docs-navbar-inner">
          <div className="docs-navbar-left">
            <button className="docs-mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}><MenuIcon /></button>
            <div className="docs-logo" onClick={() => navigate("getting-started")}>
              <div className="docs-logo-mark">N</div>
              <span className="docs-logo-text">NUI</span>
              <span className="docs-version">v0.1.0</span>
            </div>
          </div>
          <div className="docs-navbar-right">
            <button className="docs-search-trigger" onClick={() => setSearchOpen(true)}>
              <SearchIcon size={14} />
              <span className="docs-search-trigger-text">Search...</span>
              <span className="docs-kbd"><span className="docs-kbd-meta">{'⌘'}</span>K</span>
            </button>
            <a className="docs-icon-btn" href="https://github.com/NUI-Library/nui" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <button className="docs-icon-btn" onClick={toggleColorScheme} aria-label="Toggle theme">{colorScheme === "dark" ? <SunIcon /> : <MoonIcon />}</button>
          </div>
        </div>
      </header>

      <div className="docs-layout">
        {sidebarOpen && <div className="docs-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <aside className={`docs-sidebar ${sidebarOpen ? "docs-sidebar-open" : ""}`}>
          <nav className="docs-sidebar-nav">
            {GROUPS.map(group => {
              const items = NAV.filter(n => n.group === group);
              if (!items.length) return null;
              return (
                <div key={group} className="docs-nav-group">
                  <div className="docs-nav-group-title">{group}</div>
                  {items.map(item => (
                    <button key={item.id} className={`docs-nav-item ${section === item.id ? "docs-nav-item-active" : ""}`} onClick={() => navigate(item.id)}>{item.label}</button>
                  ))}
                </div>
              );
            })}
          </nav>
        </aside>
        <main className="docs-main"><PageContent section={section} /></main>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
    </div>
  );
}

// ─── Export ────────────────────────────────────
export default function Playground() {
  return (
    <ui.Provider>
      <ToastProvider position="top-right">
        <DocsLayout />
      </ToastProvider>
    </ui.Provider>
  );
}
