import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for a product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Create the API slice with the specific types
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({ 
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
