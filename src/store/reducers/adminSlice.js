import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../components/constants/config";

// login admin
const loginAdmin = createAsyncThunk("/admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${server}/admin/verify`,
      { secretKey },
      config
    );
    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

// get admin status
const getAdmin = createAsyncThunk("/admin/getAdmin", async () => {
  try {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(`${server}/admin/`, config);
    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

// logout admin
const logoutAdmin = createAsyncThunk("/admin/logoutAdmin", async () => {
  try {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(`${server}/admin/logout`, config);
    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

export { loginAdmin, getAdmin, logoutAdmin };
