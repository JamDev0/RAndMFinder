import { Menu, Transition } from "@headlessui/react";


import { CaretDown } from "phosphor-react";


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
                <Menu.Button
                 className='
                    text-2xl flex items-center gap-x-2 font-medium focus:outline-0
                 '

                >
                    Filtros
                    <CaretDown
                     weight="bold"
                     className="outline-0"
                    />
                </Menu.Button>

                <Menu.Items
                 className='
                    mt-[20px] flex flex-wrap justify-between gap-y-[15px] focus:outline-0
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
            </Menu>
        </header>
    )
}

