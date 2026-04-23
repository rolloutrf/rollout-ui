# Guide for Component Development for the UI Registry

## 0. Very first steps

- Read [README.md](README.md) for context on the repository structure and development process.

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines and best practices. Use it as your primary reference for development standards and workflow. **CONTRIBUTING.md has priority in case of conflicts.** Skip the section related to "Using AI" as it is only relevant for human contributors.

- Use **[eslint.config.js](eslint.config.js)** and **[.prettierrc](.prettierrc)** as your main reference for code formatting and linting rules. Make sure to follow these rules to maintain code consistency across the repository.

---

## 1. Repository Rules

- Default package manager: pnpm - prefer `pnpm` over `npm` or other package managers. Do not mix pnpm and other package managers in the same branch
- For running tests, agents must use only `pnpm test`
- For adding primitives in `packages/ui-kit`, agents must use only `pnpm shadcn:add [component-name]`

---

## 2. File Structure and Naming

- Keep files minimal and focused on demonstrating one pattern or feature
- If a particle uses multiple UI primitives, choose the primary category for the file name

---

## 3. "use client" Directive

**Only add `"use client";` at the top when the particle uses:**

- React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, etc.)
- Event handlers that modify state (`onClick`, `onChange`, etc. that call `setState`)
- Browser APIs (`window`, `document`, `localStorage`, etc.)
- Context providers/consumers that require client-side rendering

**Do NOT add `"use client"` for:**

- Stateless components
- Components that only render UI without interactivity
- Components using controlled props (state managed externally)
- Simple compositions of UI primitives

**Important:**

- If parent component is a client component, child components do NOT need to be client components unless they also use client-side features. Use component composition to minimize the number of client components.
- For stateful components (e.g. forms or OTP), move state logic (`useState`, completion handlers, timers) into a dedicated client child component. Keep the parent component stateless when possible.

**Examples:**

```tsx
// ✅ Needs "use client" - uses useState
'use client'

import { useState } from 'react'
import { Button } from '@rollout/ui-kit'

export default function Particle() {
  const [loading, setLoading] = useState(false)
  return <Button onClick={() => setLoading(true)}>Click</Button>
}
```

```tsx
// ✅ Does NOT need "use client" - stateless
import { Button } from '@rollout/ui-kit'

export default function Particle() {
  return <Button>Click me</Button>
}
```

---

## 4. Import Patterns

**UI Components (from @rollout/ui-kit):**

- All shadcn-based UI components (Button, Input, Field, Label, etc.) are imported from `@rollout/ui-kit`
- Always import specific components, never the entire library namespace
- Import from package root public API only: `@rollout/ui-kit` and `@rollout/ui-features`
- Deep imports are forbidden (for example, `@rollout/ui-kit/...` and `@rollout/ui-features/...`)
- `@ui-kit/*` is a local alias for `packages/ui-kit` internals only and must not be used outside `packages/ui-kit`
- Outside `packages/ui-kit`, import `cn` from `@rollout/ui-kit` root export

```tsx
import { Button, Input, Field, FieldLabel, FieldError } from '@rollout/ui-kit'
```

**External Libraries:**

- Always import specific components/hooks from libraries, never the entire library namespace.

### React

**Always import specific components/hooks from libraries, never the entire library namespace.**

---

## 5. React Best Practices

- In case of complex state logic, consider extracting it to a custom hook in `hooks/` folder (e.g. `useParticleLogic.ts`) and importing it into the component.
- Prefer extracting non-trivial component logic into custom hooks, and keep each hook focused on one responsibility.
- Do not over-extract: simple local declarations (`useState`, `useRef`) can stay in the component.
- Small one-off hooks/functions (`useCallback`, `useEffect`, small helpers) can stay in the component when they are easy to read inline.
- Avoid extraction when it increases complexity (for example, excessive prop drilling or too many inputs/outputs just to wire the hook).
- Avoid overloaded hooks that mix multiple concerns; split into smaller focused hooks when needed.
- Declare JSX components as arrow functions: `export const ComponentName = () => {}`. Avoid function declarations for JSX components: `export function ComponentName() {}`.

---

## 6. State Management

**Static Data**

- Define static data outside (above) the function
- If data shared across multiple components, consider moving it to a separate file `[FeatureName]/[SliceName]/constants/[constantName].ts` - common constant within slice or in `[FeatureName]/shared/constants/[constantName].ts` and importing it

**Stateful Particles**

- When state is needed, use React hooks. Use descriptive state variable names.
- Use context providers/consumers when you need to share state across multiple components, but keep the particle focused on demonstrating one pattern or feature. Avoid adding complex state management logic that detracts from the main purpose of the particle.
- For reusable particles, expose passthrough props for UI primitives (`inputProps`, `buttonProps`, `inputOtpProps`, etc.) so consumers can customize primitive behavior without editing the particle internals.
- Passthrough `*Props` groups should target interactive elements only (for example, `Input`, `Button`, `Field`, `InputOTP`, `form`), not non-interactive wrappers like `div`/`span`.
- Passthrough props that are destructured (`...buttonProps`, `...inputProps`, etc.) should be spread at the end of component props by default (for example, `<Button variant="link" {...buttonProps}>`).
- Exception: if a local prop is critical for predictable component behavior, keep that local prop non-overridable by placing it after the spread (for example, internal `onClick`, required fixed variants, enforced colors for semantic wrappers).
- If a component already has a dedicated value prop/variable (`buttonText`, `resendText`, `title`, etc.), do not source the same value from passthrough props (for example, do not read `buttonProps.children`).
- For async callback props (`onResend`, `onSubmit`, `onSend`, etc.), do not silently swallow errors inside reusable UI components by default. Prefer surfacing callback outcomes to the consumer, and let the consumer own domain-specific error messages/state unless the component explicitly documents built-in error handling.

## 7. Story Files

- In story files, include a `Primary` scenario and at least one negative/error scenario for inputs (invalid state, disabled action, or failed async action).
- Treat `Primary` as the success scenario by default; do not add an extra success story when `Primary` already covers it.
- If component state depends on callback props (`onSend`, `onSubmit`, `onResend`, `onComplete`, etc.), create explicit stories for meaningful callback outcomes and resulting UI states that are not already represented.
- If a callback failure scenario already exists in stories, do not add a duplicate "required failure" story.
- For callback-driven states, prefer explicit stories over a single control flag so each scenario is easy to discover and test.

## 8. Accessibility Best Practices

### Language for Invisible Labels

**All invisible text in templates must be written in English.** This includes any attribute whose value is not rendered as visible UI text:

- `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-placeholder`
- `alt` on images
- `title` on elements

```tsx
// ✅ Correct
<img src="..." alt="Product preview" />
<Button aria-label="Close dialog">

// ❌ Incorrect
<img src="..." alt="Превью товара" />
<Button aria-label="Закрыть диалог">
```

**Important:** Visible UI text (button labels, headings, field labels, descriptions) follows the project locale and is **not** affected by this rule.

---

### Inputs Without Visible Labels

**Always use `aria-label` for inputs without visible labels:**

```tsx
<InputGroupInput aria-label="Subscribe to our newsletter" placeholder="Your email" type="email" />
```

### Input Type Attribute

**Always specify the `type` attribute explicitly on Input and InputGroupInput components:**

```tsx
// ✅ Always specify type
<Input type="text" placeholder="Enter name" />
<Input type="email" placeholder="your@email.com" />
<Input type="password" placeholder="Enter password" />
<Input type="search" placeholder="Search…" />
<Input type="file" />

// ❌ Never omit type
<Input placeholder="Enter text" />
```

**Important:** Even for text inputs, always specify `type="text"` explicitly for clarity and consistency.

### Labeling Checkboxes, Radio Groups, and Switches

**Pattern 1: Simple label (checkbox/radio/switch directly with label text)**

Wrap both the control and label text in a `<Label>` component:

```tsx
// ✅ Checkbox
<Label>
  <Checkbox />
  Accept terms and conditions
</Label>

// ✅ Radio
<Label>
  <Radio value="next" />
  Next.js
</Label>

// ✅ Switch
<Label>
  <Switch />
  Marketing emails
</Label>
```

**Pattern 2: Label with additional content (description text)**

When you have additional content like description text, use `id` and `htmlFor`:

```tsx
import { useId } from 'react'

export default function Particle() {
  const id = useId()

  return (
    <div className="flex items-start gap-2">
      <Checkbox id={id} />
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>Accept terms and conditions</Label>
        <p className="text-muted-foreground text-xs">By clicking this checkbox, you agree to the terms.</p>
      </div>
    </div>
  )
}
```

**Pattern 3: Checkbox/Radio Groups**

Each option in a group should be wrapped in its own `<Label>`:

```tsx
// ✅ Checkbox Group
<CheckboxGroup aria-label="Select frameworks" defaultValue={["next"]}>
  <Label>
    <Checkbox value="next" />
    Next.js
  </Label>
  <Label>
    <Checkbox value="vite" />
    Vite
  </Label>
  <Label>
    <Checkbox value="astro" />
    Astro
  </Label>
</CheckboxGroup>

// ✅ Radio Group
<RadioGroup defaultValue="next">
  <Label>
    <Radio value="next" />
    Next.js
  </Label>
  <Label>
    <Radio value="vite" />
    Vite
  </Label>
</RadioGroup>
```

**Pattern 4: In Form Fields**

When using Field components, place the checkbox/radio inside `FieldLabel`:

```tsx
<Field name="terms">
  <FieldLabel>
    <Checkbox value="yes" />
    Accept terms and conditions
  </FieldLabel>
</Field>
```

**Important:**

- Always wrap checkbox/radio/switch controls with their label text in a `<Label>` component
- Only use `id`/`htmlFor` pattern when you have additional content (like description text) that needs to be outside the label
- In groups, each option gets its own `<Label>` wrapper
- Never use `aria-label` on checkboxes/radios/switches when they have visible labels - the `<Label>` component handles the association automatically

### Form Fields

**Use Field components for proper form structure:**

```tsx
import { Field, FieldLabel, FieldError, Input } from '@rollout/ui-kit';

// Pattern 1: With FieldLabel (when you want to show the label)
<Field>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" required />
  <FieldError>Please fill out this field.</FieldError>
</Field>

// Pattern 2: Field without FieldLabel (when label is hidden via aria-label)
<Field>
  <Input type="email" placeholder="your@email.com" aria-label="Email address" />
  <FieldError>Invalid email format.</FieldError>
</Field>

// Pattern 3: Field without FieldError (optional - only if you don't need error display)
<Field>
  <FieldLabel>Name</FieldLabel>
  <Input type="text" placeholder="Enter name" />
</Field>
```

**Important:**

- `FieldLabel` is optional — only use it when you want to display a visible label
- Use `aria-label` on Input when you skip `FieldLabel` for accessibility
- `FieldError` is optional — only use it when you need error state display
- `Field` wrapper is always recommended for proper form structure and styling consistency

---

## 9. Best Practices Summary

### Code Quality

- ✅ Keep particles focused on demonstrating one feature or pattern
- ✅ Use realistic placeholder text and data
- ✅ Prefer composition over complexity
- ✅ In TypeScript, prefer `type` over `interface` for component props and shared models by default
- ✅ Don't add comments unless explaining something non-obvious
- ✅ Use semantic color tokens (`text-muted-foreground`) not raw colors
- ✅ Test that the particle renders correctly before committing

### Accessibility

- ✅ Always provide `aria-label` for icon-only interactive elements
- ✅ Use `aria-hidden="true"` for decorative icons
- ✅ Pair labels with inputs using `useId()`
- ✅ Use Field components for proper form structure

### Performance

- ✅ Define static data outside the component function
- ✅ Only add `"use client"` when actually needed
- ✅ Avoid unnecessary re-renders
- ✅ Use appropriate React patterns (hooks, memoization when needed)

### Consistency

- ✅ Follow existing patterns in the same category
- ✅ Use consistent icon opacity and accessibility patterns
- ✅ Match the styling approach of similar particles
- ✅ Use the same import patterns

### Anti-Patterns

**Do NOT do the following:**

- ❌ Adding animations without a specific request
- ❌ Using form libraries (react-hook-form, formik, etc.)
- ❌ Using raw colors instead of semantic tokens
- ❌ Adding comments for self-explanatory code
- ❌ Adding obvious section comments in JSX (for example: `/* Credit Section */` above `<ItemCardDetailCredit />`)
- ❌ Deep-importing from `@rollout/ui-kit/*` or `@rollout/ui-features/*`
- ❌ Using `@ui-kit/*` alias outside `packages/ui-kit`
- ❌ Using `return` inside JSX template iterators (`map`, etc.); prefer implicit return with parentheses

```tsx
// ❌ Avoid
{
  items.map(({ title }) => {
    const id = `item-${title}`
    return <div key={id}>{title}</div>
  })
}

// ✅ Prefer
{
  items.map(({ title }) => <div key={`item-${title}`}>{title}</div>)
}

// ❌ Avoid obvious JSX comments
{
  /* Credit Section */
}
<ItemCardDetailCredit />

// ✅ Prefer
<ItemCardDetailCredit />
```
