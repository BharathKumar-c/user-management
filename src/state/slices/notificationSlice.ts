import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NotificationState {
  open: boolean;
  message: string;
  type: 'success' | 'error';
}

const initialState: NotificationState = {
  open: false,
  message: '',
  type: 'success',
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const {showNotification, hideNotification} = NotificationSlice.actions;
export default NotificationSlice.reducer;
