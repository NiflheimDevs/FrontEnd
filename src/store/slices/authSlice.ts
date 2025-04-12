import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  mobileSession: boolean;
  canChangePassword: boolean;
  SessionID: string | null;
  Phone: string | null;
  Password: string | null;
  Username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  canChangePassword: false,
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
      state.canChangePassword = false;
      state.SessionID = action.payload.SessionID;
      state.Phone = action.payload.Phone;
      state.Password = action.payload.Password;
      state.Username = action.payload.Username;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.mobileSession = false;
      state.canChangePassword = false;
      state.SessionID = null;
      state.Phone = null;
      state.Password = null;
      state.Username = null;
    },
    ChangePassPermission: (state, action) => {
      state.mobileSession = false;
      state.canChangePassword = true;
      state.SessionID = action.payload.SessionID;
    },
    ChangePassSessions: (state, action) => {
      state.mobileSession = true;
      state.canChangePassword = false;
      state.SessionID = action.payload.SessionID;
      state.Phone = action.payload.Phone;
    }
  },
});

export const { authenticate, signout, ChangePassPermission, ChangePassSessions } = authSlice.actions;
export default authSlice.reducer;
