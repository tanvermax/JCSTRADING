import { CarouselPlugin } from "./Carosel1";

const homeData1 = [
    { content: "https://orenmart.sgp1.digitaloceanspaces.com/slider/30e5915d-43c9-4174-b7bd-a56655935ade.jpg" },
    { content: "https://orenmart.sgp1.digitaloceanspaces.com/slider/de520231-1e21-404d-9c4b-3b7428c21544.jpg" },
    { content: "https://orenmart.sgp1.digitaloceanspaces.com/slider/014a83e2-e396-415b-9ada-cb2c106bb0b4.jpg" },
    { content: "https://orenmart.sgp1.digitaloceanspaces.com/slider/89fc8cbb-c7e0-4c04-b1d0-83c80c38a5e2.jpg" },
    { content: "https://orenmart.sgp1.digitaloceanspaces.com/slider/30e5915d-43c9-4174-b7bd-a56655935ade.jpg" }
]
const sideDAta = [
    {content:"https://orenmart.sgp1.digitaloceanspaces.com/banner/900e7486-c540-429b-91ac-788c438f1c29.jpg"},
    {content:"https://orenmart.sgp1.digitaloceanspaces.com/banner/d8848de3-4bd2-42bd-8ecc-d54bdd1e9db2.jpg"},
    {content:"https://orenmart.sgp1.digitaloceanspaces.com/banner/55ea9ba8-507a-4227-9ef2-5ad1c546edb1.jpg"}
]
export default function Banners() {
  return (
    <div className="flex justify-center  flex-row gap-10 p-4  ">
            {/* First column with two carousels stacked vertically */}
            <div className=" flex-col gap-4 hidden lg:block">
                <div className="w-[500px] ">
                    <CarouselPlugin delayyime={1200} data={homeData1} />
                </div>
                <div className="w-[500px] ">
                    <CarouselPlugin delayyime={1500} data={homeData1} />
                </div>
            </div>

            {/* Second column with a single carousel */}
            <div className="w-full mx-auto hidden md:block  my-auto  ">
                <CarouselPlugin delayyime={1100} imgsizelg={"h-[400px]"} imgsize={"h-[470px]"} data={homeData1} />
            </div>
            <div className="w-full mx-auto  my-auto block md:hidden ">
                <CarouselPlugin delayyime={1100} imgsizelg={"h-[400px]"}  data={homeData1} />
            </div>

            {/* Third column with two carousels stacked vertically */}
            <div className="  flex-col gap-4 hidden lg:block">
                <div className="w-[500px] ">
                    <CarouselPlugin delayyime={1500} data={homeData1} />
                </div>
                <div className="w-[500px] flex justify-between mx-auto items-center">
                    <CarouselPlugin delayyime={900} data={sideDAta} imgsize={"h-[270px]"} />
                    <CarouselPlugin delayyime={900} data={sideDAta} imgsize={"h-[270px]"} />
                </div>
            </div>
        </div>
  )
}