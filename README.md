# 🔄 Reactive Document Rendering System (TypeScript)
### Домашнє завдання до Теми Поведінковий патерн Спостерігач — Observer Pattern

## 🎯 Мета роботи

Розширити генератор документів із попереднього домашнього завдання, додавши реактивний механізм відстеження процесу рендерингу за допомогою поведінкового патерну **Observer (Спостерігач)**.

Під час генерації кожен елемент документа (`Paragraph`, `List`, `Section`) надсилає подію про завершення рендерингу, а підписники реагують на ці події незалежно від основної логіки застосунку.

---

## 🏗️ Реалізована функціональність

✅ Рендеринг документа у форматах:

- Markdown
- HTML
- Plain Text

✅ Відправка подій після завершення рендерингу кожного елемента

✅ Логування процесу рендерингу

✅ Підрахунок кількості секцій, параграфів та списків

✅ Вимірювання загального часу генерації документа

✅ Можливість легко додавати нових підписників без зміни існуючого коду

---

## 🧠 Застосовані патерни

### 🔄 Observer (Спостерігач)

Реалізовано систему підписки на події рендерингу:

- **RenderEventPublisher** — видавець подій;
- **RenderEventSubscriber** — інтерфейс підписників;
- **RenderLoggerSubscriber** — логування рендерингу;
- **SummaryCollector** — збір статистики;
- **PerformanceSubscriber** — підрахунок часу рендерингу.

---

## 🔄 Реалізація Observer

Кожен елемент документа після завершення рендерингу викликає:

```ts
RenderEventPublisher.notify(context);
```

`RenderEventPublisher` зберігає список підписників та повідомляє їх про подію.

Події передаються через об'єкт:

```ts
export interface RenderContext {
  type: "Section" | "Paragraph" | "List";
  content: string;
  level?: number;
  items?: string[];
  renderTime?: number;
}
```

---

## 🚀 Приклади запуску

### 📝 Markdown

```bash
npx ts-node src/main.ts markdown output.md
```

### 🌐 HTML

```bash
npx ts-node src/main.ts html output.html
```

### 📄 Plain Text

```bash
npx ts-node src/main.ts plain output.txt
```

### 💻 Вивід у консоль

```bash
npx ts-node src/main.ts markdown
```

---

## 📋 Приклад роботи

```text
[Log] Rendered Paragraph (44 chars)
[Log] Rendered Paragraph (53 chars)
[Log] Rendered List (3 items)
[Log] Rendered Section ("Composite", level 2)
[Log] Rendered Paragraph (34 chars)
[Log] Rendered List (2 items)
[Log] Rendered Section ("Bridge", level 2)
[Log] Rendered Section ("Основні патерни", level 2)
[Log] Rendered Section ("Структурні патерни", level 1)

[Summary] Rendered 4 sections, 3 paragraphs, 2 lists

[Performance] Total render time: 2ms
```

---

## ➕ Приклад нового підписника

Для додавання нового Observer достатньо реалізувати інтерфейс:

```ts
export class CustomSubscriber implements RenderEventSubscriber {
  update(context: RenderContext): void {
    console.log("New event:", context.type);
  }
}
```

та зареєструвати його:

```ts
RenderEventPublisher.subscribe(new CustomSubscriber());
```

---

## ✅ Результат

У результаті роботи створено реактивну систему генерації документів, яка поєднує:

- Composite та Bridge з попереднього домашнього завдання;
- Observer для відстеження подій рендерингу;
- логування, статистику та моніторинг продуктивності без зміни логіки елементів документа.

---

У ході виконання роботи було реалізовано патерн **Observer**, який забезпечує слабкий зв'язок між компонентами системи та дозволяє легко розширювати функціональність застосунку новими підписниками без модифікації існуючого коду.

## 📁 Структура проєкту

```text
src/
├── main.ts
├── RenderEventPublisher.ts
├── interfaces/
│   ├── RenderEventSubscriber.ts
│   ├── RenderContext.ts
│   ├── DocNode.ts
│   └── DocRenderer.ts
├── subscribers/
│   ├── RenderLoggerSubscriber.ts
│   ├── SummaryCollector.ts
│   └── PerformanceSubscriber.ts
├── nodes/
│   ├── Section.ts
│   ├── Paragraph.ts
│   └── List.ts
├── factories/
│   └── RendererFactory.ts
└── renderers/
    ├── HTMLRenderer.ts
    ├── MarkdownRenderer.ts
    ├── PlainTextRenderer.ts
    └── BaseRenderer.ts
```