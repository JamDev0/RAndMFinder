import { Menu } from "@headlessui/react";

interface FilterParameterProps {
    title: string;
    type: 'status' | 'specie' | 'gender';
    
}

export function FilterParameter({ title, type }: FilterParameterProps) {
    
    function stylingForTypeStatusTitle() {
        switch(title) {
            case 'vivo':
                return 'text-brand-green-600 border-brand-green-600'

            case 'morto':
                return 'text-brand-pink-600 border-brand-pink-600'

            case 'desconhecido':
                return 'text-gray-500 border-gray-500'
        }
    }

    return(
        <Menu.Item> 
            <div
                className={`
                    ${type === 'status' ?  stylingForTypeStatusTitle() : ''}
                    w-fit flex items-center gap-x-3 px-4 py-1 border border-solid rounded text-lg capitalize bg-brand-cyan-200 font-semibold
                `}
            >   
                <span>

                    {title}
                </span>
            </div>
        </Menu.Item>
    )
}