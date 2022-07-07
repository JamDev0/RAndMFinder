import { createContext, ReactNode, useContext, useState } from "react";


type filterType = 'alive' | 'dead' | 'unknown' | 'none';

interface searchFilterContextInterface {
    selectedFilter: filterType;
    setSelectedFilter: (arg: filterType) => void
}

interface searchFilterProviderProps {
    children: ReactNode;
}


const searchFilterContext = createContext<searchFilterContextInterface>({} as searchFilterContextInterface)


export function SearchFilterProvider({ children }: searchFilterProviderProps) {
    const [selectedFilter, setSelectedFilter] = useState<filterType>('none');


    return(
        <searchFilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            {children}
        </searchFilterContext.Provider>
    )
}

export function useSearchFilter() {
    const context = useContext(searchFilterContext);

    return context;
}