import { baseApi } from "@/redux/baseApi";

export const productapi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addproduct: builder.mutation({
            query: (productinfo) => ({
                url: "product/add-product",
                method: "POST",
                data: productinfo
            })
        }),
    })
})


export const {useAddproductMutation}= productapi
       