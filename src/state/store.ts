import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice';
import userReducer from './slices/userSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    users: userReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
