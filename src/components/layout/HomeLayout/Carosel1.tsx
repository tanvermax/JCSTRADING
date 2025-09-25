"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    //   CarouselNext,
    //   CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselPluginProps {
    data: { content:  string }[],
    delayyime:number,
    imgsize?:string,
    imgsizelg?:string
}

export function CarouselPlugin({imgsizelg, imgsize,data,delayyime }: CarouselPluginProps) {
    const plugin = React.useRef(
        Autoplay({ delay: delayyime, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className=""
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="">
                {data.map((item, index) => (
                    <CarouselItem key={index} >
                        <div className="p-1  ">
                            <Card className="">
                                <CardContent className="p-1 h-full w-full ">
                                    {/* <span className="text-4xl font-semibold">{item.content}</span> */}
                                    <img src={item.content} className={`rounded-md ${imgsize} md:${imgsizelg}`} alt="" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious /> */}
            {/* <CarouselNext /> */}
        </Carousel>
    )
}