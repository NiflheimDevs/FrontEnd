import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mobileVerifyReducer from "./slices/SignUpSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileVerify: mobileVerifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
