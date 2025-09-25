// pages/Flashsale.tsx or similar
import { Button } from "@/components/ui/button";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

const getSecondsUntilNextMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(now.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
};

// Updated data with an 'oldPrice' for some items
const carPartsData = [
    {
        "id": 1,
        "name": "Brake Rotor",
        "price": 45.99, // New lower price
        "oldPrice": 59.99, // Old price
        "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/149f4d97-4ff7-40d3-920d-c8d5d3e202e8.jpg"
    },
    {
        "id": 2,
        "name": "Spark Plug",
        "price": 8.50,
        "oldPrice": 10.00,
        "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/7f0cce19-330c-4bb0-ba3c-614720852fdf.jpg"
    },
    {
        "id": 3,
        "name": "Air Filter",
        "price": 22.00,
        "oldPrice": 25.00,
        "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/565ef3fa-c816-4f60-be13-9b65009be162.jpg"
    },
    {
        "id": 4,
        "name": "Oil Filter",
        "price": 12.75,
        "oldPrice": 15.75,
        "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/c0951178-b658-403e-9936-476c6ec73e1c.jpg"
    },
    {
        "id": 5,
        "name": "Serpentine Belt",
        "price": 35.50,
        "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/dd66953e-4ee8-4f69-8f5d-fec0371cb5fd.jpg"
    },
    {
        "id": 6,
        "name": "Brake Pad Set",
        "price": 75.00,
        "image": "https://www.orenmart.com/_next/image?url=https%3A%2F%2Forenmart.sgp1.digitaloceanspaces.com%2Fproduct%2Fa4aaeb62-3a07-42d9-8af8-67569d01ed63.jpg&w=384&q=100"
    },
    // ... rest of the data
];

export default function Flashsale() {
    const [seconds, setSeconds] = useState(getSecondsUntilNextMidnight());
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds <= 1) {
                    return getSecondsUntilNextMidnight();
                }
                return prevSeconds - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;
        const padZero = (num: number) => num.toString().padStart(2, '0');
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    };

    return (
        <div>
            <div className="md:text-base text-[10px] px-2 container mx-auto flex justify-between items-center gap-4 my-10">
                <h2>FLASH SALE</h2>
                <div>
                    <Button className="md:text-xl text-[10px]">Ends In : {formatTime(seconds)}</Button>
                </div>
                <div>
                    <Button className="md:text-md text-[10px]">View All</Button>
                </div>
            </div>
            <hr />
            <div className="w-full overflow-x-auto px-2">
                <div className="flex gap-2 py-5 my-10 flex-nowrap">
                    {carPartsData.map((part) => (
                        <div key={part.id} className="w-[180px] md:w-1/6 flex-none">
                            <ProductCard
                                name={part.name}
                                price={part.price}
                                oldPrice={part.oldPrice} // Pass the new oldPrice prop
                                image={part.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}