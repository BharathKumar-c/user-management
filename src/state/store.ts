import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    users: userReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
