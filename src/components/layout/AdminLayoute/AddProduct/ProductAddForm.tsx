/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SingleImageUploader from "./SingleImageUploader";
import { Checkbox } from "@/components/ui/checkbox";
import TagInput from "@/components/ui/TagInput";
import { toast } from "sonner";

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
  newproduct?: boolean;
  tags?: string[];
}

export default function ProductAddForm() {
  const [addProduct] = useCreateProductMutation();
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IProduct>({
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      stock: undefined,
      category: "",
      brand: "",
      sku: "",
      newproduct: false,
      tags: [],
    },
  });

  const onSubmit = async (data: IProduct) => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert to FormData
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", image as File);

      if (file) {
        formData.append("file", file);
      }

      // Show loading toast and wait for promise
      await toast.promise(
        addProduct(formData).unwrap(),
        {
          loading: 'Please wait, product is adding...',
          success: (res) => {
            console.log("✅ Product Added:", res);
            form.reset();
            setFile(null);
            setImage(null);
            return 'Product added successfully! 🎉';
          },
          error: (error: any) => {
            console.error("❌ Error adding product:", error);
            return `Failed to add product: ${error?.data?.message || "Unknown error"}`;
          },
        }
      );

    } catch (error: any) {
      // This will be handled by the toast.promise error above
      console.error("❌ Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternative approach with manual toast control (if you prefer more control)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitAlternative = async (data: IProduct) => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const toastId = toast.loading("Please wait, product is adding...");

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", image as File);

      if (file) {
        formData.append("file", file);
      }

      const res = await addProduct(formData).unwrap();
      
      console.log("✅ Product Added:", res);
      
      // Update the loading toast to success
      toast.success("Product added successfully! 🎉", {
        id: toastId,
        duration: 4000,
      });

      form.reset();
      setFile(null);
      setImage(null);

    } catch (error: any) {
      console.error("❌ Error adding product:", error);
      
      // Update the loading toast to error
      toast.error(`Failed to add product: ${error?.data?.message || "Unknown error"}`, {
        id: toastId,
        duration: 5000,
      });
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
                  <Input 
                    type="number" 
                    placeholder="Price" 
                    {...field} 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  />
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
                  <Input 
                    type="number" 
                    placeholder="Stock" 
                    {...field} 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  />
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

          <FormField
            control={form.control}
            name="newproduct"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>New Product</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    value={field.value || []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File input (special handling) */}
          <SingleImageUploader onChange={setImage} />
        </form>
      </Form>

      <Button 
        disabled={!image || isSubmitting} 
        type="submit" 
        form="add-product-form" 
        className="mt-4 w-full"
      >
        {isSubmitting ? "Adding Product..." : "Save Product"}
      </Button>
    </div>
  );
}