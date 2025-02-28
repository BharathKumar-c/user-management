import React from "react";
import AppRoutes from "./routes";
import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <Notification />
    </ErrorBoundary>
  );
}

export default App;
