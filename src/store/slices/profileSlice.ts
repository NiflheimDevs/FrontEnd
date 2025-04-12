import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Skill {
  id?: number;
  name: string;
}

interface WorkExperience {
  id?: number;
  companyName: string;
  jobTitle: string;
  website?: string;
  startDate?: string;
  endDate?: string;
  isOngoing?: boolean;
  skills: Skill[];
  skillProficiency: { [key: string]: string };
}

export interface ProfileState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  bio: string;
  skills: Skill[];
  skillProficiency: { [key: string]: string };
  workExperiences: WorkExperience[];
  resume?: File | null;
  profile?: string;
  SessionID?: string;
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
  resume: null,
  profile: "",
  SessionID: "",
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

export const { updateProfileField, setProfile, resetProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
