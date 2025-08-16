import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sidebarReducer from "./slices/sidebarSlice";
import profileReducer from "./slices/profileSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  profile: profileReducer,
});