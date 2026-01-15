import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import settingReducer from './settingsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    settings: settingReducer,
  },
});
