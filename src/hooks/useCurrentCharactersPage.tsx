import { createContext, ReactNode, useContext, useState } from "react";

interface currentCharactersPageContextInterface {
    currentCharactersPage: number;
    setCurrentCharactersPage: (arg: number) => void;
    lastCharactersPage: number;
    setLastCharactersPage: (arg: number) => void;
}

interface currentCharactersPageProviderProps {
    children: ReactNode;
}

const currentCharactersPageContext = createContext<currentCharactersPageContextInterface>({} as currentCharactersPageContextInterface);

export function CurrentCharactersPageProvider({children}: currentCharactersPageProviderProps) {
    const [currentCharactersPage, setCurrentCharactersPage] = useState<number>(1);
    const [lastCharactersPage, setLastCharactersPage] = useState<number>(42);
    
    
    return (
        <currentCharactersPageContext.Provider value={{ currentCharactersPage, setCurrentCharactersPage, lastCharactersPage, setLastCharactersPage }}>
            {children}
        </currentCharactersPageContext.Provider>
    )
}

export function useCurrentCharactersPage() {
    const context = useContext(currentCharactersPageContext);

    return context;
}