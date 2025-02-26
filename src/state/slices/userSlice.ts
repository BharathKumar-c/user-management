import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userState {
  name: string | null;
  email: string | null;
}

const initialState: userState = {
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
