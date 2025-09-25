import Banners from "@/components/layout/HomeLayout/Banners";
import ProductCard from "@/components/layout/HomeLayout/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const getSecondsUntilNextMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    // Set the date to the next day and the time to 00:00:00
    midnight.setDate(now.getDate() + 1);
    midnight.setHours(0, 0, 0, 0); 
    
    // Calculate the difference in milliseconds and convert to seconds
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
};

const carPartsData = [
  {
    "id": 1,
    "name": "Brake Rotor",
    "price": 59.99,
    "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/149f4d97-4ff7-40d3-920d-c8d5d3e202e8.jpg"
  },
  {
    "id": 2,
    "name": "Spark Plug",
    "price": 8.50,
    "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/7f0cce19-330c-4bb0-ba3c-614720852fdf.jpg"
  },
  {
    "id": 3,
    "name": "Air Filter",
    "price": 22.00,
    "image": "https://orenmart.sgp1.digitaloceanspaces.com/product/565ef3fa-c816-4f60-be13-9b65009be162.jpg"
  },
  {
    "id": 4,
    "name": "Oil Filter",
    "price": 15.75,
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
  }
];


export default function Home() {
   const [seconds, setSeconds] = useState(getSecondsUntilNextMidnight());
   useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                // If the timer reaches 0, reset it to the next 24-hour cycle
                if (prevSeconds <= 1) {
                    return getSecondsUntilNextMidnight();
                }
                // Otherwise, just decrement the timer
                return prevSeconds - 1;
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);


  const formatTime = (totalSeconds:number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        const padZero = (num:number) => num.toString().padStart(2, '0');

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    };


    return (
        <div>
            <Banners />
            <div className="md:text-base text-[10px]  px-2 container mx-auto flex justify-between items-center gap-4 my-10">
                <h2>FLASH SALE</h2>
                <div>
                    <Button className="md:text-xl text-[10px]">Ends In : {formatTime(seconds)}</Button>
                </div>
                <div>
                    <Button className="md:text-xl text-[10px]">View All</Button>
                </div>
                
            </div>
            <hr />
            <div className="flex flex-wrap gap-6 justify-center my-10">
                {/* here */}
                 {carPartsData.map((part) => (
                    <ProductCard
                        key={part.id}
                        name={part.name}
                        price={part.price}
                        image={part.image}
                    />
                ))}
            </div>
            
        </div>
    );
}