import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from '../../util/types';

interface userState {
  users: User[];
  loading: boolean;
}

const initialState: userState = {
  users: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk<User[], number>(
  'users/fetchUsers',
  async (page: number) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    return response.data.data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
