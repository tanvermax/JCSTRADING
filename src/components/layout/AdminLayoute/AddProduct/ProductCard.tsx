import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function ProductCard() {
  return (
    <Card className="w-full max-w-md py-4 rounded-xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary font-bold">Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" type="text" placeholder="Enter product name" required />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Write product description..." required />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" placeholder="Enter price" required />
          </div>

          {/* Stock */}
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" type="number" placeholder="Available stock" required />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image */}
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" type="url" placeholder="https://example.com/product.jpg" required />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Add Product
        </Button>
      </CardFooter>
    </Card>
  )
}
