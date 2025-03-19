import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// مدل ویژگی‌ها
interface Feature {
  id: string;
  name: string;
  price: number;
}

interface ProjectState {
  name: string;
  skills: string;
  description: string;
  files: File | null;
  selectedFeatures: Feature[]; // تغییر به آرایه‌ای از ویژگی‌ها
}

const initialState: ProjectState = {
  name: "",
  skills: "",
  description: "",
  files: null,
  selectedFeatures: [],
};

// درخواست برای ارسال پروژه به بک‌اند
export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData: FormData) => {
    const response = await axios.post("/api/projects", projectData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<Partial<ProjectState>>) => {
      return { ...state, ...action.payload };
    },
    toggleFeature: (state, action: PayloadAction<Feature>) => {
      const feature = action.payload;
      const exists = state.selectedFeatures.find(f => f.id === feature.id);
      if (exists) {
        state.selectedFeatures = state.selectedFeatures.filter(f => f.id !== feature.id);
      } else {
        state.selectedFeatures.push(feature);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProject.fulfilled, (state) => {
      return initialState; // پاک کردن داده‌ها بعد از ارسال موفق
    });
  },
});

export const { setProjectData, toggleFeature } = projectSlice.actions;
export default projectSlice.reducer;
