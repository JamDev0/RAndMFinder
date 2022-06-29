import { createContext, ReactNode, useContext, useState } from "react";

interface isLoadingContextInterface {
    isLoading: boolean;
    changeLoadingState: (arg: boolean) => void;
}

interface isLoadingProviderProps {
    children: ReactNode;
}

const isLoadingContext = createContext<isLoadingContextInterface>({} as isLoadingContextInterface);

export function IsLoadingProvider({ children }: isLoadingProviderProps) {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    function changeLoadingState(Boolean: boolean) {
        setIsLoading(Boolean);
    }

    return (
        <isLoadingContext.Provider value={{ isLoading, changeLoadingState }}>
            {children}
        </isLoadingContext.Provider>
    )
}

export function useIsLoading () {
    const context = useContext(isLoadingContext);

    return context
}