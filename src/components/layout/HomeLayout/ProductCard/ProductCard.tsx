// components/layout/HomeLayout/ProductCard/ProductCard.tsx

import { Button } from "@/components/ui/button";

interface ProductCardProps {
    name: string;
    price: number;
    oldPrice?: number; // Add optional oldPrice
    image: string;
}

export default function ProductCard({ name, price, oldPrice, image }: ProductCardProps) {
    return (
        <div className="card w-full bg-base-100 shadow-xl border overflow-hidden">
            <img
                src={image}
                alt={name}
                width={300}
                height={300}
                className="w-full h-auto object-cover"
            />
            <div className="card-body p-4">
                <h2 className="card-title text-sm">{name}</h2>
                <div className="flex items-center gap-2">
                    {oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            ${oldPrice.toFixed(2)}
                        </span>
                    )}
                    <span className="text-base font-semibold text-red-600">
                        ${price.toFixed(2)}
                    </span>
                </div>
                <div className="card-actions justify-end mt-2">
                    <Button className="btn btn-sm btn-primary">Add to Cart</Button>
                </div>
            </div>
        </div>
    );
}