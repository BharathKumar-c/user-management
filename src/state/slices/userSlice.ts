import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../util/types";
import { showNotification } from "./notificationSlice";

interface userState {
  users: User[];
  totalPageCount: number;
  loading: boolean;
}

const initialState: userState = {
  users: [],
  totalPageCount: 0,
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number, { dispatch }) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`,
      );
      return response.data;
    } catch (error) {
      dispatch(
        showNotification({ message: "Failed to fetch users", type: "error" }),
      );
      throw error;
    }
  },
);

export const addUser = createAsyncThunk(
  "users/add",
  async (userData: Partial<User>, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://reqres.in/api/users",
        userData,
      );
      dispatch(
        showNotification({
          message: "User added successfully!",
          type: "success",
        }),
      );
      return response.data;
    } catch (error) {
      dispatch(
        showNotification({ message: "Failed to add user", type: "error" }),
      );
      throw error;
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData: Partial<User>, { dispatch }) => {
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${userData.id}`,
        userData,
      );
      dispatch(
        showNotification({
          message: "User updated successfully!",
          type: "success",
        }),
      );
      return response.data;
    } catch (error) {
      dispatch(
        showNotification({ message: "Failed to update user", type: "error" }),
      );
      throw error;
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { dispatch }) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      dispatch(
        showNotification({
          message: "User deleted successfully!",
          type: "success",
        }),
      );
      return id;
    } catch (error) {
      dispatch(
        showNotification({ message: "Failed to delete user", type: "error" }),
      );
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalPageCount = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
