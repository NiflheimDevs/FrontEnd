import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mobileVerifyReducer from "./slices/mobileVerifySlice";
import profileReducer from "./slices/profileSlice"; // Import the new slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileVerify: mobileVerifyReducer,
    profile: profileReducer, // Add profile reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;