import axios from "axios";
import { showNotification } from "../state/slices/notificationSlice";

// We'll hold a reference to the store after initialization.
let storeRef: any = null;

// A function to set the store reference.
export const setStore = (store: any) => {
  storeRef = store;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://reqres.in/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (storeRef) {
      storeRef.dispatch(
        showNotification({
          message:
            error.response?.data?.error || "An unexpected error occurred",
          type: "error",
        }),
      );
    }
    return Promise.reject(error);
  },
);

export default api;
