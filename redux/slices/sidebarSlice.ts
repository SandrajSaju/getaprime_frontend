import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  status: "idle",
  error: null,
  isExpanded: true,  // Initial state for sidebar expansion
};

const sidebarSlice = createSlice({
  name: "sidebarMenus",
  initialState,
  reducers: {
    // Reducer to toggle the sidebar's expansion state
    expandSideBar: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "boolean") {
        state.isExpanded = action.payload;  // Set the state directly if true or false is passed
      } else {
        state.isExpanded = !state.isExpanded;  // Toggle the state if no payload
      }
    },
  },
});

export const { expandSideBar } = sidebarSlice.actions;

// Selector to get the current sidebar expansion state
export const selectIsSidebarExpanded = (state: any) => state.sidebar.isExpanded;
export default sidebarSlice.reducer;