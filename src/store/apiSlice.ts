import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (sort = "asc") => `/products?sort=${sort}&limit=10`,
    }),
  }),
});

export const { useFetchProductsQuery } = apiSlice;
