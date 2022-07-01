import { createContext, ReactNode, useContext, useState } from "react";


interface filterInterface {
    filter: 'alive' | 'dead' | 'unknown' | 'none';
}

interface searchFilterContextInterface {
    filter: filterInterface['filter'];
    setFilter: (arg: filterInterface['filter']) => void
}

interface searchFilterProviderProps {
    children: ReactNode;
}


const searchFilterContext = createContext<searchFilterContextInterface>({} as searchFilterContextInterface)


export function SearchFilterProvider({ children }: searchFilterProviderProps) {
    const [filter, setFilter] = useState<filterInterface['filter']>('none');


    return(
        <searchFilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </searchFilterContext.Provider>
    )
}

export function useSearchFilter() {
    const context = useContext(searchFilterContext);

    return context;
}