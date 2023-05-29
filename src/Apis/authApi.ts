import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fullstackstoreapi.azurewebsites.net/api/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `auth/register`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: `auth/login`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: userCredentials,
      }),
    }),
  }),
});

export const {useRegisterUserMutation,useLoginUserMutation} = authApi;
// export const authApiReducer = authApi.reducer; just a test do not use
export default authApi;
