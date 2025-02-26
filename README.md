# User Management App

## Project Setup
This project is a User Management Single Page Application (SPA) built with React, TypeScript, Redux Toolkit, Tailwind CSS, and Material-UI. It includes authentication, user CRUD operations, search, pagination, and a list/card view toggle.

## Tech Stack
- **React** (TypeScript)
- **Redux Toolkit** (State Management)
- **React Router** (Navigation)
- **Tailwind CSS** (Styling)
- **Material-UI** (UI Components)
- **Axios** (API Calls)

---

---
### **Step 2: Folder Structure & Redux Setup**
**Updated Folder Structure:**
```
user-management/
│── src/
│   ├── component/        # Reusable UI components
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   ├── service/          # API service functions
│   ├── state/            # Redux store setup
│   │   ├── store.ts      # Redux store
│   │   ├── slices/       # Redux slices
│   │   │   ├── userAuthSlice.ts
│   │   │   ├── userSlice.ts
│   ├── styles/           # Global styles
│   ├── util/             # Utility functions
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   ├── routes.tsx        # Route definitions
│── tailwind.config.js
│── tsconfig.json
│── package.json
```
