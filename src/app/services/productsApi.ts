// services/productsApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({ // Update type if you define it
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
