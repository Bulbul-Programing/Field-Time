
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://assignment-three-sable.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery,
    endpoints : () => ({}),
    tagTypes : ['booking','facility', 'user']
})