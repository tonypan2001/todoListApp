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

git clone https://github.com/tonypan2001/todoListApp.git
cd todoListApp

npm install

npm run dev

Serve app at http://localhost:5173

## Example
### Desktop
<img width="1792" height="1077" alt="Screenshot 2568-08-12 at 12 56 41" src="https://github.com/user-attachments/assets/644a6181-335d-4efe-953a-a9ae100bc010" />
### Mobile
<img width="375" height="814" alt="Screenshot 2568-08-12 at 12 57 46" src="https://github.com/user-attachments/assets/c53a60d7-6ced-419e-869a-b53ea44bbd7f" />

