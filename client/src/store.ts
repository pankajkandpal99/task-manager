import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import userReducer from "./features/user.slice";
import projectReducer from "./features/project.slice";
import taskReducer from "./features/task.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
