import { Loading } from "../Loading";

import { Navigation } from "../Navigation";

import { CharacterCards } from "./components/CharacterCards";

import { SearchBar } from "./components/SearchBar";

import { NoCharactersFound } from "./components/NoCharactersFound";

import { BackUpButton } from "../BackUpButton";

import { GoDownButton } from "../GoDownButton";


import { useIsLoading } from "../../hooks/useIsLoading";

import { useTranslateCharacters } from "../../hooks/useTranslateCharacters";

import { useSearchFilter } from "../../hooks/useSearchFilter";


export function Main() {
    const { isLoading } = useIsLoading()

    const { translatedCharacters } = useTranslateCharacters();
    
    const { selectedFilter } = useSearchFilter()


    function translateFilter() {
        switch(selectedFilter) {
            case 'alive':
                return 'vivo'

            case 'dead':
                return 'morto'

            case 'unknown':
                return 'desconhecido'
        }
    }


    function isTranslatedCharactersLengthGreaterThanZero() {
        return translatedCharacters.length > 0
    }


    return (
        <main 
         className='
            flex flex-col p-8 w-full relative backdrop-blur-sm
         '
        >
            <SearchBar/>
            {
                !isLoading ?
                    isTranslatedCharactersLengthGreaterThanZero() ? 
                        <div>
                            <CharacterCards />
                            <Navigation/>
                        </div>
                    :
                        selectedFilter === 'none' ?
                            <NoCharactersFound message="Ops, parece que não foi possivel encontrar alguém com esse nome."/>
                        :
                            <NoCharactersFound
                             message={`Ops, parece que não foi possivel encontrar alguém com status "${translateFilter()}" com esse nome.`}
                            />

                :
                    <div
                     className="
                        w-2/5 m-auto mt-[100px] flex justify-center items-center
                     "
                    >
                        <Loading/>
                    </div>
            }
        </main>
    )
}