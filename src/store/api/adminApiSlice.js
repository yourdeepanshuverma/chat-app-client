import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/constants/config";

const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
  tagTypes: ["dashboard-stats", "dashboard-users"],
  endpoints: (builder) => ({
    dashboardStatus: builder.query({
      query: () => ({
        url: "/admin/admin-dashboard",
        credentials: "include",
      }),
      providesTags: ["dashboard-stats"],
    }),
    userManagement: builder.query({
      query: () => ({
        url: "/admin/users",
        credentials: "include",
      }),
      providesTags: ["dashboard-users"],
    }),
    messagesManagement: builder.query({
      query: () => ({
        url: "/admin/messages",
        credentials: "include",
      }),
      providesTags: ["dashboard-messages"],
    }),
    chatManagement: builder.query({
      query: () => ({
        url: "/admin/chats",
        credentials: "include",
      }),
      providesTags: ["dashboard-chats"],
    }),
  }),
});

export const {
  useDashboardStatusQuery,
  useUserManagementQuery,
  useMessagesManagementQuery,
  useChatManagementQuery,
} = adminApiSlice;
export default adminApiSlice;
