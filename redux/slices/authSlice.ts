import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "@/app/axios-setup/axiosInstance";
import Cookies from "js-cookie";

const initialState: any = {
  isAuthenticated: false,
  loading: false,
  error: null,
  emailVerified: false,
  passwordResetSuccess: false,
};

// Create an async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AXIOS.post("/auth/login", {
        email,
        password,
      });
      const accessToken = response.data.tokens.accessToken;
      const refreshToken = response.data.tokens.refreshToken;
      localStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
      Cookies.set("accessToken", response.data.tokens.accessToken, {
        expires: 1,
      }); // 1 day expiry
      Cookies.set("refreshToken", response.data.tokens.refreshToken, {
        expires: 7,
      }); // 7 days expiry

      // Split the token into parts
      const base64Url = accessToken.split('.')[1];
      // Decode the base64Url encoded payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
      );

      const accessTokenPayload = JSON.parse(jsonPayload);
      localStorage.setItem("isTrialExpired", accessTokenPayload.isTrialExpired);

      return response.data;
    } catch (error: any) {
      console.log(error.response.data);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    {
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await AXIOS.post("/auth/register", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await AXIOS.post("/auth/verifyOtp-forResetPassword", { email, otp });
      return response.data; // Assuming you get some data back on success
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to verify OTP");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      state.isAuthenticated = false;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success, you may want to set a flag for successful OTP verification
        state.passwordResetSuccess = true; // Assuming you want to set this
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Error from the server
        state.passwordResetSuccess = false; // Reset success flag on failure
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;