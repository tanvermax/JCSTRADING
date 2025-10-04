import { baseApi } from "@/redux/baseApi";

export const productapi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (addProduct) => {
        return {
          url: '/product/create-product',
          method: 'POST',
          data: addProduct
        };
      },
      invalidatesTags: ['PRODUCT'],
    }),
    allproduct: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      transformResponse: (arg) => arg.data,
    }),
  }),
});


export const { useAllproductQuery, useCreateProductMutation } = productapi
