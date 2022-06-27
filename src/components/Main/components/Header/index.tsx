import { Menu } from "@headlessui/react";

import { CaretDown } from "phosphor-react";

import { FilterParameter } from "./FilterParameter";


const filterParameters = [{
    id: 1,
    type: 'status',
    titles: [
        'vivo',
        'morto',
        'desconhecido',
    ],
}];

export function Header() {

    return(
        <header
         className="
            mb-[40px]
         "
        >
            <Menu>
                <Menu.Button
                 className='
                    text-2xl flex items-center gap-x-2 font-medium
                 '
                >
                    Filtos
                    <CaretDown
                     weight="bold"
                    />
                </Menu.Button>


                <Menu.Items
                 className='
                    mt-[20px] flex flex-wrap justify-between gap-y-[15px]
                 '
                >
                    {
                        filterParameters.map(({ id, titles, type }) => {
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

