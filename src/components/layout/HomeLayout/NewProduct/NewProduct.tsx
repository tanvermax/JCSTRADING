import { Button } from "@/components/ui/button";
import ProductCard from '../ProductCard/ProductCard';

// Data for new products with names, prices, and weights
const newProducts = [
    {
        "id": 1,
        "name": "Magnetic Phone Holder",
        "price": 18.50,
        "weight": 0.15,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2F591c38d9-cbb3-4b69-aeb0-41a35ca8b74f.jpg&w=384&q=100"
    },
    {
        "id": 2,
        "name": "Vehicle Trash Can",
        "price": 25.00,
        "weight": 0.4,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2Ffc9eaf4d-6879-4fa4-9721-2d54f793cf14.jpg&w=384&q=100"
    },
    {
        "id": 3,
        "name": "Car Mount for Tablet",
        "price": 32.99,
        "weight": 0.35,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2Ffefcc759-2394-4845-a985-b5f713cbda30.jpg&w=384&q=100"
    },
    {
        "id": 4,
        "name": "Sun Visor Organizer",
        "price": 14.50,
        "weight": 0.2,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2F718f8086-477d-4a45-8cc1-a8e5bdacf374.jpg&w=384&q=100"
    },
    {
        "id": 5,
        "name": "Car Trunk Organizer",
        "price": 55.00,
        "weight": 1.2,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2Fde914b57-560e-429e-8637-24202f99c5e4.jpg&w=384&q=100"
    },
    {
        "id": 6,
        "name": "Adjustable Headrest Hooks",
        "price": 16.99,
        "weight": 0.1,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2F73ecbd85-30c1-4921-98f8-e64c4d9fda50.jpg&w=384&q=100"
    },
    {
        "id": 7,
        "name": "Car Backseat Organizer",
        "price": 28.00,
        "weight": 0.5,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2F8fe626ea-6814-4b89-8b28-63e5248ef89b.jpg&w=384&q=100"
    },
    {
        "id": 8,
        "name": "Foldable Storage Box",
        "price": 38.00,
        "weight": 0.8,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2F9fcbbf22-3cba-434e-a5a4-d698cadc3d9c.jpg&w=384&q=100"
    },
    {
        "id": 9,
        "name": "Multifunctional Car Mount",
        "price": 21.00,
        "weight": 0.15,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2F4d3b4a74-fd44-4c9b-9080-55bba1676ca9.jpg&w=384&q=100"
    }
];

export default function NewProduct() {
  return (
    <div className="container mx-auto px-4">
        <div className="
            md:text-base text-[10px] px-2 flex justify-between items-center gap-4 my-10
            md:px-4 lg:px-6
        ">
            <h1 className="
                text-xs md:text-2xl font-bold 
                text-gray-900
            ">
                NEW PRODUCT
            </h1>
            <div>
                <Button className="
                    md:text-md text-[10px]
                   
                   
                ">
                    View All
                </Button>
            </div>
        </div>

        {/* Product Grid */}
        <div className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4
            gap-4 md:gap-6 lg:gap-8
            mb-10
        ">
            {newProducts.map(product => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                />
            ))}
        </div>
    </div>
  );
}