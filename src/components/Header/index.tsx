import { MagnifyingGlass } from "phosphor-react";

export function Header() {
    return(
        <header
         className="
            bg-brand-blue-850 w-full h-[120px] pb-[20px] flex justify-center items-center text-2xl font-semibold
         "
        >

            <h1
             className="
                flex items-center gap-x-4
             "
            >
                Rick & Morty Finder
                <MagnifyingGlass 
                 weight="duotone"
                 className="fill-brand-green-400"
                 mirrored={true}
                />
            </h1>
        </header>
    )
}