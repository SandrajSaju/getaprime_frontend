import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "@/app/axios-setup/axiosInstance";

const initialState: any = {
  loading: true,
  featureDetailsLoading: true,
  error: null,
  features: [],
  tiers: [],
  userTierId: null,
  featureDetails: null,
  availableFeatures: [],
  userTierName:''
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

export const fetchTiersWithFeatures = createAsyncThunk(
  "profile/fetchTiersWithFeatures",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AXIOS.get("/profile/tier-wise-features");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchFeatureDetailsbyId = createAsyncThunk(
  "profile/fetchFeatureDetailsbyId",
  async (featureId: string, { rejectWithValue }) => {
    try {
      const res = await AXIOS.get(`/profile/get-feature/${featureId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchFeaturesByAvailability = createAsyncThunk(
  "profile/fetchDashboardDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AXIOS.get("/profile/get-available-features");
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
      })
      .addCase(fetchTiersWithFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTiersWithFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.tiers = action.payload.tiers;
        state.userTierId = action.payload.userTierId;
      })
      .addCase(fetchTiersWithFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFeatureDetailsbyId.pending, (state) => {
        state.featureDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchFeatureDetailsbyId.fulfilled, (state, action) => {
        state.featureDetailsLoading = false;
        state.featureDetails = action.payload;
      })
      .addCase(fetchFeatureDetailsbyId.rejected, (state, action) => {
        state.featureDetailsLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchFeaturesByAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturesByAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availableFeatures = action.payload.features;
        state.userTierName = action.payload.userTier;
      })
      .addCase(fetchFeaturesByAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default profileSlice.reducer;