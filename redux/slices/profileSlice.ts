import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "@/app/axios-setup/axiosInstance";

const initialState: any = {
  loading: true,
  error: null,
  features: [],
};

export const fetchFeatures = createAsyncThunk(
  "profile/fetchFeatures",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AXIOS.get("/profile/list-all-features");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;