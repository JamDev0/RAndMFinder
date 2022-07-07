import { useSearchFilter } from "../../../../../hooks/useSearchFilter";


interface FilterParameterProps {
    title: 'alive' | 'dead' | 'unknown';
    type: 'status' | 'specie' | 'gender';
    
}


export function FilterParameter({ title, type }: FilterParameterProps) {
    const { setSelectedFilter, selectedFilter } = useSearchFilter();


    function stylingForTypeStatusTitle() {
        switch(title) {
            case 'alive':
                return 'text-brand-green-600 border-brand-green-600'

            case 'dead':
                return 'text-brand-pink-600 border-brand-pink-600'

            case 'unknown':
                return 'text-brand-gray-500 border-brand-gray-500'
        }
    }

    function stylingForTypeStatusBg() {
        switch(title) {
            case 'alive':
                return 'bg-brand-green-600 text-brand-cyan-100 border-brand-green-600'

            case 'dead':
                return 'bg-brand-pink-600 text-brand-cyan-100 border-brand-pink-600'

            case 'unknown':
                return 'bg-brand-gray-500 text-brand-cyan-100 border-brand-gray-500'
        }
    }

    function translateStatus() {
        switch(title) {
            case 'alive':
                return 'vivo'

            case 'dead':
                return 'morto'

            case 'unknown':
                return 'desconhecido'
        }
    }

    return(
        <button
         className={`
            w-fit flex items-center gap-x-3 px-4 py-1 border-2 border-solid rounded text-lg capitalize font-semibold
            ${type === 'status' && selectedFilter !== title ?  stylingForTypeStatusTitle() : ''}
            ${selectedFilter === title ? stylingForTypeStatusBg() : 'bg-brand-gray-900 dark:bg-brand-gray-100' }
         `}
         onClick={() => selectedFilter === title ? setSelectedFilter('none') : setSelectedFilter(title)}
        >   
            <span>
                {translateStatus()}
            </span>
        </button>
    )
}