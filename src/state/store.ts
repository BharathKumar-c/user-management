import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";
import { setStore } from "../util/api";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    users: userReducer,
    notification: notificationReducer,
  },
});

// Set the store reference for our API module
setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
