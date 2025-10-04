/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";


import { useForm } from "react-hook-form";
// import axios from "axios";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import axios from "axios";

export default function ProductAddForm() {
  const [addproduct] = useCreateProductMutation();

  const form = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      console.log(data)
    

      // const res = await axios.post("http://localhost:5000/api/v1/product/create-product",data)
      const res = await addproduct(data).unwrap();
      // console.log("✅ Product Added:", res);
      if (res) {
        alert("Product added successfully!");

        // setFile(null);
      }
    } catch (error: any) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product: " + (error?.data?.message || "Unknown error"));
    }
    console.log(data)
  };

  return (
    <div>
       <Form {...form}>
            <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
           <Button type="submit" form="add-tour-type">
              Save changes
            </Button>
    </div>
  );
}

