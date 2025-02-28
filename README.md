# **User Management Application**

A modern **Single Page Application (SPA)** for managing users with authentication, CRUD operations, search, pagination, and multiple view modes.

## **Features**

✅ User Authentication  
✅ User CRUD Operations (Create, Read, Update, Delete)  
✅ Search Functionality  
✅ Pagination  
✅ List/Card View Toggle  
✅ Responsive Design with Tailwind CSS and Material-UI
✅ Secure API Integration with Axios

## **Tech Stack**

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Router v6
- **Styling**: Tailwind CSS + Material-UI
- **API Handling**: Axios
- **Development Tools**: ESLint, Prettier, Jest

---

## **Getting Started**

### **1. Clone the Repository**

```sh
git clone https://github.com/BharathKumar-c/user-management.git
cd user-management
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Start Development Server**

```sh
npm start
```

The application will be available at **`http://localhost:3000/`** (CRA default port).

---

## **Project Structure**

```
user-management/
│── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (Login, User List, etc.)
│   ├── state/            # Redux store configuration
│   │   ├── store.ts
│   │   ├── slices/
│   │   │   ├── userAuthSlice.ts
│   │   │   ├── userSlice.ts
│   ├── util/             # Utility functions
│   ├── App.tsx           # Root component
│   ├── index.tsx         # Entry point
│   ├── routes.tsx        # Route definitions
│── tailwind.config.js    # Tailwind CSS configuration
│── tsconfig.json         # TypeScript configuration
│── .eslintrc.js          # ESLint configuration
│── .prettierrc           # Prettier configuration
│── package.json          # Dependencies & scripts
│── README.md             # Project documentation
```

---

## **Available Scripts**

Run these commands inside the project directory:

- **Start Development Server**
  ```sh
  npm start
  ```
- **Build for Production**
  ```sh
  npm run build
  ```
- **Format Code using Prettier**
  ```sh
  npm run format
  ```
- **Check Code Linting**
  ```sh
  npm run lint
  ```

---

## **License**

This project is licensed under the **MIT License**.
