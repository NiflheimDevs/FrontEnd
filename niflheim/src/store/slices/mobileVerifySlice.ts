import { createSlice } from "@reduxjs/toolkit";

interface mobileSession {
  mobileSession: boolean;
}

const initialState: mobileSession = {
  mobileSession: false, 
};

const MobileVerifySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMobileSession: (state) => {
      state.mobileSession = true;
    },
    resetMobileSession: (state) => {
      state.mobileSession = false;
    },
  },
});

export const { setMobileSession , resetMobileSession } = MobileVerifySlice.actions;
export default MobileVerifySlice.reducer;
