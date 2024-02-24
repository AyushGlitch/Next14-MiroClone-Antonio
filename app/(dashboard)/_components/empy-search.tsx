"use client"

import Image from "next/image"

export const EmptySearch = () => {
    return (
        <div className="flex flex-col h-full items-center justify-center">

            <Image src="/empty-search.svg"
                height={140}
                width={140}
                alt="Empty"/>

            <h2 className=" mt-6 font-semibold text-2xl">No Results Found!</h2>
            <p className=" mt-2 text-sm text-muted-foreground">Try Searching for something else</p>

        </div>
    )
}