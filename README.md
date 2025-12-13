# React Todo Application

> **Disclaimer**
> This is **not vibe-coded**.
> ChatGPT was used only for **brainstorming and discussion and debugging when needed**.
> All decisions related to **state management, folder structure, component design, and test case design** were made by me.

---

## 🚀 Getting Started (Most Important)

### Run the app

```bash
npm install
npm run dev
```

### Run tests

```bash
npm run test
```

---

## Overview

Built with **React, TypeScript, and Vite**.
The focus is on component structure, predictable state handling, and test coverage.

---

## Core Features

- List tasks in **reverse chronological order**
- Add task
  - Title (required, non-empty, max 120 characters)
  - Description (optional, max 1000 characters)
- Edit task (title and description)
- Delete task
- Mark task as done / undone
- Persist tasks using `localStorage`
- Empty state when no tasks exist

---

## Additional Features

- Sidebar-based views (Today / Upcoming / Completed)
- Search tasks by title
- Auto-focus on title input when adding a task
- Visual indication for completed tasks (checkbox + strike-through)
- Press enter to add task to list
- Press Escape to clear editing / addition

---

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Jest
- React Testing Library

---

## State Management

- React Context for shared state
- Local component state where appropriate
- No external state management libraries

---

## Testing

### Covered Areas

- Sidebar, Main section, Details section (component tests)
- Add, edit, delete task flows (integration tests)
- Search behavior
- View switching
- Task completion toggle

### Testing Approach

- User-focused tests
- Minimal mocking
- Shared test utilities and test data

## Limitations / Known Gaps

- Tailwind theme configuration is not done properly
- React 19 APIs are not explored
- Accessibility is minimal

## Ongoing Work

> Any changes or features or test cases added after Saturday, 13 December 2025 should be considered add-ons or enhancements or Fixes, not part of the original scope.
