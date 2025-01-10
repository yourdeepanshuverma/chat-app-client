import { createSlice } from "@reduxjs/toolkit";
import { getAdmin, loginAdmin, logoutAdmin } from "./adminSlice";
import { toast } from "react-toastify";

const initialState = {
  status: false,
  user: {},
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    userNotExists: (state, action) => {
      state.status = false;
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message);
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAdmin = true;
        } else {
          state.isAdmin = false;
        }
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isAdmin = false;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload);
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.isAdmin = true;
        toast.error(action.error.message);
      });
  },
});

export const { userExists, userNotExists, logout } = authSlice.actions;

export default authSlice;
