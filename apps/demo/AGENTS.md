# AGENTS.md — apps/demo

Правила реализации страниц и компонентов в demo-приложении `@rollout/demo`. Документ — **источник истины** для AI-агентов и людей при добавлении новой вёрстки. При конфликте с корневым `~/rollout-ui/AGENTS.md` корневой важнее, но всё специфичное для demo описано здесь.

---

## 0. Pre-flight Onboarding (запускать перед каждой новой страницей)

> ⚠️ **Запускать pre-flight ПЕРЕД каждой задачей на вёрстку страницы.**
>
> **Канонический способ:** `pnpm rollout:preflight` (или `/preflight` в Claude Code).
> Скрипт сам активирует nvm, проверяет Node/pnpm/binding/launch.json и
> автоматически чинит то, что чинится без участия пользователя
> (`ROLLOUT_AUTOFIX=1` для авто-переустановки `node_modules` под Node 22).
>
> Шпаргалка ниже остаётся как **fallback** — для агентов вне Claude Code
> и для понимания, что именно проверяет скрипт. Если хотя бы одна проверка
> валится — остановиться и пройти её установочный шаг. Не «обходить» проблему
> по ходу.

### 0.1 Node + pnpm

| Проверка | Команда | Если ОК | Если нет |
|---|---|---|---|
| Node ≥ 22.12 | `node -v` | продолжить | `nvm install 22.21.1 && nvm use 22.21.1` (версия из `.nvmrc` репы) |
| pnpm 10.32.1 | `pnpm -v` | продолжить | `corepack enable && corepack prepare pnpm@10.32.1 --activate` |
| Native rolldown binding | `ls ~/rollout-ui/node_modules/.pnpm/ \| grep '@rolldown+binding-darwin'` | продолжить | `cd ~/rollout-ui && rm -rf node_modules && pnpm install` (под Node 22!) |

**Подводный камень:** установка под Node 20 не подтянет нативный rolldown-биндинг (`@rolldown/binding-darwin-arm64`) → vite падает с `Cannot find native binding`. Лечится только переустановкой `node_modules` под Node 22.

### 0.2 Репозиторий

| Проверка | Команда | Если нет |
|---|---|---|
| Клон в `~/rollout-ui` | `git -C ~/rollout-ui rev-parse --show-toplevel` | `git clone https://github.com/rolloutrf/rollout-ui.git ~/rollout-ui` |
| Текущая ветка | `git -C ~/rollout-ui branch --show-current` | переключиться/создать ветку под фичу |

### 0.3 MCP-серверы

| MCP | Имя | Назначение | Как проверить |
|---|---|---|---|
| **Figma-Context-MCP** | `figma` | `get_figma_data` (структура нода) + `download_figma_images` (PNG для диффа) | `mcp__figma__get_figma_data({fileKey:'p2bAIyTB6oJTGWjjR8NwRB', nodeId:'221:4087'})` — YAML-структура, не 403 |
| **shadcn/ui MCP** | `Shadcn_UI` | Эталон поведения компонентов | `mcp__Shadcn_UI__list_components` — массив с 46 компонентами |
| **Claude Preview MCP** | `Claude_Preview` | Локальный dev-сервер для верификации | `mcp__Claude_Preview__preview_list` — массив (может быть пустой) |

> **Figma Dev Mode / Code Connect MCP (`c0861a9b-…`) намеренно НЕ используется
> в `/new-page` и `/update-page`.** В репозитории нет опубликованных Code
> Connect-мэппингов, поэтому его `get_design_context` отдаёт обобщённый
> shadcn-подобный JSX (мы всё равно переписываем под `@rollout/ui-kit`), а
> `get_screenshot` дублирует `mcp__figma__download_figma_images`. При этом он
> сжигает квоту тулколлов на View-сите команды ROLLOUT. Если когда-то опубликуем
> Code Connect-мэппинги — вернуть его вызовы в [`page-recipe.yaml`](.claude/page-recipe.yaml)
> и в `/new-page`/`/update-page`. Сам MCP в `~/.claude.json` оставляем
> подключённым на будущее.

**Если MCP отсутствует или сломан:**

- **`figma` (403 «Invalid token»)** → создать новый ключ на [https://www.figma.com/developers/api#access-tokens](https://www.figma.com/developers/api#access-tokens), scope `File content` (read). Заменить значение в `~/.claude.json` → `mcpServers.figma.env.FIGMA_API_KEY`. **Перезапустить Claude Code** (env читается на старте процесса). Старый ключ отозвать.
- **`Shadcn_UI` / `Claude_Preview`** — обычно идут в дефолтной сборке плагинов Claude Code. Проверить включение в [https://docs.claude.com/en/docs/claude-code/mcp](https://docs.claude.com/en/docs/claude-code/mcp).

### 0.4 Preview launch.json

| Проверка | Команда |
|---|---|
| Конфиг `rollout-ui-demo` есть | `grep -A4 '"name": "rollout-ui-demo"' ~/.claude/launch.json` |
| `cwd` корректен | в выводе grep'а должно быть `/Users/<you>/rollout-ui/apps/demo` |

**Не путать с конфигом `rollout-demo`** в том же файле — он указывает на старый проект `~/ROLLOUT Demo app /` (другой репозиторий) и не имеет отношения к этой монорепе. Если запросить preview по имени `rollout-demo` — поднимется чужой Vite 5 на порту 5174 с другим приложением.

Если конфига нет — добавить в массив `configurations` файла `~/.claude/launch.json`:

```json
{
  "name": "rollout-ui-demo",
  "cwd": "/Users/<you>/rollout-ui/apps/demo",
  "runtimeExecutable": "/Users/<you>/.nvm/versions/node/v22.21.1/bin/node",
  "runtimeArgs": ["./node_modules/vite/bin/vite.js"],
  "port": 5173
}
```

(Замени `<you>` на свой username; путь к Node 22 проверить через `which node` после `nvm use 22.21.1`.)

### 0.5 Figma access

| Что | Как проверить |
|---|---|
| `figd_…` ключ имеет доступ к Demo App (`p2bAIyTB6oJTGWjjR8NwRB`) | `mcp__figma__get_figma_data({fileKey:'p2bAIyTB6oJTGWjjR8NwRB', nodeId:'221:4087'})` — структура NavBar/Layout без 403 |

Если `figma` MCP недоступен (ключ просрочен / 403) — работа с макетами невозможна, эскалировать пользователю в Telegram `@rolloutrf` и не пытаться «угадать» макет.

### 0.6 Краткая шпаргалка (для AI-агента)

> ⚠️ Каждая новая bash-сессия в Claude Code стартует с **системным** Node (часто v20.x), даже если `nvm use 22.21.1` был сделан раньше. Поэтому первой строкой команды — `source ~/.nvm/nvm.sh && nvm use 22.21.1`. Без этого `node -v` врёт, и `pnpm install` под Node 20 не подтянет нативный rolldown-биндинг.

В одну команду — суммарная проверка окружения:

```bash
source ~/.nvm/nvm.sh && nvm use 22.21.1 >/dev/null && \
echo "Node:    $(node -v)" && \
echo "pnpm:    $(pnpm -v)" && \
echo "repo:    $(git -C ~/rollout-ui rev-parse --show-toplevel 2>/dev/null || echo 'MISSING')" && \
echo "branch:  $(git -C ~/rollout-ui branch --show-current 2>/dev/null)" && \
echo "binding: $(ls ~/rollout-ui/node_modules/.pnpm/ 2>/dev/null | grep -c '@rolldown+binding-darwin')" && \
echo "launch:  $(grep -c '\"name\": \"rollout-ui-demo\"' ~/.claude/launch.json 2>/dev/null)"
```

Ожидаемый вывод (всё ОК):
```
Node:    v22.21.1
pnpm:    10.32.1
repo:    /Users/<you>/rollout-ui
branch:  <name>
binding: 1
launch:  1
```

Если хоть одна строка ниже ожидания — пройти соответствующий пункт §0.1–0.4. После этого MCP-проверки (§0.3, §0.5) сделать вызовами через MCP-инструменты (bash их не покрывает).

**Совет:** для ВСЕХ последующих bash-команд в этой сессии тоже префиксовать `source ~/.nvm/nvm.sh && nvm use 22.21.1 >/dev/null && ...`, либо полагаться на `pnpm` через corepack-shim (он сам использует свой pinned Node при выполнении скриптов).

---

## 1. Стек и инфраструктура

| Слой | Версия / Решение |
|---|---|
| Node | **22.21.1** (`.nvmrc` в корне репы) — обязателен; Vite 8/rolldown требуют ≥22.12 |
| Менеджер пакетов | **pnpm 10.32.1** (`packageManager` в root `package.json`); включён через `corepack enable && corepack prepare pnpm@10.32.1 --activate` |
| Сборщик | **Vite 8** (`vite@8.0.0`) с `@vitejs/plugin-react` и `@tailwindcss/vite` |
| Стили | **Tailwind CSS v4** — **без `tailwind.config.*` и без PostCSS**; вся тема в `src/index.css` через `@theme inline` |
| UI primitives | **`@base-ui/react`** (НЕ Radix) + локальный `@rollout/ui-kit` |
| Фичи | `@rollout/ui-features` (composite-блоки) |
| Роутинг | `react-router-dom` 6.x (`BrowserRouter`) |
| Иконки | `lucide-react` |
| Шрифт | **Geist Variable** через `@fontsource-variable/geist` |
| State | Локальный `useState` + Context (`ThemeProvider`, `FavoritesProvider`); никаких Redux/Zustand |
| Данные | Статика в `src/pages/*/data.ts`; никаких fetch/API/Zod-валидаций в demo |

**Ловушка:** если поставить зависимости под Node 20, нативный биндинг `@rolldown/binding-darwin-arm64` не подтянется и dev-сервер упадёт. Лечится `rm -rf node_modules && pnpm install` под Node 22.

---

## 2. Структура `apps/demo/src`

> **Правило: дерево ниже — живое, поддерживается синхронно с кодом.**
> При **любом** изменении файлов в `apps/demo/src/` (добавление страницы, нового виджета, модуля в `lib/`/`store/`/`config/`, или удаление существующего) — **в той же правке обязательно обновить:**
> 1. Дерево файлов в этой секции (с одной строкой-описанием для нового файла);
> 2. Таблицу **Routing** ниже, если изменился `App.tsx` (новый/убранный/переименованный `<Route>`);
> 3. §11 Чек-лист — если паттерн новой страницы добавляет новый шаг.
>
> **Why:** AI-агенты и новые контрибьюторы используют это дерево как карту проекта. Если оно отстаёт от кода — путаница и дубли. Дерево живёт в репо, проходит code review, идёт вместе с PR — проверка тривиальная.
>
> **How to verify:** `find apps/demo/src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) | sort` должно совпадать с деревом ниже (с точностью до файлов в `node_modules`/`dist`).

```
src/
├── main.tsx                       — entry: ReactDOM, ThemeProvider, BrowserRouter
├── App.tsx                        — корневой компонент: AppShell + Routes
├── index.css                      — Tailwind 4 + токены (--accent, --font-sans, ...)
├── vite-env.d.ts                  — Vite-типы
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx           — общий wrapper: max-w-[1200px], flex-col, скролл-зона
│   │   ├── Header.tsx             — fixed top-0 шапка (logo + DesktopNav + theme toggle + profile)
│   │   ├── Footer.tsx             — нижний footer (© Rollout, социальные иконки)
│   │   └── ContentSlot.tsx        — пустой слот-плейсхолдер (для роутов /cart, /assistant)
│   ├── navigation/
│   │   ├── TabBar.tsx             — мобильный нижний таб-бар (5 пунктов из nav.ts)
│   │   ├── DesktopNav.tsx         — горизонтальный nav в Header (md+)
│   │   └── AssistantFAB.tsx       — оранжевая floating-action кнопка справа снизу
│   └── ui/
│       └── ThemeToggle.tsx        — переключатель light/dark
│
├── config/
│   └── nav.ts                     — единый источник пунктов навигации (NAV_ITEMS)
│
├── lib/
│   ├── theme.tsx                  — ThemeProvider + useTheme; пишет .dark/.light на <html>; localStorage('theme')
│   └── utils.ts                   — cn() (clsx + tailwind-merge)
│
├── store/
│   └── favorites.tsx              — FavoritesProvider; localStorage('favorites'); .has() / .toggle()
│
└── pages/
    ├── home/
    │   ├── HomePage.tsx           — главная: SearchBar + MainRubricator + MainCommercial + Recommendations
    │   ├── SearchBar.tsx
    │   ├── MainRubricator.tsx     — категории (Электроника, Одежда, ...)
    │   ├── MainCommercial.tsx     — баннеры
    │   ├── Recommendations.tsx
    │   ├── ProductCard.tsx
    │   └── data.ts
    ├── favorites/
    │   └── FavoritesPage.tsx
    ├── finance/
    │   ├── FinancePage.tsx        — оркестратор; собирает виджеты ниже
    │   ├── AccountCard.tsx
    │   ├── AnalyticWidgets.tsx
    │   ├── CurrencyRates.tsx
    │   ├── MoreProducts.tsx
    │   ├── PartnersWidget.tsx
    │   ├── PaymentsWidget.tsx
    │   ├── ProductsGrid.tsx
    │   ├── PromotionCard.tsx
    │   ├── SelfEmployment.tsx
    │   ├── TransactionHistory.tsx
    │   ├── TransferWidget.tsx
    │   └── data.ts
    └── profile/
        ├── ProfilePage.tsx        — /profile: аватар + меню + Финансы + Logout
        ├── PersonalDataPage.tsx   — /profile/personal-data: форма «Личные данные»
        ├── PromocodesPage.tsx     — /profile/promocodes: ввод промокода + список «Ваши промокоды»
        └── data.ts                — общий USER + WALLET; импортируется страницами profile/
```

**Routing (`App.tsx`):**

| path | element | Источник |
|---|---|---|
| `/` | `HomePage` | `pages/home/` |
| `/favorites` | `FavoritesPage` | `pages/favorites/` |
| `/finance` | `FinancePage` | `pages/finance/` |
| `/cart` | `ContentSlot` | плейсхолдер |
| `/profile` | `ProfilePage` | `pages/profile/` |
| `/profile/personal-data` | `PersonalDataPage` | `pages/profile/` |
| `/profile/promocodes` | `PromocodesPage` | `pages/profile/` |
| `/assistant` | `ContentSlot` | плейсхолдер |

**Алиасы** (`vite.config.ts` + `tsconfig.json`):
- `@/` → `apps/demo/src/`
- `@rollout/ui-kit`, `@rollout/ui-features` — workspace-пакеты (НЕ deep imports)

---

## 2.1 Workflow tooling (вне `apps/demo/src/`)

Скрипты и slash-команды, обслуживающие воркфлоу «новая страница». Живут вне
`apps/demo/src/`, поэтому в дерево §2 не попадают, но при изменении правил —
правятся синхронно с этим документом.

```
~/rollout-ui/
├── scripts/
│   ├── setup.sh              — first-run: nvm + Node 22.21.1 + pnpm@10.32.1 + install + preflight
│   ├── preflight.sh          — диагностика окружения с автофиксом (ROLLOUT_AUTOFIX=1)
│   ├── new-page.sh           — 4 интерактивных вопроса → промпт §2 в clipboard + лог
│   └── update-page.sh        — 2 вопроса → промпт «обнови по макету» в clipboard
│
├── .claude/
│   ├── launch.json           — preview-конфиги; Node 22 напрямую (не pnpm shim)
│   └── commands/
│       ├── setup.md          — slash `/setup` — обёртка над scripts/setup.sh
│       ├── preflight.md      — slash `/preflight` — bash + 3 MCP-проверки (Figma / Shadcn_UI / Claude_Preview)
│       ├── new-page.md       — slash `/new-page` — 4 вопроса + полный workflow до preview-screenshot
│       └── update-page.md    — slash `/update-page` — 2 вопроса + diff с макетом
│
└── apps/demo/.claude/
    └── page-recipe.yaml      — машинно-читаемые правила (контейнер, токены, запреты, верификация)
                                 единый источник истины для slash-команд
```

**`package.json` aliases** (корень репы):

| Скрипт | Что делает |
|---|---|
| `pnpm rollout:setup` | `bash scripts/setup.sh` — установка с нуля |
| `pnpm rollout:preflight` | `bash scripts/preflight.sh` — диагностика |
| `pnpm rollout:doctor` | `bash scripts/preflight.sh --verbose` — подробный вывод |
| `pnpm rollout:new-page` | `bash scripts/new-page.sh` — interactive/argv-driven |
| `pnpm rollout:update-page` | `bash scripts/update-page.sh` |

**Совместимость интерфейсов.** Один результат, два входа:

| Канал | Когда |
|---|---|
| `pnpm rollout:new-page` | вне Claude Code (другой LLM, ручной paste) — кладёт промпт в clipboard |
| `/new-page` в Claude Code | внутри сессии — задаёт вопросы через `AskUserQuestion`, сразу вызывает MCP-инструменты (Figma, Preview) и доводит до screenshot-diff |

Slash-команды **не дублируют** логику bash-скриптов: они либо вызывают `bash`
через `Bash`-tool, либо реализуют то, что из bash не сделать (MCP-вызовы Figma,
preview screenshot diff, обновление AGENTS.md).

**Где править правила страницы.** Запреты (radix, deep imports, `shadcn add`,
хардкод цветов), классы контейнера (`max-w-[576px]`, `pt-20`), список
обязательных шагов верификации — всё в [`apps/demo/.claude/page-recipe.yaml`](.claude/page-recipe.yaml).
При изменении yaml `/new-page` и `/update-page` подхватят новое поведение
автоматически — **не нужно править промпт-шаблон в slash-команде**.

**Логи.** Последний собранный промпт лежит в `~/rollout-ui/.claude/last-prompt.md`
(перезаписывается при каждом `rollout:new-page` / `rollout:update-page`). Полезно
для аудита того, что именно ушло агенту, если результат отличается от ожидаемого.

**Совместимость с pre-flight шпаргалкой §0.6.** Bash-команда из §0.6 — это
fallback для ситуаций, когда `pnpm rollout:preflight` недоступен (например,
агент запущен не в каталоге репы или pnpm ещё не установлен). Канонический
путь — `pnpm rollout:preflight` или `/preflight`; шпаргалка остаётся для
самодостаточности документа.

---

## 3. Дизайн-токены — `src/index.css`

Тема живёт **только** в этом файле. **Не создавать** `tailwind.config.*`.

### CSS-переменные

| Токен | Light | Dark | Назначение |
|---|---|---|---|
| `--background` | `hsl(0 0% 100%)` | `hsl(0 0% 3.9%)` | фон страницы |
| `--foreground` | `hsl(0 0% 3.9%)` | `hsl(0 0% 98%)` | основной текст |
| `--card` | `hsl(0 0% 100%)` | `hsl(0 0% 8%)` | поверхность карточек |
| `--popover` | `hsl(0 0% 100%)` | `hsl(0 0% 3.9%)` | поповеры/select content |
| `--primary` | `hsl(0 0% 9%)` | `hsl(0 0% 98%)` | основная кнопка |
| `--secondary` | `hsl(0 0% 96.1%)` | `hsl(0 0% 14.9%)` | вторичная поверхность |
| `--muted` | `hsl(0 0% 96.1%)` | `hsl(0 0% 14.9%)` | приглушённая поверхность (highlighted в меню) |
| `--muted-foreground` | `hsl(0 0% 45.1%)` | `hsl(0 0% 63.9%)` | helper-текст, плейсхолдеры |
| **`--accent`** | **`hsl(24 95% 53%)`** | **`hsl(24 95% 53%)`** | **бренд-оранжевый (orange-500)** |
| `--destructive` | `hsl(0 72.2% 50.6%)` | `hsl(0 72.2% 50.6%)` | ошибки/удаление |
| `--border` / `--input` | `hsl(0 0% 89.8%)` | `hsl(0 0% 14.9%)` | бордеры, инпуты |
| `--ring` | `hsl(0 0% 3.9%)` | `hsl(0 0% 83.1%)` | focus-ring |
| `--radius` | `0.5rem` | — | базовый радиус |
| **`--font-sans`** | `'Geist Variable', ui-sans-serif, system-ui, sans-serif` | то же | глобальный шрифт |

### Правила использования цвета

1. **Бренд-акцент `--accent` (оранжевый)** — `bg-accent` / `text-accent-foreground`. Используется для:
   - Avatar fallback (например, «АК» в `ProfilePage`)
   - FAB-кнопка ассистента (`AssistantFAB`)
   - Активное состояние таб-бара
   - Любые элементы, где Figma явно показывает оранжевый акцент

2. **Highlighted/hover в выпадающих списках, меню, командных панелях, items** — **`bg-muted text-foreground`**, НЕ `bg-accent`. Это shadcn-паттерн (см. [https://ui.shadcn.com/docs/components/base/select](https://ui.shadcn.com/docs/components/base/select)). Применено в [`packages/ui-kit/src/components/ui/select.tsx`](../../packages/ui-kit/src/components/ui/select.tsx) — повторять для всех новых меню/popover/combobox.

3. **Никогда не хардкодить** `bg-orange-500`, `bg-gray-200`, `text-[#0a0a0a]` и т.п. — только токены.

4. **Никогда не возвращать дефолтный shadcn-фиолетовый** `--accent: hsl(270 91% 65%)` — даже после копирования темы из шаблона или `pnpm dlx shadcn add`. Сразу проверять `:root` и `.dark`.

### Шрифт — Geist Variable

Подключение **только** через `@fontsource-variable/geist` (Vite-стандарт). НЕ через npm-пакет `geist` — он только для Next.js.

```css
@import 'tailwindcss';
@import '@fontsource-variable/geist';

@theme inline {
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  /* ... */
}

@layer base {
  html { font-family: var(--font-sans); }
  body { @apply ... font-sans; }
}
```

**Ловушка Tailwind v4:** только `--font-sans` в `@theme` недостаточно. Нужен явный `html { font-family: var(--font-sans) }`, иначе html унаследует системный шрифт.

Для mono-варианта: `@fontsource-variable/geist-mono` + `--font-mono: 'Geist Mono Variable', ...`.

### Dark mode

Через класс `.dark` на `<html>`, переключается в `lib/theme.tsx`. Кастом-вариант определён в `index.css`:

```css
@custom-variant dark (&:is(.dark *));
```

Использовать `dark:bg-...`, `dark:text-...` в Tailwind. Не использовать `prefers-color-scheme`.

---

## 4. Компоненты UI

### Где брать

1. **`@rollout/ui-kit`** — базовые примитивы. Доступно: `Button`, `ButtonGroup`, `Input`, `InputOTP`, `Label`, `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Avatar`, `Badge`, `Card`, `DropdownMenu`, `Select`, `Tabs`, `Separator`, `Typography`, `cn`. Импорт через `import { Button } from '@rollout/ui-kit'`.

2. **Если компонента нет в ui-kit** — добавить его в `packages/ui-kit/src/components/ui/<name>.tsx`:
   - **Только** на `@base-ui/react/<primitive>` — НЕ Radix, НЕ shadcn CLI. Список примитивов: `select`, `menu`, `dialog`, `tabs`, `popover`, `tooltip`, `checkbox`, `switch`, `radio`, `accordion`, `slider`, `field`, `input`, `button`, `avatar`-альтернативы (Avatar реализован вручную через context, см. ui-kit/src/components/ui/avatar.tsx).
   - Использовать `data-` атрибуты Base UI: `data-popup-open`, `data-highlighted`, `data-disabled`, `data-checked`, `data-open`, `data-closed`, `data-selected`. Активный таб — `data-[active]:` (НЕ `data-[state=active]:`).
   - Стилизация — Tailwind + `cn()` из ui-kit; для вариантов — `class-variance-authority` (`cva`).
   - Экспортировать через `packages/ui-kit/src/index.ts` (без deep imports).
   - Добавить changeset: `pnpm changeset` → minor для `@rollout/ui-kit`.

### Эталоны структуры

- [`packages/ui-kit/src/components/ui/dropdown-menu.tsx`](../../packages/ui-kit/src/components/ui/dropdown-menu.tsx) — Portal + Positioner + Popup паттерн
- [`packages/ui-kit/src/components/ui/select.tsx`](../../packages/ui-kit/src/components/ui/select.tsx) — Select на `@base-ui/react/select`
- [`packages/ui-kit/src/components/ui/button.tsx`](../../packages/ui-kit/src/components/ui/button.tsx) — CVA + variants/sizes
- [`packages/ui-kit/src/components/ui/field.tsx`](../../packages/ui-kit/src/components/ui/field.tsx) — Field + FieldLabel + FieldDescription + FieldError

---

## 5. Workflow Figma → код

Стандартный путь для любой новой страницы из макета.

### Шаги

1. **Чтение макета** (Framelink only — Code Connect намеренно не дёргается, см. §0.3):
   - `mcp__figma__get_figma_data({fileKey, nodeId})` — структура, переменные, components, токены (`globalVars.styles`)
   - `mcp__figma__download_figma_images({fileKey, nodes:[{nodeId, fileName:'<slug>.png'}], localPath:'.tmp/figma-ref', pngScale:2})` — эталонный PNG для визуального диффа

2. **Идентификация компонентов**:
   - В каждом узле смотри `name` / `componentId` — имя группы (`Button`, `Input`, `Item`, `Select`, `Switch`)
   - Если в Figma есть ссылка `https://ui.shadcn.com/docs/components/<name>` — это эталон поведения

3. **Сверка с shadcn MCP**:
   - `mcp__Shadcn_UI__get_component({componentName: '<kebab-case>'})` — исходник эталонного shadcn-компонента
   - `mcp__Shadcn_UI__get_component_demo({componentName: '<kebab-case>'})` — пример использования
   - Маппинг имён: `Alert Dialog` → `alert-dialog`, `Dropdown Menu` → `dropdown-menu`, `Input OTP` → `input-otp`, `Hover Card` → `hover-card`, `Radio Group` → `radio-group`
   - shadcn — **только эталон**. Реализуем **на `@base-ui/react`** (см. §4).

4. **Реализация на `@base-ui/react`**:
   - Если примитив отсутствует в ui-kit — добавляем (см. §4)
   - На странице импортируем из `@rollout/ui-kit`
   - Layout согласно макету (Tailwind классы)
   - Для mobile-first контейнера: `mx-auto flex max-w-[576px] flex-col gap-7 pt-20 pb-8` — **без `px-*`** (страницы рендерятся edge-to-edge внутри 576-колонки; внутренние блоки сами добавляют гуттер при необходимости)

5. **Точные токены 1-в-1** (см. §3):
   - Шрифт: Geist (Regular 400 / Medium 500 / SemiBold 600)
   - Текст: `text-sm` (14/20), `text-2xl` (24/32) и т.д. — Tailwind по умолчанию совпадает с Figma `text/sm`, `text/2xl`
   - Радиусы: `rounded-md` (12), `rounded-sm` (8), `rounded-2xl` (24)
   - Спейсинг: `gap-1..gap-7` (4/8/12/16/20/24/28)
   - Цвета и тени — только через CSS-переменные / Tailwind-токены

6. **Верификация (обязательно)**:
   - `mcp__Claude_Preview__preview_start({name: 'rollout-ui-demo'})`
   - Открыть нужный URL: `mcp__Claude_Preview__preview_eval` `window.location.assign('/path')`
   - `mcp__Claude_Preview__preview_screenshot` ↔ `.tmp/figma-ref/<slug>.png` (PNG из шага 1) — визуальный diff
   - Проверить **в светлой и тёмной теме** (toggle через `ThemeToggle`)
   - `mcp__Claude_Preview__preview_console_logs({level:'error'})` — должно быть пусто
   - Если есть расхождение — править код, не «интерпретировать» макет

7. **Не делать**:
   - не использовать произвольный CSS / inline-стили вместо токенов
   - не предлагать `pnpm dlx shadcn add`
   - не подключать `radix-ui`
   - не «улучшать» макет от себя
   - не делать deep imports

---

## 6. Паттерн страницы

```tsx
// apps/demo/src/pages/<area>/<Name>Page.tsx
import { Button, Field, FieldLabel, Input } from '@rollout/ui-kit'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function ExamplePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[576px] flex-col gap-7 pt-20 pb-8">
        {/* NavBar (если есть Title в макете) */}
        <div className="flex w-full items-start gap-2">
          <h1 className="flex-1 text-2xl font-semibold leading-8 text-foreground">Заголовок</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="size-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Контент */}
      </div>
    </div>
  )
}
```

### Соглашения

- **Контейнер**: `max-w-[576px] mx-auto`, **без боковых `px-*`** (edge-to-edge внутри 576-колонки), gap из `gap-6` или `gap-7` (по Figma). Если внутреннему блоку нужен внутренний отступ — он добавляет себе сам.
- **Заголовок**: `<h1 className="text-2xl font-semibold leading-8 text-foreground">` (для H3 в Figma DS).
- **Известное расхождение**: глобальный `Header` (`fixed top-0`, ~72px) перекрывает первый блок страницы — это общая особенность `AppShell`, не Figma. Если макет требует — добавить контейнеру `pt-20`.
- **Нижний отступ под TabBar (mobile-only)**:
  - **На мобильных** (`<md`) экран TabBar (`fixed bottom-0`) перекрывает низ контента; нужен padding-bottom ≈ **70px** (34px бар + 36px ассистент-FAB + `env(safe-area-inset-bottom)` для iOS notch).
  - В коде это утилита `.pb-tabbar` ([apps/demo/src/index.css:99](src/index.css)): `padding-bottom: calc(34px + 36px + 28px + env(safe-area-inset-bottom, 0px))` = **34px (TabBar) + 36px (AssistantFAB clearance) + 28px (content breathing gap, =`spacing/7` Figma) + iOS safe-area**.
  - **`.pb-tabbar` обёрнут в `@media (max-width: 767.98px)`** — utility активен ТОЛЬКО на mobile. Без media-query он переопределял `md:pb-0` (одинаковая cascade specificity, идёт позже в CSS), и Footer на десктопе не мог уехать на дно viewport через `md:mt-auto` — оставались лишние 98px padding снизу. **Не разворачивать обратно** — иначе sticky-footer на десктопе сломается.
  - **AppShell уже применяет `pb-tabbar md:pb-0` на корневом wrapper** ([AppShell.tsx:11](src/components/layout/AppShell.tsx)) — обычная страница получает отступ автоматически и **не должна** дублировать `pb-tabbar` у себя.
  - **AppShell использует `min-h-screen`, не `h-screen`** (и НЕ `h-full` на inner) — критично для длинных страниц с body-scroll. С `h-screen` корневой div был бы фиксирован на 100vh, контент перепрыгнул бы за пределы через body-scroll, а `pb-tabbar` остался бы внутри 100vh-блока и не доехал до конца страницы (был баг — кнопка прилипала к TabBar). Если когда-то понадобится сделать AppShell scroll-зоной (overflow-y-auto) — менять обратно на `h-screen` + `h-full` + `overflow-y-auto`, иначе оставлять `min-h-screen`.
- **Footer прибит к низу на десктопе + ширина по контенту на мобиле**: [Footer.tsx](src/components/layout/Footer.tsx) имеет `max-w-[576px] mx-auto md:max-w-none md:mt-auto`:
  - На мобиле/планшете (`<md`) ширина = `max-w-[576px]` (как у всех страниц), не растягивается шире контентной части.
  - На десктопе (`md+`) `md:max-w-none` снимает ограничение → Footer спускается на полную ширину `max-w-300` wrapper'а; `md:mt-auto` распределяет свободное пространство над Footer в flex-col, т.е. на коротких страницах Footer уезжает на низ viewport, на длинных — схлопывается до 0 и идёт сразу за контентом.
  - **Не возвращать** `mb-4` или `md:mb-0` — они дублировали отступ снизу. Зазор от TabBar даёт `pb-tabbar` на корневом wrapper.
  - **Не убирать** `md:mt-auto` (sticky-footer) и `max-w-[576px]` (mobile content alignment).
  - Внутри страницы добавляй только косметический `pb-8` (32px) для дыхания контента — он сложится с пб от AppShell.
  - **Когда добавлять `pb-tabbar` явно у страницы**: если страница рендерится **вне** AppShell (отдельный layout, модальный route, fullscreen-overlay, или собственный scroll-контейнер с `overflow-y-auto`) — обязан повесить `pb-tabbar md:pb-0` на свой scroll-контейнер.
  - **Не использовать** хардкод `pb-[70px]`/`pb-20` — нарушает iOS safe-area; всегда `pb-tabbar`.
- **Routing**: добавить `<Route path="/<path>" element={<NewPage />} />` в `App.tsx`. Подключить навигацию через `<Link to="/<path>">` (НЕ `<a href>`).
- **Состояние формы**: локальный `useState`. Никаких `react-hook-form`/Zod в demo (бизнес-логики нет).
- **Иконки**: `lucide-react`. Размер по Figma (`size-4`, `size-5`).
- **Mock-обработчики**: `onClick={() => { /* mock */ }}` — не оставлять `console.log`.

---

## 7. Запуск, сборка, верификация

### Локально

```bash
nvm use 22.21.1
corepack enable && corepack prepare pnpm@10.32.1 --activate   # один раз
cd ~/rollout-ui
pnpm install
pnpm --filter @rollout/demo dev   # localhost:5173
```

### Через preview MCP (Claude Code)

В `~/.claude/launch.json` есть конфиг **`rollout-ui-demo`**:
```json
{
  "name": "rollout-ui-demo",
  "cwd": "/Users/avarentcov/rollout-ui/apps/demo",
  "runtimeExecutable": "/Users/avarentcov/.nvm/versions/node/v22.21.1/bin/node",
  "runtimeArgs": ["./node_modules/vite/bin/vite.js"],
  "port": 5173
}
```

Запуск: `mcp__Claude_Preview__preview_start({name: 'rollout-ui-demo'})`.

> **Не путать** с конфигом `rollout-demo` в том же файле — он указывает на старый проект `~/ROLLOUT Demo app /` и не имеет отношения к этой монорепе.

### Production build

```bash
pnpm --filter @rollout/demo build   # apps/demo/dist
pnpm --filter @rollout/demo preview # проверить статику
```

### Тесты / линт

```bash
pnpm --filter @rollout/demo test
pnpm --filter @rollout/demo lint
```

---

## 8. Релизы публичных пакетов

Любая правка в `packages/ui-kit/` или `packages/ui-features/` (включая «вынес компонент из demo в ui-kit»):

1. `pnpm changeset` в корне репы → выбрать пакет, тип бампа (patch/minor/major), описать изменение
2. Закоммитить файл из `.changeset/`
3. Без changeset CI не выпустит версию

Demo и Storybook (`@rollout/storybook`) исключены в `.changeset/config.json` — для них changeset не нужен.

---

## 9. Источники истины (порядок приоритета)

1. **`~/rollout-ui/AGENTS.md`** — корневой, общий для всей монорепы
2. **`~/rollout-ui/apps/demo/AGENTS.md`** — этот файл (специфика demo)
3. **`~/rollout-ui/CONTRIBUTING.md`** — рабочий процесс контрибьютора
4. **`~/rollout-ui/README.md`** — публичное описание

При конфликте — выше по списку приоритетнее.

> **§0 запускается ДО чтения остальных секций.** Без пройденного pre-flight команды из §7 («pnpm dev») и MCP-вызовы из §5 (Figma) упадут — будут потрачены попытки и время.

---

## 10. Внешние ресурсы

- **Storybook (live):** [https://rolloutrf.github.io/rollout-ui](https://rolloutrf.github.io/rollout-ui)
- **Figma DS landing:** [https://rolloutblocks.tilda.ws/libraries](https://rolloutblocks.tilda.ws/libraries)
- **Figma file keys:**
  - Demo App (макеты экранов): `p2bAIyTB6oJTGWjjR8NwRB`
  - shadcn · actual (эталонная DS): `Rf9NPBgJOgcj504cSoo8kg`
- **GitHub:** [https://github.com/rolloutrf/rollout-ui](https://github.com/rolloutrf/rollout-ui)
- **Контакт команды:** Telegram `@rolloutrf` — для обсуждения больших фич перед PR
- **shadcn Base Select reference:** [https://ui.shadcn.com/docs/components/base/select](https://ui.shadcn.com/docs/components/base/select)
- **Base UI docs:** [https://base-ui.com/react/components](https://base-ui.com/react/components)

---

## 11. Чек-лист для новой страницы

- [ ] **Pre-flight Onboarding пройден** (см. §0): Node 22 + pnpm 10.32.1, MCP `figma` / `Shadcn_UI` / `Claude_Preview` доступны, `launch.json → rollout-ui-demo` корректен, Figma key читает Demo App без 403
- [ ] Получены `figma_data` + локальный PNG (`.tmp/figma-ref/<slug>.png`) исходного нода
- [ ] Распознаны компоненты, найдены аналоги в `@rollout/ui-kit`
- [ ] Если нет — добавлен примитив в ui-kit (на `@base-ui/react`, через корневой `index.ts`, +changeset)
- [ ] Создана `apps/demo/src/pages/<area>/<Name>Page.tsx` с контейнером `max-w-[576px]`
- [ ] Добавлен `<Route>` в `App.tsx`
- [ ] Подключена навигация через `<Link>` из родительской страницы
- [ ] Проверены токены: `--accent` оранжевый, highlighted = `bg-muted`, шрифт Geist
- [ ] preview_screenshot ↔ figma get_screenshot совпадают (light + dark)
- [ ] `preview_console_logs level:'error'` пусто
- [ ] Нет хардкоднутых цветов/шрифтов/размеров (всё через токены)
- [ ] Нет deep imports, нет `radix-ui`, нет `shadcn add`
- [ ] **Обновлено дерево в §2** (новые файлы добавлены с описанием), и при необходимости таблица **Routing** под ним
- [ ] Если страница вне AppShell или со своим scroll-контейнером — повешен `pb-tabbar md:pb-0` (см. §6 «Нижний отступ под TabBar»)
