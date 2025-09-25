import { Button } from "@/components/ui/button";

const topBrandsData = [
    {
        "id": 1,
        "name": "9ff",
        "logo": "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/9ff.png"
    },
    {
        "id": 2,
        "name": "Abadal",
        "logo": "https://www.carlogos.org/logo/Abadal-logo-1920x1080.png"
    },
    {
        "id": 3,
        "name": "Abarth",
        "logo": "https://www.carlogos.org/logo/Abarth-logo-1920x1080.png"
    },
    {
        "id": 4,
        "name": "Audi",
        "logo": "https://www.carlogos.org/car-logos/audi-logo-2016-640.png"
    },
    {
        "id": 5,
        "name": "BMW",
        "logo": "https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png"
    },
    {
        "id": 6,
        "name": "Bristol",
        "logo": "https://www.carlogos.org/logo/Bristol-Cars-logo.png"
    },
    {
        "id": 7,
        "name": "Cisitalia",
        "logo": "https://www.carlogos.org/logo/Cisitalia-logo.png"
    },
    {
        "id": 8,
        "name": "Dodge Viper",
        "logo": "https://www.carlogos.org/logo/Viper-logo-2048x2048.png"
    }
];

export default function TopBrands() {
    return (
        <div>
            <div className="md:text-base text-[10px] px-2  flex justify-between items-center gap-4 my-10">
                <h1 className="md:text-2xl text-xs font-bold">TOP BRANDS</h1>
                <div>
                    <Button className="md:text-md text-[10px]">View All</Button>
                </div>
            </div>
            <div className="w-full overflow-x-auto px-2 mb-10"> {/* Container for horizontal scroll */}
                <div className="flex gap-4 py-5 flex-nowrap justify-start"> {/* Flex container for logos */}
                    {topBrandsData.map((brand) => (
                        <div key={brand.id} className="text-center flex-none w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8 p-2"> {/* Responsive width for each logo */}
                            <div className=" flex items-center justify-center ">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                   className=" md:w-full md:h-[150px] w-[90px] h-[50px]" // Adjust based on desired logo size
                                />
                            </div>
                            <h1 className="md:text-xl  text-xs font-semibold">{brand.name}</h1>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}