import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userName: localStorage.getItem("userName") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; userName: string }>,
    ) => {
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userName", action.payload.userName);
    },
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("users");
    },
  },
});

export const { loginSuccess, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
