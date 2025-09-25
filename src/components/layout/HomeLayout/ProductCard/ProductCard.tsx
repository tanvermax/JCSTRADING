import React from 'react';
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md w-64">
            <img src={image} alt={name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-700 mt-1">${price.toFixed(2)}</p>
                <Button className="w-full mt-4">Add to Cart</Button>
            </div>
        </div>
    );
};

export default ProductCard;