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

export const addUser = createAsyncThunk(
  'users/add',
  async (userData: Partial<User>) => {
    const response = await axios.post('https://reqres.in/api/users', userData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: Partial<User>) => {
    const response = await axios.put(
      `https://reqres.in/api/users/${userData.id}`,
      userData
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    return id;
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
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
