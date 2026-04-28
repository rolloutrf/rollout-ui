# Как добавить новую страницу в `apps/demo`

Пошаговая инструкция от Figma-макета до запущенной страницы. Рассчитана на ~1 час работы. Копируй или пересылай коллеге целиком — документ самодостаточный.

> Это «практическая шпаргалка». Полные правила и обоснования — в [AGENTS.md](AGENTS.md). При расхождении приоритет у `AGENTS.md`.

---

## 0. Установка с нуля (один раз на новой машине)

### 0.0 Базовые инструменты (если ещё не стоят)

| Инструмент | Зачем | Установка (macOS) |
|---|---|---|
| **git** | клонирование репозитория | предустановлен; иначе `brew install git` |
| **nvm** | менеджер версий Node | `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh \| bash`, потом перезапустить терминал |
| **Node 22.21.1** | требование репы (`.nvmrc`); Vite 8 не работает на Node ≤22.11 | `nvm install 22.21.1 && nvm use 22.21.1 && nvm alias default 22.21.1` |
| **pnpm 10.32.1** | менеджер пакетов проекта | `corepack enable && corepack prepare pnpm@10.32.1 --activate` |
| **Claude Code** | для работы с MCP (Figma, Preview, shadcn/ui) | [https://docs.claude.com/en/docs/claude-code](https://docs.claude.com/en/docs/claude-code) |

### 0.1 Клонируй репозиторий

```bash
cd ~ && git clone https://github.com/rolloutrf/rollout-ui.git
cd ~/rollout-ui
```

> Если у репы приватный доступ — настрой SSH-ключ: [https://docs.github.com/en/authentication/connecting-to-github-with-ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) и используй `git clone git@github.com:rolloutrf/rollout-ui.git`.

### 0.2 Установи зависимости (под Node 22!)

```bash
nvm use 22.21.1   # обязательно перед pnpm install
pnpm install
```

> ⚠️ **Если установить под Node 20** — нативный rolldown-биндинг (`@rolldown/binding-darwin-arm64`) не подтянется и Vite упадёт с `Cannot find native binding`. Лечится `rm -rf node_modules && pnpm install` под Node 22.

Установка займёт ~2 минуты. Игнорируй предупреждение `Ignored build scripts: esbuild, msw, sharp` — это нормально.

### 0.3 Проверь, что dev-сервер запускается

```bash
pnpm --filter @rollout/demo dev
```

Должно появиться:
```
VITE v8.0.0  ready in 1741 ms
➜  Local:   http://localhost:5173/
```

Открой `http://localhost:5173/` в браузере — должна загрузиться главная страница demo. Если так — выключи dev (`Ctrl+C`) и переходи к §1 Pre-flight.

### 0.4 Создай рабочую ветку

```bash
git checkout -b feature/<имя-задачи>
```

Например, `feature/personal-data` или `feature/cart-page`. Не работай напрямую в `main`.

---

## 1. Pre-flight (запускать перед каждой новой страницей)

### 1.1 Запусти проверку окружения

Открой терминал и вставь одной командой:

```bash
source ~/.nvm/nvm.sh && nvm use 22.21.1 >/dev/null && \
echo "Node:    $(node -v)" && \
echo "pnpm:    $(pnpm -v)" && \
echo "repo:    $(git -C ~/rollout-ui rev-parse --show-toplevel 2>/dev/null || echo 'MISSING')" && \
echo "branch:  $(git -C ~/rollout-ui branch --show-current 2>/dev/null)" && \
echo "binding: $(ls ~/rollout-ui/node_modules/.pnpm/ 2>/dev/null | grep -c '@rolldown+binding-darwin')" && \
echo "launch:  $(grep -c '"name": "rollout-ui-demo"' ~/.claude/launch.json 2>/dev/null)"
```

**Ожидаемый вывод:**
```
Node:    v22.21.1
pnpm:    10.32.1
repo:    /Users/<you>/rollout-ui
branch:  <твоя-ветка>
binding: 1
launch:  1
```

### 1.2 Если что-то не сходится — пройди соответствующий шаг:

| Строка | Не ОК? | Что сделать |
|---|---|---|
| `Node` ≠ `v22.21.1` | nvm не активен | `nvm install 22.21.1 && nvm use 22.21.1` (нужен установленный [nvm](https://github.com/nvm-sh/nvm)) |
| `pnpm` ≠ `10.32.1` | corepack выключен | `corepack enable && corepack prepare pnpm@10.32.1 --activate` |
| `repo: MISSING` | репа не клонирована | `git clone https://github.com/rolloutrf/rollout-ui.git ~/rollout-ui` |
| `binding: 0` | `node_modules` ставился под Node 20 | `cd ~/rollout-ui && rm -rf node_modules && pnpm install` (под Node 22!) |
| `launch: 0` | нет конфига preview | см. §1.5 ниже |

### 1.3 Проверь MCP-серверы (Claude Code)

В Claude Code запусти эти 4 MCP-вызова:

| Вызов | Что должно вернуться |
|---|---|
| `mcp__Shadcn_UI__list_components` | массив с 46 компонентами |
| `mcp__Claude_Preview__preview_list` | массив (может быть пустой) |
| `mcp__c0861a9b-…__whoami` | объект с email и `plans[].name === 'ROLLOUT'` (View seat) |
| `mcp__figma__get_figma_data` с `fileKey: 'p2bAIyTB6oJTGWjjR8NwRB'`, `nodeId: '221:4087'` | YAML-структура без 403 |

### 1.4 Если Figma MCP вернула 403 «Invalid token»

1. Открой [https://www.figma.com/developers/api#access-tokens](https://www.figma.com/developers/api#access-tokens)
2. Создай новый Personal Access Token (scope: **File content** read)
3. В файле `~/.claude.json` найди секцию `mcpServers.figma.env.FIGMA_API_KEY` и **замени** значение на новый токен
4. **Перезапусти Claude Code** (`Cmd+Q` → открыть заново). Env читается на старте процесса.
5. Старый токен **отзови** на той же странице.

### 1.5 Если нет конфига `rollout-ui-demo` в `launch.json`

Открой `~/.claude/launch.json` и добавь в массив `configurations` (замени `<you>` на свой username):

```json
{
  "name": "rollout-ui-demo",
  "cwd": "/Users/<you>/rollout-ui/apps/demo",
  "runtimeExecutable": "/Users/<you>/.nvm/versions/node/v22.21.1/bin/node",
  "runtimeArgs": ["./node_modules/vite/bin/vite.js"],
  "port": 5173
}
```

Проверь путь к Node 22: `which node` (после `nvm use 22.21.1`).

> ⚠️ **Не путать с `rollout-demo`** — это старый проект на `~/ROLLOUT Demo app /`, не имеет отношения к этой монорепе.

---

## 2. Промпт-шаблон для Claude Code (быстрый старт)

Если pre-flight (§1) пройден — открывай Claude Code в каталоге `~/rollout-ui` и вставляй шаблон ниже. Замени все плейсхолдеры в `< >` на свои значения:

| Плейсхолдер | Что вписать | Пример |
|---|---|---|
| `<НАЗВАНИЕ ЭКРАНА>` | заголовок страницы (как в Figma) | `Личные данные` |
| `<FIGMA_URL>` | прямая ссылка на frame в Figma (с `?node-id=…`) | `https://www.figma.com/design/p2bAIyTB6oJTGWjjR8NwRB/Demo-App?node-id=221-4087` |
| `<НОВЫЙ_ROUTE>` | путь нового роута | `/profile/personal-data` |
| `<ИСХОДНАЯ_СТРАНИЦА>` | файл-источник навигации | `apps/demo/src/pages/profile/ProfilePage.tsx` |
| `<ЭЛЕМЕНТ_ВХОДА>` | конкретный блок/кнопка, по которой делается переход (как видно в коде/Figma) | `блок «Аккаунт» — секция с аватаром и email пользователя (строки 103–115)` |

````markdown
Реализуй экран «<НАЗВАНИЕ ЭКРАНА>» в `apps/demo` по макету Figma:
<FIGMA_URL>

**Точка входа в экран:**
- Со страницы: `<ИСХОДНАЯ_СТРАНИЦА>`
- По клику на: `<ЭЛЕМЕНТ_ВХОДА>`
- Новый route: `<НОВЫЙ_ROUTE>`

Следуй правилам из `apps/demo/AGENTS.md` и `apps/demo/HOW_TO_ADD_PAGE.md`. Сжатое ТЗ:

1. **Чтение макета** — параллельно:
   - `mcp__figma__get_figma_data({fileKey, nodeId})` — структура нод и токены
   - `mcp__c0861a9b-…__get_design_context({fileKey, nodeId, clientFrameworks:'react', clientLanguages:'typescript,tailwindcss'})` — готовый React+Tailwind эталон
   - `mcp__c0861a9b-…__get_screenshot({fileKey, nodeId})` — визуал для diff
2. **Распознай компоненты** в макете (поле `name` инстансов, `componentProperties`). Имена соответствуют shadcn/ui — для каждого вызови `mcp__Shadcn_UI__get_component({componentName: '<kebab-case>'})` как эталон визуала и поведения.
3. **Реализация — `@base-ui/react`**, НЕ Radix, НЕ `pnpm dlx shadcn add`. Если нужного компонента нет в `@rollout/ui-kit` (`packages/ui-kit/src/index.ts`) — спроси меня перед добавлением. После согласия: `packages/ui-kit/src/components/ui/<name>.tsx` (Portal+Positioner+Popup паттерн, data-атрибуты Base UI: `data-popup-open`, `data-highlighted`, `data-disabled`, `data-checked`, `data-open`, `data-closed`), экспорт через корневой `index.ts`, `pnpm changeset` minor для `@rollout/ui-kit`.
4. **Страница** — `apps/demo/src/pages/<area>/<Name>Page.tsx`. Контейнер `mx-auto flex max-w-[576px] flex-col gap-7 px-4 pt-20 pb-8`. NavBar по макету (Title H3 `text-lg font-semibold leading-7 text-foreground` 18/28 + Left/Right action 40×40 при наличии в Figma — не добавлять кнопок «от себя»).
5. **Токены — только переменные, никакого хардкода**:
   - Шрифт: Geist (через `var(--font-sans)`)
   - Цвета: `bg-background` / `text-foreground` / `text-muted-foreground` / `border-input`
   - **`bg-accent` (оранжевый `hsl(24 95% 53%)`)** — только для бренд-акцентов: avatar, активный таб, primary CTA с акцентом
   - **`bg-muted text-foreground`** — для highlighted/hover в Select, меню, items (shadcn Base паттерн)
   - Радиусы: `rounded-md` 12, `rounded-sm` 8, `rounded-2xl` 24
   - Спейсинг: `gap-1..gap-7` (4/8/12/16/20/24/28)
6. **Routing**: добавь `<Route path="<НОВЫЙ_ROUTE>" element={<NewPage />} />` в `apps/demo/src/App.tsx`. В файле `<ИСХОДНАЯ_СТРАНИЦА>` замени **`<ЭЛЕМЕНТ_ВХОДА>`** (тот самый блок/кнопку) на `<Link to="<НОВЫЙ_ROUTE>">…</Link>` из `react-router-dom` — сохрани все визуальные классы и содержимое, только обёртка меняется. **НЕ** добавляй переход на другие элементы и **НЕ** используй `<a href>`.
7. **Состояние формы** — локальный `useState`. Никаких `react-hook-form`/Zod/API/бизнес-логики.
8. **Верификация (обязательно)**:
   - `mcp__Claude_Preview__preview_start({name: 'rollout-ui-demo'})` — порт 5173
   - Перейди на новый URL → `mcp__Claude_Preview__preview_screenshot`
   - Сравни визуально с `mcp__c0861a9b-…__get_screenshot` исходного нода Figma
   - Прогон в **light + dark** темах (toggle через ThemeToggle в Header)
   - Прогон в **mobile** (`mcp__Claude_Preview__preview_resize({preset: 'mobile'})`)
   - `mcp__Claude_Preview__preview_console_logs({level: 'error'})` — должен быть пуст
9. **Обнови дерево структуры** в `apps/demo/AGENTS.md §2` (новые файлы с одной строкой описания) и таблицу Routing если изменился `App.tsx`.
10. **Не делать**: deep imports (`@rollout/ui-kit/components/...`), `radix-ui`, `pnpm dlx shadcn add`, хардкод цветов (`#0a0a0a`, `bg-orange-500`), хардкод шрифта (`'Geist'`), `console.log` в обработчиках, «улучшения от себя» (что в Figma — то и в коде).

**Если по ходу:**
- Макет неоднозначен → спроси, не угадывай.
- Лимит на `c0861a9b-…` (Figma Dev Mode View seat) → переключись на `figma` MCP + `Claude_Preview` для diff.
- Figma вернула 403 → пройди `HOW_TO_ADD_PAGE.md §1.4` (новый ключ + рестарт Claude Code).
- Нужен новый компонент в ui-kit → опиши, что именно (имя shadcn → имя в `@base-ui/react/<primitive>`) и жди подтверждения.

После реализации — выведи короткий отчёт: список изменённых/созданных файлов, ссылку на новый роут (`http://localhost:5173/<path>`), скриншоты light/dark/mobile, и упоминание про changeset (если был добавлен компонент в ui-kit).
````

### 2.1 Минимальный вариант (если экран простой)

Если макет — это разовая страница без новых компонентов и без сложных взаимодействий, можно использовать сокращённый промпт:

````markdown
Реализуй экран «<НАЗВАНИЕ>» в `apps/demo` по `<FIGMA_URL>` — следуй `apps/demo/AGENTS.md`.

Точка входа: со страницы `<ИСХОДНАЯ_СТРАНИЦА>` по клику на `<ЭЛЕМЕНТ_ВХОДА>`, новый route `<НОВЫЙ_ROUTE>`.

Создай страницу в `apps/demo/src/pages/<area>/`, добавь `<Route>`, замени элемент входа на `<Link to>`. Верификация: preview screenshot ↔ figma get_screenshot (light+dark+mobile). Не используй radix/shadcn add/хардкоды. Обнови дерево в AGENTS.md §2.
````

### 2.2 Если нужно только обновить существующую страницу

````markdown
Обнови экран `<area>/<Name>Page.tsx` по макету `<FIGMA_URL>`. Сравни текущую реализацию с figma_data + design_context, найди расхождения (токены, размеры, состояния, новые/удалённые блоки) и приведи к макету. Не трогай compoents в `@rollout/ui-kit` без необходимости. Верификация — preview ↔ figma get_screenshot.
````

### 2.3 Пример заполненного промпта

Так выглядит шаблон с реальными значениями для страницы [PersonalDataPage.tsx](src/pages/profile/PersonalDataPage.tsx). Можно использовать как референс — просто подставь свои значения в плейсхолдеры по аналогии:

````markdown
Реализуй экран «Личные данные» в `apps/demo` по макету Figma:
https://www.figma.com/design/p2bAIyTB6oJTGWjjR8NwRB/Demo-App?node-id=221-4087

**Точка входа в экран:**
- Со страницы: `apps/demo/src/pages/profile/ProfilePage.tsx`
- По клику на: блок «Аккаунт» — секция с аватаром «АК» и email пользователя (помечена `<p>Аккаунт</p>` сверху)
- Новый route: `/profile/personal-data`

Следуй правилам из `apps/demo/AGENTS.md` и `apps/demo/HOW_TO_ADD_PAGE.md`. Сжатое ТЗ: …
````

> 💡 Описывай **«Элемент входа»** так, чтобы он был узнаваем без точных номеров строк: маркер-текст (`<p>Аккаунт</p>`), визуальные приметы (аватар, email), название блока. Тогда промпт не сломается, если кто-то отредактирует файл и строки сдвинутся.

---

## 3. Получи макет из Figma

Тебе нужны три вещи:

1. **`fileKey`** — из URL `https://figma.com/design/<fileKey>/...`
2. **`nodeId`** — из URL `?node-id=<nodeId>` (через `:` или `-`, оба работают)
3. **Доступ** — макет должен быть открыт для тебя (View seat в команде ROLLOUT для файлов Demo App)

В Claude Code запусти три параллельных MCP-вызова:

```
mcp__figma__get_figma_data       → структура нод, токены, varianты
mcp__c0861a9b-…__get_design_context  → готовый React+Tailwind код (адаптер)
mcp__c0861a9b-…__get_screenshot      → визуальный эталон для diff
```

> Если `c0861a9b-…` уперся в лимит View-seat — работай только через `figma` MCP. Эталон визуала бери через `mcp__Claude_Preview__preview_screenshot` потом, для сравнения.

**Что искать в макете:**

- **Имена компонентов** (поле `name`) — они совпадают с компонентами shadcn/ui (`Button`, `Input`, `Select`, `Item`, `Field`, `Tabs`, …).
- **`componentProperties`** на инстансах — варианты (`Variant=Outline`, `State=Default`, `Icon left: true`, …).
- **`textStyle`** — в формате `text-lg/leading-normal/semibold` → Tailwind `text-lg leading-7 font-semibold`.
- **CSS-переменные Figma** (`var(--spacing/7,28px)`, `var(--base/foreground,#0a0a0a)`) — соответствуют твоим Tailwind-токенам.

---

## 4. Сверь компоненты с shadcn/ui MCP

Для каждого распознанного компонента в макете:

```
mcp__Shadcn_UI__get_component({ componentName: 'select' })
mcp__Shadcn_UI__get_component_demo({ componentName: 'select' })
```

Имена в kebab-case: `Alert Dialog` → `alert-dialog`, `Dropdown Menu` → `dropdown-menu`, `Input OTP` → `input-otp`, `Hover Card` → `hover-card`, `Radio Group` → `radio-group`.

shadcn — **только эталон поведения и визуала**. Реализуем на `@base-ui/react` (см. §5).

---

## 5. Если нужного компонента нет в `@rollout/ui-kit` — добавь его

### 5.1 Что уже есть в ui-kit

`Button`, `ButtonGroup`, `Input`, `InputOTP`, `Label`, `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Avatar`, `Badge`, `Card`, `DropdownMenu`, `Select`, `Tabs`, `Separator`, `Typography`, `cn`.

Импорт всегда из корневого пакета: `import { Button } from '@rollout/ui-kit'`.

### 5.2 Добавление нового примитива (если в ui-kit нет)

1. Создай файл `packages/ui-kit/src/components/ui/<name>.tsx`
2. **Только** на `@base-ui/react/<primitive>` — не Radix, не shadcn CLI:
   ```tsx
   import { Select as SelectPrimitive } from '@base-ui/react/select'
   ```
3. Используй data-атрибуты Base UI: `data-popup-open`, `data-highlighted`, `data-disabled`, `data-checked`, `data-open`, `data-closed`, `data-selected`. Активный таб — `data-[active]:` (НЕ `data-[state=active]:`).
4. Стилизация — Tailwind + `cn()` из ui-kit; для вариантов — `class-variance-authority` (`cva`).
5. Эталон структуры: [packages/ui-kit/src/components/ui/select.tsx](../../packages/ui-kit/src/components/ui/select.tsx) (Portal+Positioner+Popup).
6. Экспортируй через `packages/ui-kit/src/index.ts`:
   ```ts
   export * from './components/ui/<name>'
   ```
7. Создай changeset в корне репы:
   ```bash
   pnpm changeset
   ```
   Выбери `@rollout/ui-kit`, тип бампа `minor`, опиши что добавил.
8. Закоммить файл из `.changeset/`.

> Без changeset CI не выпустит версию. Demo и Storybook исключены — для них changeset не нужен.

---

## 6. Создай страницу

### 6.1 Файл и шаблон

`apps/demo/src/pages/<area>/<Name>Page.tsx`:

```tsx
import { Button, Field, FieldLabel, Input } from '@rollout/ui-kit'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function MyNewPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ /* поля */ })

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[576px] flex-col gap-7 px-4 pt-20 pb-8">
        {/* NavBar (если в макете есть) */}
        <div className="flex w-full items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-xl"
            aria-label="Назад"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-5 text-foreground" strokeWidth={1.75} />
          </Button>
          <h1 className="flex-1 text-lg font-semibold leading-7 text-foreground">Заголовок</h1>
          <div className="size-10 shrink-0 rounded-xl" aria-hidden="true" />
        </div>

        {/* Контент */}
      </div>
    </div>
  )
}
```

### 6.2 Соглашения

| Что | Правило |
|---|---|
| Контейнер | `max-w-[576px] mx-auto`, `px-4`, gap из Figma (`gap-6` или `gap-7`) |
| Заголовок | `<h1 className="text-lg font-semibold leading-7 text-foreground">` (для H3 в Figma DS) |
| Pаспределение по высоте | `pt-20` если нужно компенсировать глобальный fixed `Header` (~72px) |
| Иконки | `lucide-react`, размер по Figma (`size-4`/`size-5`) |
| State формы | локальный `useState` (без `react-hook-form`/Zod) |
| Mock-обработчики | `onClick={() => { /* mock */ }}` — не оставлять `console.log` |
| **Нижний отступ под TabBar** | НЕ дублировать `pb-tabbar` — он уже на `AppShell` |
| Цвета/шрифты/размеры | **только токены** (`bg-accent`, `text-foreground`), никаких `bg-orange-500` или хексов |

### 6.3 Цветовые токены (правила)

- **`bg-accent` (оранжевый)** → бренд-акцент: avatar, активный таб, primary CTA с акцентом
- **`bg-muted` (нейтральный)** → highlighted/hover в Select, меню, командных панелях, items (shadcn-паттерн)
- **`bg-foreground` / `text-muted-foreground`** → стандартный текст и подсказки
- Не возвращать дефолтный shadcn-фиолетовый `--accent: hsl(270 91% 65%)` — только `hsl(24 95% 53%)` (orange-500)

---

## 7. Подключи роутинг и навигацию

### 7.1 Добавь Route в `apps/demo/src/App.tsx`

```tsx
import { MyNewPage } from '@/pages/<area>/<Name>Page'

// внутри <Routes>:
<Route path="/<path>" element={<MyNewPage />} />
```

### 7.2 Добавь Link с предыдущей страницы

```tsx
import { Link } from 'react-router-dom'

<Link to="/<path>" className="...">
  ...
</Link>
```

> **НЕ** использовать `<a href>` — потеряется SPA-навигация и состояние FavoritesProvider/ThemeProvider.

---

## 8. Запусти и проверь

### 8.1 Стартани preview

В Claude Code:

```
mcp__Claude_Preview__preview_start({ name: 'rollout-ui-demo' })
```

Сервер поднимется на `http://localhost:5173/`.

### 8.2 Открой нужный URL и сделай скриншот

```
mcp__Claude_Preview__preview_eval({ expression: "window.location.href = '/<path>'; 'go'" })
mcp__Claude_Preview__preview_screenshot
```

### 8.3 Сверь визуально с Figma

```
mcp__c0861a9b-…__get_screenshot({ fileKey, nodeId })
```

Положи бок о бок: layout, отступы, типографика, цвета, состояния. Если есть расхождение — **правь код**, не «интерпретируй» макет.

### 8.4 Проверь оба режима темы

```
mcp__Claude_Preview__preview_screenshot          # текущая
mcp__Claude_Preview__preview_resize({ colorScheme: 'dark' })
mcp__Claude_Preview__preview_screenshot          # тёмная
```

Или вручную: на странице есть `ThemeToggle` в Header — потыкай.

### 8.5 Проверь mobile

```
mcp__Claude_Preview__preview_resize({ preset: 'mobile' })  # 375×812
mcp__Claude_Preview__preview_screenshot
```

### 8.6 Console errors должны быть пустыми

```
mcp__Claude_Preview__preview_console_logs({ level: 'error' })
```

### 8.7 Если новый компонент в ui-kit — прогон тестов и линта

```bash
pnpm --filter @rollout/ui-kit lint
pnpm --filter @rollout/ui-kit test
```

---

## 9. Обнови документацию

### 9.1 Дерево структуры в [AGENTS.md §2](AGENTS.md)

Это **обязательно**. Любой новый файл в `apps/demo/src/` должен попасть в дерево с одной строкой-описанием.

### 9.2 Если изменился `App.tsx` — обнови таблицу Routing в §2

### 9.3 Если паттерн страницы добавил новый шаг — обнови `AGENTS.md` §11 Чек-лист

---

## 10. Финальный чек-лист (перед PR)

- [ ] Pre-flight (§1) пройден
- [ ] Получены `figma_data` + `design_context` + `screenshot` исходного нода
- [ ] Распознаны компоненты, найдены аналоги в `@rollout/ui-kit`
- [ ] Если нет — добавлен примитив в ui-kit (на `@base-ui/react`, через корневой `index.ts`, +changeset)
- [ ] Создана `apps/demo/src/pages/<area>/<Name>Page.tsx` с контейнером `max-w-[576px]`
- [ ] Добавлен `<Route>` в `App.tsx`
- [ ] Подключена навигация через `<Link>` из родительской страницы
- [ ] Проверены токены: `--accent` оранжевый, highlighted = `bg-muted`, шрифт Geist
- [ ] preview_screenshot ↔ figma get_screenshot совпадают (light + dark)
- [ ] preview_console_logs `level: 'error'` пусто
- [ ] Нет хардкоднутых цветов/шрифтов/размеров (всё через токены)
- [ ] Нет deep imports, нет `radix-ui`, нет `shadcn add`
- [ ] Обновлено дерево в [AGENTS.md §2](AGENTS.md), и при необходимости таблица Routing под ним
- [ ] Если страница вне AppShell или со своим scroll-контейнером — повешен `pb-tabbar md:pb-0`

---

## 11. Полезные ссылки

- **Полные правила**: [`apps/demo/AGENTS.md`](AGENTS.md)
- **Корневые правила монорепы**: [`~/rollout-ui/AGENTS.md`](../../AGENTS.md)
- **Storybook (live)**: [https://rolloutrf.github.io/rollout-ui](https://rolloutrf.github.io/rollout-ui)
- **shadcn Base UI reference**: [https://ui.shadcn.com/docs/components/base/select](https://ui.shadcn.com/docs/components/base/select)
- **Base UI docs**: [https://base-ui.com/react/components](https://base-ui.com/react/components)
- **Figma file keys**:
  - Demo App (макеты экранов): `p2bAIyTB6oJTGWjjR8NwRB`
  - shadcn · actual (эталонная DS): `Rf9NPBgJOgcj504cSoo8kg`
- **Контакт команды**: Telegram `@rolloutrf` — для обсуждения больших фич перед PR

---

## 12. Частые проблемы

| Симптом | Причина | Лечение |
|---|---|---|
| `Cannot find native binding` при `pnpm dev` | `node_modules` ставился под Node 20 | §1.1 — `rm -rf node_modules && pnpm install` под Node 22 |
| `getComputedStyle(body).fontFamily` не Geist | Tailwind v4 не применил `--font-sans` | проверь, что в `index.css` есть `html { font-family: var(--font-sans); }` (см. AGENTS.md §3) |
| Заголовок страницы скрыт за Header | глобальный `Header` высотой ~72px | контейнеру страницы добавить `pt-20` |
| Кнопка прилипает к TabBar | AppShell использует `h-screen` (баг) | должно быть `min-h-screen` (см. AGENTS.md §6) |
| Footer не на дне viewport на десктопе | `.pb-tabbar` переопределяет `md:pb-0` | `.pb-tabbar` обёрнут в `@media (max-width: 767.98px)` (см. AGENTS.md §6) |
| Highlighted в Select оранжевый, а не серый | используется `bg-accent` вместо `bg-muted` | заменить на `data-highlighted:bg-muted data-highlighted:text-foreground` |
| Figma MCP даёт 403 | ключ просрочен/отозван | §1.4 — выпустить новый, заменить в `~/.claude.json`, рестартить Claude Code |
| Preview подхватывает не тот проект | имя `rollout-demo` в `launch.json` указывает на старый | использовать имя `rollout-ui-demo`; перепроверить `cwd` в `~/.claude/launch.json` |

---

**Если что-то непонятно или сломалось не по списку — пиши в Telegram `@rolloutrf` ДО того, как тратить часы на угадывание.**
