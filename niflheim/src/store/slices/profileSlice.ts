import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  bio: string;
  resume: File | null;
  skills: string[];
  profilePicture: File | null;
}

const initialState: ProfileState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  email: "",
  bio: "",
  resume: null,
  skills: [],
  profilePicture: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileField: (
      state,
      action: PayloadAction<{ field: keyof ProfileState; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    setProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    resetProfile: () => initialState,
  },
});

export const { updateProfileField, setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;