# Как добавить новую страницу в `apps/demo`

От Figma-макета до запущенной страницы — **3 команды**.

> Полные правила и обоснования — в [AGENTS.md](AGENTS.md). Машинно-читаемые
> правила (для slash-команд) — в [.claude/page-recipe.yaml](.claude/page-recipe.yaml).
> При расхождении приоритет у `AGENTS.md`.

---

## TL;DR — три команды

| Когда | Команда | Что происходит |
|---|---|---|
| Один раз на машине | `pnpm rollout:setup` | nvm + Node 22.21.1 + pnpm 10.32.1 + `pnpm install` + preflight |
| Раз на сессию (при сомнениях) | `pnpm rollout:preflight` | диагностика окружения с автофиксом `node_modules` |
| На каждую страницу | `/new-page` в Claude Code | агент задаёт 4 вопроса и сам делает всё от Figma до preview-screenshot |

`/new-page` без Claude Code — есть `pnpm rollout:new-page`: те же 4 вопроса,
готовый промпт кладётся в clipboard, вставляешь в любой LLM-агент.

---

## 1. Установка (один раз)

```bash
git clone https://github.com/rolloutrf/rollout-ui.git ~/rollout-ui
cd ~/rollout-ui
pnpm rollout:setup
```

Скрипт сам поставит nvm-managed Node 22.21.1, активирует pnpm через corepack,
выполнит `pnpm install`, в конце прогонит preflight. Если nvm не установлен —
напечатает строку `curl ... install.sh` и остановится; запусти её и повтори.

Дополнительно — Claude Code: [https://docs.claude.com/en/docs/claude-code](https://docs.claude.com/en/docs/claude-code).
В `~/.claude/launch.json` нужна запись `rollout-ui-demo` (preflight подскажет
готовый JSON-блок и скопирует его в clipboard).

## 2. Pre-flight (раз на сессию или при подозрении)

```bash
pnpm rollout:preflight
```

Зелёный вывод = можно работать. Если что-то красное — скрипт печатает
команду, которой это лечится. Подводные камни (Node 20 без rolldown-биндинга,
отсутствие конфига preview, неактивный nvm) лечатся автоматически или
одной строкой.

В Claude Code дополнительно работает `/preflight` — он добавляет три
MCP-проверки (Figma, shadcn, Claude Preview), которые из bash не сделать.
Code Connect MCP намеренно не пробится — см. [`AGENTS.md` §0.3](AGENTS.md).

## 3. Новая страница — `/new-page`

Открой Claude Code в `~/rollout-ui`, введи `/new-page`. Агент спросит четыре
вещи и сам сделает всё остальное:

| Вопрос | Пример |
|---|---|
| Название экрана | `Личные данные` |
| Figma URL (с `?node-id=…`) | `https://www.figma.com/design/p2bAIyTB6oJTGWjjR8NwRB/Demo-App?node-id=221-4087` |
| Откуда переход (файл страницы) | `apps/demo/src/pages/profile/ProfilePage.tsx` |
| На каком элементе | `блок «Аккаунт» — секция с аватаром и email` |
| Новый route | `/profile/personal-data` |

> Описывай **«элемент»** через визуальные приметы и маркер-текст
> (`<p>Аккаунт</p>`, аватар, email), а не «строки 103–115». Так промпт
> переживёт правки файла.

Альтернатива без Claude Code:

```bash
pnpm rollout:new-page                   # интерактивные вопросы
pnpm rollout:new-page "Личные данные" \
  "https://figma…" \
  "apps/demo/src/pages/profile/ProfilePage.tsx" \
  "блок «Аккаунт»" \
  "/profile/personal-data"              # argv-driven
```

Скрипт собирает промпт по шаблону и кладёт в clipboard (`pbcopy`).
Лог последнего промпта — `~/rollout-ui/.claude/last-prompt.md`.

Аналог для уже существующих страниц — `/update-page` (или
`pnpm rollout:update-page <file> <figma-url>`): два вопроса, агент делает diff
с макетом и приводит код в соответствие.

---

## Что агент делает за тебя (для понимания scope)

Не нужно делать руками — это случится в `/new-page`:

1. Параллельно читает Figma — `mcp__figma__get_figma_data` (структура+токены) + `mcp__figma__download_figma_images` (PNG в `.tmp/figma-ref/`). Code Connect MCP не дёргается — см. [`AGENTS.md` §0.3](AGENTS.md).
2. Сверяет компоненты со shadcn/ui MCP (эталон поведения и визуала).
3. Создаёт `apps/demo/src/pages/<area>/<Name>Page.tsx` с контейнером `max-w-[576px] mx-auto pt-20 pb-8 gap-7`.
4. NavBar по макету, токены — только переменные (Geist, `bg-accent`/`bg-muted`/`text-foreground`, без хексов).
5. Реализация компонентов на `@base-ui/react` через `@rollout/ui-kit` (НЕ Radix, НЕ `pnpm dlx shadcn add`).
6. Добавляет `<Route>` в `apps/demo/src/App.tsx` и заменяет элемент входа на `<Link to>` (НЕ `<a href>`).
7. Верифицирует через `Claude_Preview` (light + dark + mobile, console errors empty), сравнивает со скриншотом из Figma.
8. Обновляет дерево в [AGENTS.md §2](AGENTS.md) и таблицу Routing если изменился `App.tsx`.

Полный набор правил, которые применяет агент, — в [.claude/page-recipe.yaml](.claude/page-recipe.yaml).
Если что-то нужно изменить (например, новый запрет или другой контейнер) — правь yaml,
slash-команды подхватят без правок промптов.

---

## Чек-лист (перед PR)

- [ ] Pre-flight зелёный (`pnpm rollout:preflight`)
- [ ] preview_screenshot ↔ `.tmp/figma-ref/<slug>.png` совпадают (light + dark)
- [ ] preview_console_logs `level: 'error'` пусто
- [ ] Нет хардкоднутых цветов/шрифтов/размеров
- [ ] Нет deep imports, `radix-ui`, `pnpm dlx shadcn add`
- [ ] Дерево в [AGENTS.md §2](AGENTS.md) обновлено
- [ ] При новом ui-kit компоненте — добавлен `pnpm changeset` (minor для `@rollout/ui-kit`)
- [ ] Если страница со своим scroll-контейнером — `pb-tabbar md:pb-0` повешен

---

## Полезные ссылки

- Полные правила: [`apps/demo/AGENTS.md`](AGENTS.md)
- Корневые правила монорепы: [`~/rollout-ui/AGENTS.md`](../../AGENTS.md)
- Машинные правила (для slash-команд): [`.claude/page-recipe.yaml`](.claude/page-recipe.yaml)
- Storybook (live): [https://rolloutrf.github.io/rollout-ui](https://rolloutrf.github.io/rollout-ui)
- shadcn Base UI reference: [https://ui.shadcn.com/docs/components/base/select](https://ui.shadcn.com/docs/components/base/select)
- Base UI docs: [https://base-ui.com/react/components](https://base-ui.com/react/components)
- Figma file keys:
  - Demo App (макеты экранов): `p2bAIyTB6oJTGWjjR8NwRB`
  - shadcn · actual (эталонная DS): `Rf9NPBgJOgcj504cSoo8kg`
- Контакт: Telegram `@rolloutrf` — для обсуждения больших фич перед PR

---

## Частые проблемы

| Симптом | Лечение |
|---|---|
| `Cannot find native binding` | `pnpm rollout:preflight` (с `ROLLOUT_AUTOFIX=1` сам переустановит `node_modules` под Node 22) |
| `getComputedStyle(body).fontFamily` не Geist | проверь `html { font-family: var(--font-sans); }` в `index.css` (см. [AGENTS.md §3](AGENTS.md)) |
| Заголовок страницы скрыт за Header | контейнеру добавить `pt-20` (компенсирует ~72px fixed Header) |
| Highlighted в Select оранжевый | заменить `bg-accent` на `data-highlighted:bg-muted data-highlighted:text-foreground` |
| Figma MCP даёт 403 | новый ключ на [figma.com/developers/api](https://www.figma.com/developers/api#access-tokens), правка `~/.claude.json` → `mcpServers.figma.env.FIGMA_API_KEY`, **рестарт Claude Code** (env читается на старте) |
| Preview подхватывает чужой проект | имя должно быть `rollout-ui-demo`, не `rollout-demo`; перепроверь `cwd` в `~/.claude/launch.json` |
| `pnpm dev` нет такого скрипта | используй `pnpm --filter @rollout/demo dev` или MCP `preview_start({name:'rollout-ui-demo'})` |

---

> Если нужно посмотреть «как это работало раньше» (длинный manual prompt-template
> из §2, пошаговое объяснение Figma → shadcn → page → routing → verify) —
> история живёт в git: `git log -p apps/demo/HOW_TO_ADD_PAGE.md`. Сегодня всё это —
> работа агента, не пользователя.

**Если что-то не по списку — Telegram `@rolloutrf`, ДО того, как тратить часы на угадывание.**
