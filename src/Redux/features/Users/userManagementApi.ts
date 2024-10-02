import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    isUserExist: builder.query({
      query: (args) => {
        return {
          url: `/auth/isExistUser/${args}`,
          method: "GET",
        };
      },
    }),
    userInfo: builder.query({
      query: (args) => {
        return {
          url: `/auth/userData/${args}`,
          method: "GET",
        };
      },
    }),
    registerUser: builder.mutation({
      query: (args) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: args,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (args) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: args,
        };
      },
    }),
    getAllUser: builder.query({
      query: (role) => {
        return {
          url: `/auth/userRole/${role}`,
          method : "GET",
        }
      }
    })
  }),
});

export const { useIsUserExistQuery, useGetAllUserQuery, useRegisterUserMutation, useLoginUserMutation, useUserInfoQuery } = userManagementApi;
