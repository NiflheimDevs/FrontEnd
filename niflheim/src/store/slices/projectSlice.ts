import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAxios } from '@/config/auth';

// Define project interface
interface ProjectState {
  name: string;
  description: string;
  tags: number[];
  label: string[];
  files: File | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  name: '',
  description: '',
  tags: [],
  label: [],
  files: null,
  loading: false,
  error: null
};

// Create async thunk for project creation
export const createProject = createAsyncThunk(
  'project/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Use authAxios instead of axios to include auth headers
      const response = await authAxios.post('/project/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در ایجاد پروژه');
    }
  }
);

// Create the project slice
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
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setProjectData, resetProject } = projectSlice.actions;
export default projectSlice.reducer;