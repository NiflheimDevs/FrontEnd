import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  skillProficiency: { [key: string]: string };
  workExperiences: { companyName: string; website: string; duration: string }[]; 
}

const initialState: ProfileState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  email: "",
  bio: "",
  skills: [],
  skillProficiency: {},
  workExperiences: [],
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