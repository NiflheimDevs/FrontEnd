import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createProject as createProjectAPI, deleteProject as deleteProjectAPI, updateProject as updateProjectAPI } from '../../API';
import axios from 'axios';

// Define the project state interface
interface ProjectState {
  name: string;
  description: string;
  tags: number[];
  label: number[];
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
  label: [1], // Default to '1' (Free)
  files: null,
  loading: false,
  error: null,
  success: false
};

// Async thunk for creating a project
export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData: {
    title: string;
    description: string;
    tags: number[];
    label: number;
  }, { rejectWithValue }) => {
    try {
      const response = await createProjectAPI(projectData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در ایجاد پروژه');
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ 
    projectId, 
    projectData 
  }: {
    projectId: string | number;
    projectData: {
      title: string;
      description: string;
      tags: number[];
      label: number;
    }
  }, { rejectWithValue }) => {
    try {
      const response = await updateProjectAPI(projectId, projectData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'خطا در بروزرسانی پروژه'
      );
    }
  }
);

// Async thunk for deleting a project
export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId: string | number, { rejectWithValue }) => {
    try {
      await deleteProjectAPI(projectId);
      return projectId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در حذف پروژه');
    }
  }
);

// Create the project slice
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // Set a single field in the project data
    setProjectData: (state, action: PayloadAction<{ [key: string]: any }>) => {
      return { ...state, ...action.payload };
    },
    
    // Reset the project state to initial values
    resetProject: () => initialState,
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set error message
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },
    
    // Set success status
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle create project
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // Don't reset the form here, let the component decide when to reset
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
    
    // Handle update project
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
    // Handle delete project
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
        // No need to modify state as the project is deleted
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Export actions
export const { 
  setProjectData, 
  resetProject, 
  setLoading, 
  setError, 
  clearError, 
  setSuccess 
} = projectSlice.actions;

// Export reducer
export default projectSlice.reducer;