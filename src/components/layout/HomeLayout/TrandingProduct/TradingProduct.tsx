import React from 'react';
import { Button } from "@/components/ui/button";
import ProductCard from '../ProductCard/ProductCard';

// Sample data for car trading products
const products = [
    {
        "id": 1,
        "name": "Universal All Car Mud Guard",
        "price": 24.99,
        "image": "https://modymart.com/wp-content/uploads/2024/09/mudgard.webp"
    },
    {
        "id": 2,
        "name": "Car Air Purifier & Humidifier",
        "price": 35.50,
        "image": "https://modymart.com/wp-content/uploads/2024/09/main-image-1-5.jpeg.webp"
    },
    {
        "id": 3,
        "name": "Telescopic Car Duster",
        "price": 12.99,
        "image": "https://modymart.com/wp-content/uploads/2024/07/Car-dust-duster-microfiber-car-wash-round-duster-velvet-car-duster-long-handle-telescopic-soft-bristle-cleaning-tool.jpg.webp"
    },
    {
        "id": 4,
        "name": "Car Seat Gap Organizer",
        "price": 19.99,
        "image": "https://modymart.com/wp-content/uploads/2024/08/Car-Seat-Organizer-Multifunctional-Gap-PU-Leather-Storage-Box-Seat-Seam-Phone-Purse-Coins-Key-Box-Vehicle-Accessories-2.jpeg.webp"
    },
    {
        "id": 5,
        "name": "Microfiber Car Washing Towel",
        "price": 9.50,
        "image": "https://modymart.com/wp-content/uploads/2024/08/Quick-Car-Washing-1-1000x1000.jpg.webp"
    },
    {
        "id": 6,
        "name": "PU Leather Armrest Support",
        "price": 29.99,
        "image": "https://modymart.com/wp-content/uploads/2024/08/Arm-Rest-Support-PU-Leather-Center-Console-Arm-Rest-Protection-Cushion-Auto-Armrests-Storage-Box-Cover-Pad-2.jpeg.webp"
    },
    {
        "id": 7,
        "name": "4-in-1 Retractable Car Charger",
        "price": 45.00,
        "image": "https://modymart.com/wp-content/uploads/2025/08/4-in-1-120W-Car-Fast-Charger-USB-Type-C-Power-Adapter-Retractable-Phone-Charger-For-IOS-Android-Phones-3.jpeg.webp"
    },
    {
        "id": 8,
        "name": "Car Headrest Storage Hooks",
        "price": 15.75,
        "image": "https://modymart.com/wp-content/uploads/2024/12/eaf66a1ee3845bb3b218525720f74c65.webp"
    },
    {
        "id": 9,
        "name": "Toyota Seat Belt Shoulder Pad",
        "price": 22.50,
        "image": "https://modymart.com/wp-content/uploads/2025/01/Toyota-Car-Seat-Belt-Cover-Shoulder-Pad-Protection-Carbon-Fiber-2pcs-1.jpeg.webp"
    }
]

export default function TradingProduct() {
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
                TRADING PRODUCT
            </h1>
            <div>
                <Button className="
                    md:text-md text-xs
                     
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
            {products.map(product => (
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