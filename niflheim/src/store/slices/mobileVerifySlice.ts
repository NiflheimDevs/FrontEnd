import { createSlice } from "@reduxjs/toolkit";

interface mobileSession {
  mobileSession: boolean;
  phoneNumber: string | null;
}

const initialState: mobileSession = {
  mobileSession: false,
  phoneNumber: null,
};

const MobileVerifySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMobileSession: (state, action) => {
      state.mobileSession = true;
      state.phoneNumber = action.payload; 
    },
    resetMobileSession: (state) => {
      state.mobileSession = false;
      state.phoneNumber = null;
    },
  },
});

export const { setMobileSession, resetMobileSession } = MobileVerifySlice.actions;
export default MobileVerifySlice.reducer;

