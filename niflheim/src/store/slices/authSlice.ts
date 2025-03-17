import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  mobileSession: boolean;
  SessionID: string | null;
  Phone: string | null;
  Password: string | null;
  Username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  mobileSession: false,
  SessionID: null,
  Phone: null,
  Password: null,
  Username: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.mobileSession = true;
      state.SessionID = action.payload.SessionID;
      state.Phone = action.payload.Phone;
      state.Password = action.payload.Password;
      state.Username = action.payload.Username;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.mobileSession = false;
      state.SessionID = null;
      state.Phone = null;
      state.Password = null;
      state.Username = null;
    },
  },
});

export const { authenticate, signout } = authSlice.actions;
export default authSlice.reducer;
