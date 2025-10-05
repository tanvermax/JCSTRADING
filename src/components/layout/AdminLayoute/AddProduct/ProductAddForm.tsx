/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SingleImageUploader from "./SingleImageUploader";

interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price?: number;
  category?: string;
  stock?: number;
  brand?: string;
  sku?: string;
  images?: string;
}

export default function ProductAddForm() {
  const [addProduct] = useCreateProductMutation();
  const [image, setImage] = useState<File | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<IProduct>(
    {
      defaultValues: {
        title: "",
        description: "",
        price: undefined,
        stock: undefined,
        category: "",
        brand: "",
        sku: "",
      },
    }
  );
  console.log("Selected file:", image);

  const onSubmit = async (data: IProduct) => {
    try {
      // convert to FormData
      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      formData.append("file", image as File);


      // append file (important)
      if (file) {
        formData.append("file", file);
      }
      console.log(data);
      console.log(formData);
      console.log(formData.get("file"));

      // send via RTK Query
      const res = await addProduct(formData).unwrap();

      console.log("✅ Product Added:", res);
      alert("Product added successfully!");
      form.reset();
      setFile(null);
    } catch (error: any) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product: " + (error?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      <Form {...form}>
        <form id="add-product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} value={field.value || ""} />
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
                  <Input placeholder="Product description" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Stock" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Category" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Brand" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="SKU" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File input (special handling) */}
          <SingleImageUploader onChange={setImage} />
        </form>
      </Form>

      <Button disabled={!image} type="submit" form="add-product-form" className="mt-4 w-full">
        Save Product
      </Button>
    </div>
  );
}
