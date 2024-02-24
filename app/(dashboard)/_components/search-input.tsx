"use client"

import qs from "query-string"
import { Search } from "lucide-react"
import { useDebounce } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

import { Input } from "@/components/ui/input"


export const SearchInput = () => {

    const router = useRouter()
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value, 500)

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setValue(e.target.value)
    }

    useEffect( () => {
        const url = qs.stringifyUrl( {
            url: "/",
            query: {
                search: debouncedValue,
            },
        }, {skipEmptyString: true, skipNull: true})

        router.push(url)

    }, [debouncedValue, router])

    return (
        <div className=" w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

            <Input className=" w-full max-w-[516px] pl-9" 
                placeholder="Search Boards"
                onChange={handleChange}
                value={value}/>
        </div>
    )
}








// code with same functiioanlity without qs and useHooks-ts dependencies


// import { Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { ChangeEvent, useEffect, useState } from "react";

// import { Input } from "@/components/ui/input";

// export const SearchInput = () => {
//   const router = useRouter();
//   const [value, setValue] = useState("");
//   const [debouncedValue, setDebouncedValue] = useState("");
//   const debounceTimeout = 300;

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//   };

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       setDebouncedValue(value);
//     }, debounceTimeout);

//     return () => clearTimeout(debounceTimer);
//   }, [value]);

//   useEffect(() => {
//     const searchParams = new URLSearchParams();
//     if (debouncedValue) {
//       searchParams.set("search", debouncedValue);
//     }

//     const url = `/?${searchParams.toString()}`;

//     router.push(url);

//   }, [debouncedValue, router]);

//   return (
//     <div className="w-full relative">
//       <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//       <Input
//         className="w-full max-w-[516px] pl-9"
//         placeholder="Search Boards"
//         onChange={handleChange}
//         value={value}
//       />
//     </div>
//   );
// };
