import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../services/authService";
import { RegisterFormValues } from "../../schema/authSchema";

interface AuthState {
  loading: boolean;
  error: string | null;
  registered: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  registered: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterFormValues, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRegistration } = authSlice.actions;
export default authSlice.reducer;
