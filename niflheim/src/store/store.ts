import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice"; // Import the new slice
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer, // Add profile reducer
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;