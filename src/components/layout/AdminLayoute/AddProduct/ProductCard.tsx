import React, { useState } from 'react';
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
import { useFileUpload } from "@/hooks/use-file-upload" // Assuming this hook provides file data

// Define the structure for your form data
// We omit _id, createdAt, and updatedAt as they are set by the server
interface IFormData {
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    slug: string;
    newproduct: boolean;
    // We'll use the file data directly from the hook for the image upload
    brand?: string;
    sku?: string;
    tags: string; // Stored as a comma-separated string initially
    isActive: boolean;
}

export function ProductCard() {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024

  // --- File Upload State (using your custom hook) ---
  const [
    { files, isDragging, errors },
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
  })

  // --- Form State Management ---
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    slug: '',
    newproduct: false,
    brand: '',
    sku: '',
    tags: '',
    isActive: true, // Default to true
  });

  const previewUrl = files[0]?.preview || null

  // Handler for all text/number/select inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, name?: keyof IFormData) => {
    // Handle Input and Textarea changes
    if (typeof e !== 'string' && 'target' in e) {
        const { id, value, type } = e.target;
        const fieldName = id as keyof IFormData;

        setFormData(prev => ({
            ...prev,
            [fieldName]: (type === 'number' ? parseFloat(value) : value),
        }));
    } 
    // Handle Select changes (string is the value)
    else if (name) {
        setFormData(prev => ({
            ...prev,
            [name]: e,
        }));
    }
  };

  // Handler for Checkbox inputs
  const handleCheckboxChange = (checked: boolean, fieldName: keyof IFormData) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: checked,
    }));
  };

  // --- Submission Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Prepare Data for API
    const productData = {
      ...formData,
      // Convert tags string to an array (cleaning up whitespace)
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      // Handle Image Data (assuming files[0] contains the File object)
      // NOTE: In a real app, you'd send this File object to a separate
      // file upload endpoint (like AWS S3 or your own server) and get a URL back.
      // For this example, we'll just check if a file exists.
      imageFile: files[0]?.file,
    };

    // Basic validation
    if (!productData.category) {
        alert("Please select a category.");
        return;
    }
    if (!productData.imageFile && !previewUrl) {
        alert("Please upload a product image.");
        return;
    }

    console.log("Submitting Product Data:", productData);

    // 2. Perform API Call (e.g., using fetch or axios)
    // Example:
    // try {
    //   const response = await fetch('/api/products', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(productData),
    //   });
    //   if (response.ok) {
    //     alert('Product added successfully!');
    //     // Reset form or redirect
    //   } else {
    //     alert('Failed to add product.');
    //   }
    // } catch (error) {
    //   console.error('Submission error:', error);
    // }
  };

  return (
    <Card className="w-full max-w-xl py-6 rounded-2xl shadow-2xl border-2 border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-extrabold text-primary tracking-tight">
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

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
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* 2. description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write a detailed product description..."
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
              />
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
                value={formData.price}
                onChange={handleChange}
              />
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
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* === CATEGORY AND SLUG === */}
          <div className="grid grid-cols-2 gap-6">
            {/* 5. category */}
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => handleChange(value, 'category')}
              >
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
            </div>

            {/* 6. slug */}
            <div className="grid gap-2">
              <Label htmlFor="slug">Product Slug</Label>
              <Input
                id="slug"
                type="text"
                placeholder="e.g., product-name-123"
                required
                value={formData.slug}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* === IMAGE UPLOAD (The most visually impactful section) === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-4 mb-2">
            Product Image
          </p>
          <div className="flex flex-col gap-2">
            <div className="relative">
              {/* Drop area */}
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

            {errors.length > 0 && (
              <div
                className="text-destructive flex items-center gap-1 text-sm font-medium"
                role="alert"
              >
                <AlertCircleIcon className="size-4 shrink-0" />
                <span>{errors[0]}</span>
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
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            {/* 9. sku (optional) */}
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU (Optional)</Label>
              <Input
                id="sku"
                type="text"
                placeholder="Unique inventory code"
                value={formData.sku}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 10. tags (optional) */}
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              placeholder="winter, electronics, sale (comma separated)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          {/* === AVAILABILITY FLAGS === */}
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-4 mb-2">
            Visibility
          </p>
          <div className="flex items-center space-x-12 pt-1">
            {/* 11. newproduct */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newproduct"
                className="size-5"
                checked={formData.newproduct}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'newproduct')}
              />
              <Label htmlFor="newproduct" className="text-base font-medium">
                Mark as New Product
              </Label>
            </div>
            {/* 12. isActive */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                className="size-5"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'isActive')}
              />
              <Label htmlFor="isActive" className="text-base font-medium">
                Product is Active
              </Label>
            </div>
          </div>
          
          {/* The form submit button must be inside the <form> element */}
          <CardFooter className="pt-8 -mx-6 mb-[-1.5rem] mt-4">
            <Button type="submit" className="w-full text-base py-6 font-semibold shadow-lg hover:shadow-xl transition-shadow">
              Create Product Listing
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      {/* Move CardFooter content inside the form to ensure submit works */}
      {/* The original CardFooter is now empty */}
      <CardFooter></CardFooter>
    </Card>
  )
}