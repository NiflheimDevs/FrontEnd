import { createSlice } from "@reduxjs/toolkit";

interface SignUpSession {
  mobileSession: boolean;
  SessionID: string | null;
  Phone: string | null;
  Password: string | null;
  Username: string | null;
}

const initialState: SignUpSession = {
  mobileSession: false,
  SessionID: null,
  Phone: null,
  Password: null,
  Username: null,
};

const MobileVerifySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpSession: (state, action) => {
      state.mobileSession = true;
      state.SessionID = action.payload.SessionID;
      state.Phone = action.payload.Phone;
      state.Password = action.payload.Password;
      state.Username = action.payload.Username;
    },
    resetSignUpSession: (state) => {
      state.mobileSession = false;
      state.SessionID = null;
      state.Phone = null;
      state.Password = null;
      state.Username = null;
    },
  },
});

export const { setSignUpSession, resetSignUpSession } = MobileVerifySlice.actions;
export default MobileVerifySlice.reducer;
