# 📝 Todo List App (React + TypeScript + MSW)

A simple Todo List application built with **React Functional Components**, **TypeScript**, and **Mock API** using **MSW (Mock Service Worker)**.  
This project demonstrates fetching, creating, editing, deleting, filtering, and toggling tasks between **Done** and **Not Done**, with a professional UI including skeleton loading, error states, and retry functionality.

---

## 🚀 Features
- **Display tasks from API** (MSW mock API simulating backend)
- **Create / Edit / Delete tasks**
- **Toggle task status** (Done / Not Done)
- **Filter tasks** by:
  - Search keyword
  - Completion status (All / Complete / Incomplete)
  - Date sorting (Latest / Oldest)
- **Persistent data** in localStorage (via MSW in-browser storage)
- **UI Enhancements**
  - Skeleton loader during fetching
  - Error state with Retry button
  - Modal form for create/edit
  - Color picker for task label
  - Date picker (with option to disallow past dates)
- **State management** using React local state + custom hooks

---

## 🛠 Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Mock API**: MSW (Mock Service Worker)
- **State Management**: React hooks (`useState`, `useEffect`)
- **Icons**: React Icons
- **Date Picker**: Custom React component

---

## 📦 Installation & Run

### 1️⃣ Clone this repo
```bash
git clone https://github.com/tonypan2001/todoListApp.git
cd todoListApp

npm install

npm run dev

Serve app at http://localhost:5173
