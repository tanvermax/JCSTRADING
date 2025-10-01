/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"

// React Hook Form & Zod Imports
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

// Custom Hook/API Imports
import { useFileUpload } from "@/hooks/use-file-upload" 
import { useAddproductMutation } from '@/redux/features/product/product.api';


// Define the Zod Schema (Slightly adjusted for better RHF integration)
const productsubmitSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long."),
    description: z.string().min(10, "Description must be at least 10 characters long."),
    
    // RHF requires numbers be transformed from strings or directly registered as number inputs
    price: z.coerce.number().min(0.01, "Price must be a positive number."),
    stock: z.coerce.number().int().min(0, "Stock quantity cannot be negative."),
    
    category: z.string().min(1, "Please select a category."),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated (e.g., product-name-123)."),
    
    // Image URL (This field will hold the final URL after the file is uploaded)
    images: z.string().url("A valid image URL is required."), 
    
    brand: z.string().optional().or(z.literal('')),
    sku: z.string().optional().or(z.literal('')),
    
    // Tags field: The form sends a string, which Zod transforms into a string array.
    tags: z.string().optional().transform(str => 
        str ? str.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : []
    ),
    
    newproduct: z.boolean(),
    isActive: z.boolean(),
});

type ProductFormData = z.infer<typeof productsubmitSchema>;

export function ProductAddForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024

  const [addproduct, { isLoading }] = useAddproductMutation();

  // --- React Hook Form Setup ---
  const form = useForm<ProductFormData>({
    // resolver: zodResolver(productsubmitSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      slug: "",
      images: "", // Placeholder for the final URL
      brand: "",
      sku: "",
      tags: [], // Default is an empty string for the input field
      newproduct: false,
      isActive: true,
    }
  });

  // Accessing RHF state for errors/loading
  const { formState: { errors, isSubmitting } } = form;

  // --- File Upload State (using your custom hook) ---
  const [
    { files, isDragging, errors: fileErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;


  // --- Combined Submission Handler ---
  const onSubmit = async (data: ProductFormData) => {
    // 1. Image Upload Logic (MOCK)
    // NOTE: In a real scenario, you'd upload files[0].file here, get the URL,
    // and then update the `data.images` field before calling addproduct.

    if (!files[0]?.file) {
        // You might set a validation error here or alert the user
        alert("Please upload a product image.");
        return;
    }

    // MOCK: Assuming the image upload returns a URL
    const imageUrl = "https://mock-image-cdn.com/product-uuid-123.jpg"; 
    
    // 2. Prepare Final Data for API
    const finalProductData = {
        ...data,
        images: imageUrl, // Replace placeholder with the actual URL
    };

    console.log("Submitting Product Data:", finalProductData);

    // 3. Perform API Call
    try {
      const res = await addproduct(finalProductData).unwrap();
      console.log("Product Added:", res);
      alert(`Product "${finalProductData.title}" added successfully!`);
      form.reset(); // Reset form fields after successful submission
      removeFile(files[0]?.id); // Clear the uploaded image
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to add product. Check console for details.');
    }
  };

  return (
    <Card className="w-full max-w-xl py-6 rounded-2xl shadow-2xl border-2 border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-extrabold text-primary tracking-tight">
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Use form.handleSubmit(onSubmit) */}
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>

          {/* === CORE DETAILS === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-2 mb-2">
            Core Details
          </p>
          <div className="grid gap-4">
            {/* 1. title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter product title"
                required
                {...form.register('title')}
              />
              {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* 2. description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write a detailed product description..."
                rows={4}
                required
                {...form.register('description')}
              />
              {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
            </div>
          </div>
          
          {/* === PRICING AND STOCK === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-4 mb-2">
            Pricing & Inventory
          </p>
          <div className="grid grid-cols-2 gap-6">
            {/* 3. price */}
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                {...form.register('price', { valueAsNumber: true })}
              />
              {errors.price && <p className="text-destructive text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* 4. stock */}
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Available stock"
                required
                min="0"
                {...form.register('stock', { valueAsNumber: true })}
              />
              {errors.stock && <p className="text-destructive text-sm mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          {/* === CATEGORY AND SLUG === */}
          <div className="grid grid-cols-2 gap-6">
            {/* 5. category (Controlled component using <Controller>) */}
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* 6. slug */}
            <div className="grid gap-2">
              <Label htmlFor="slug">Product Slug</Label>
              <Input
                id="slug"
                type="text"
                placeholder="e.g., product-name-123"
                required
                {...form.register('slug')}
              />
              {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          {/* === IMAGE UPLOAD (Placeholder for URL) === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-4 mb-2">
            Product Image
          </p>
          <div className="flex flex-col gap-2">
            <div className="relative">
              {/* Drop area (File handling is outside RHF) */}
              <div
                role="button"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="border-input hover:shadow-inner data-[dragging=true]:bg-gray-50 relative flex min-h-60 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-6 transition-all has-[img]:border-none has-[input:focus]:ring-primary/30 has-[input:focus]:border-primary has-[input:focus]:ring-[3px]"
              >
                <input
                  {...getInputProps()}
                  className="sr-only"
                  aria-label="Upload file"
                />
                {previewUrl ? (
                  <div className="absolute inset-0">
                    <img
                      src={previewUrl}
                      alt={files[0]?.file?.name || "Uploaded product image"}
                      className="size-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                    <div
                      className="bg-primary/10 mb-3 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/20"
                      aria-hidden="true"
                    >
                      <ImageUpIcon className="size-5 text-primary" />
                    </div>
                    <p className="mb-1.5 text-base font-semibold text-gray-700">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-muted-foreground text-sm">
                      PNG, JPG, GIF up to {maxSizeMB}MB
                    </p>
                  </div>
                )}
              </div>
              {previewUrl && (
                <div className="absolute top-3 right-3">
                  <button
                    type="button"
                    className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white text-gray-800 shadow-lg ring-1 ring-black/10 transition-colors outline-none hover:bg-gray-100 focus-visible:ring-primary focus-visible:ring-offset-2"
                    onClick={() => removeFile(files[0]?.id)}
                    aria-label="Remove image"
                  >
                    <XIcon className="size-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {(fileErrors.length > 0 || errors.images) && (
              <div
                className="text-destructive flex items-center gap-1 text-sm font-medium"
                role="alert"
              >
                <AlertCircleIcon className="size-4 shrink-0" />
                <span>
                    {fileErrors.length > 0 ? fileErrors[0] : errors.images?.message}
                </span>
              </div>
            )}
          </div>

          {/* === OPTIONAL FIELDS === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-4 mb-2">
            Optional Details
          </p>
          <div className="grid grid-cols-2 gap-6">
            {/* 8. brand (optional) */}
            <div className="grid gap-2">
              <Label htmlFor="brand">Brand (Optional)</Label>
              <Input
                id="brand"
                type="text"
                placeholder="e.g., Apple, Nike"
                {...form.register('brand')}
              />
            </div>
            {/* 9. sku (optional) */}
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU (Optional)</Label>
              <Input
                id="sku"
                type="text"
                placeholder="Unique inventory code"
                {...form.register('sku')}
              />
            </div>
          </div>

          {/* 10. tags (optional) */}
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              placeholder="winter, electronics, sale (comma separated)"
              {...form.register('tags')}
            />
          </div>

          {/* === AVAILABILITY FLAGS (Controlled component using <Controller>) === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-4 mb-2">
            Visibility
          </p>
          <div className="flex items-center space-x-12 pt-1">
            {/* 11. newproduct */}
            <div className="flex items-center space-x-2">
              <Controller
                name="newproduct"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id="newproduct"
                    className="size-5"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="newproduct" className="text-base font-medium">
                Mark as New Product
              </Label>
            </div>
            {/* 12. isActive */}
            <div className="flex items-center space-x-2">
              <Controller
                name="isActive"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id="isActive"
                    className="size-5"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isActive" className="text-base font-medium">
                Product is Active
              </Label>
            </div>
          </div>
          
          <CardFooter className="pt-8 -mx-6 mb-[-1.5rem] mt-4">
            <Button 
              type="submit" 
              className="w-full text-base py-6 font-semibold shadow-lg hover:shadow-xl transition-shadow"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Adding Product...' : 'Create Product Listing'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}