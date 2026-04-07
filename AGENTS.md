# Guide for Component Development for the UI Registry

## 0. Very first steps

- Read [README.md](README.md) for context on the repository structure and development process.

- Review [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines and best practices.

- In the files listed above, skip all sections related to "Using AI" or "AI Agents" as they are not relevant for human contributors.

- **eslint.config.js** and **prettier.config.js** are set up to enforce consistent code style and formatting across the repository. Please ensure your code adheres to these standards.

---

## 1. Repository Rules

- Default package manager: pnpm - prefer `pnpm` over `npm` or other package managers. Do not mix pnpm and other package managers in the same branch

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

**Examples:**

```tsx
// ✅ Needs "use client" - uses useState
'use client'

import { useState } from 'react'
import { Button } from '@/registry/default/ui/button'

export default function Particle() {
  const [loading, setLoading] = useState(false)
  return <Button onClick={() => setLoading(true)}>Click</Button>
}
```

```tsx
// ✅ Does NOT need "use client" - stateless
import { Button } from '@/registry/default/ui/button'

export default function Particle() {
  return <Button>Click me</Button>
}
```

---

## 4. Import Patterns

**External Libraries:**

- Always import specific components/hooks from libraries, never the entire library namespace.

### React

**Always use named imports for React hooks:**

```tsx
import { useState, useEffect, useId, useRef, useCallback, useMemo } from 'react'
```

**Then use hooks directly:**

```tsx
const id = useId()
const [state, setState] = useState(false)
const ref = useRef(null)
```

**Never:**

- Import React namespace (`import * as React`) - always use named imports
- Import React for stateless components (components without hooks or state)

---

## 5. State Management

**Static Data**

- Define static data outside (above) the function
- If date shared across multiple components, consider moving it to a separate file `[FeactureName]/[SliceName]/constants/[constantName].ts` - common constant within slice or in `[FeactureName]/shared/constants/[constantName].ts` and importing it

**Stateful Particles**

- When state is needed, use React hooks. Use descriptive state variable names.
- In case of complex state logic, consider extracting it to a custom hook in `hooks/` folder (e.g. `useParticleLogic.ts`) and importing it into the component.
- Use context providers/consumers when you need to share state across multiple components, but keep the particle focused on demonstrating one pattern or feature. Avoid adding complex state management logic that detracts from the main purpose of the particle.

## 5. Accessibility Best Practices

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
        <p className="text-muted-foreground text-xs">
          By clicking this checkbox, you agree to the terms.
        </p>
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
<Field>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" required />
  <FieldError>Please fill out this field.</FieldError>
</Field>
```

---

## 15. Best Practices Summary

### Code Quality

- ✅ Keep particles focused on demonstrating one feature or pattern
- ✅ Use realistic placeholder text and data
- ✅ Prefer composition over complexity
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

---
