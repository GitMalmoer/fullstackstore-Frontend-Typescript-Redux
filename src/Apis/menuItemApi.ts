import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fullstackstoreapi20230323222822.azurewebsites.net/api/",
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
        query: () => ({
            url:"menuItem"
        }),
        providesTags:["MenuItems"],
    }),
    getMenuItemById: builder.query({
        query: (id) => ({
            url:`menuItem/${id}`
        }),
        providesTags:["MenuItems"],
    })
  }),
});

export const {useGetMenuItemsQuery,useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;