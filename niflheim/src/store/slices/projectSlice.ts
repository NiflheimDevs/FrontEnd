import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createProject as createProjectAPI } from '../../API';

// Define the project state interface
interface ProjectState {
  name: string;
  description: string;
  tags: number[];
  label: string[];
  files: File | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Initial state
const initialState: ProjectState = {
  name: '',
  description: '',
  tags: [],
  label: ['رایگان'], // Default to 'رایگان'
  files: null,
  loading: false,
  error: null,
  success: false
};

// Async thunk for creating a project
export const createProject = createAsyncThunk(
  'project/createProject',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await createProjectAPI(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در ایجاد پروژه');
    }
  }
);

// Project slice
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<Partial<ProjectState>>) => {
      return { ...state, ...action.payload };
    },
    resetProject: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  }
});

export const { setProjectData, resetProject } = projectSlice.actions;
export default projectSlice.reducer;