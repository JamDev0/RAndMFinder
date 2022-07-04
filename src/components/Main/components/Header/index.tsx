import { Menu, Transition } from "@headlessui/react";


import { CaretDown, CaretUp } from "phosphor-react";


import { FilterParameter } from "./FilterParameter";

import { SearchBar } from "./SearchBar";


interface titleInterface {
    title: 'alive' | 'dead' | 'unknown'
}


interface filterParametersInterface {
    id: number;
    type: 'status';
    titles: titleInterface['title'][]
}


const filterParameters: filterParametersInterface[] = [{
    id: 1,
    type: 'status',
    titles: [
        'alive',
        'dead',
        'unknown',
    ],
}];


export function Header() {
    return(
        <header
         className="
            mb-[40px]
         "
        >
            <SearchBar/>

            <Menu>
                {({ open }) => {
                    return(
                        <>
                            <Menu.Button
                             className='
                                text-2xl flex items-center gap-x-2 font-medium focus:outline-0 relative z-10 overflow-hidden
                             '

                            >
                                Filtros
                                <CaretDown
                                 weight="bold"
                                 className={`
                                    transition duration-300 ease-in-out
                                    ${open ? '-rotate-180' : 'rotate-0'}
                                 `}
                                />
                            </Menu.Button>

                            <Transition
                             enter="transition-transform duration-300 ease-in-out"
                             enterFrom="-translate-y-full opacity-0"
                             enterTo="translate-y-0 opacity-100"
                             leave="transition-all duration-300 ease-in-out"
                             leaveFrom="translate-y-0 opacity-100"
                             leaveTo="-translate-y-full opacity-0"
                            >
                                <Menu.Items
                                 className='
                                    mt-[20px] flex flex-wrap justify-between gap-y-[15px] focus:outline-0 relative z-0
                                 '
                                >
                                    {
                                        filterParameters.map(({ titles, type }) => {
                                            return titles.map( title => {
                                                return(
                                                    <FilterParameter 
                                                     title={title}
                                                     type={type as 'status'}
                                                     key={title}
                                                    />
                                                )
                                            })
                                        }) 
                                    }
                                </Menu.Items>

                            </Transition>

                        </>
                    )
                }}
            </Menu>
        </header>
    )
}

