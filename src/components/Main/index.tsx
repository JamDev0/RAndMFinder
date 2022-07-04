import { Loading } from "../Loading";

import { Navigation } from "../Navigation";

import { CharacterCards } from "./components/CharacterCards";

import { Header } from "./components/Header";

import { NoCharactersFound } from "./components/NoCharactersFound";


import { useIsLoading } from "../../hooks/useIsLoading";

import { useTranslateCharacters } from "../../hooks/useTranslateCharacters";
import { useSearchFilter } from "../../hooks/useSearchFilter";
import { BackUpButton } from "../BackUpButton";
import { GoDownButton } from "../GoDownButton";


export function Main() {
    const { isLoading } = useIsLoading()

    const { translatedCharacters } = useTranslateCharacters();
    
    const { filter } = useSearchFilter()


    function translateFilter() {
        switch(filter) {
            case 'alive':
                return 'vivo'

            case 'dead':
                return 'morto'

            case 'unknown':
                return 'desconhecido'
        }
    }


    return (
        <main 
         className='
            flex flex-col p-8 w-full relative
         '
         onScroll={() => {console.log('Opa')}}
        >
            <Header/>
            {
                !isLoading ?
                    translatedCharacters.length > 0 ? 
                        <>
                            <CharacterCards />
                            <Navigation/>

                            <BackUpButton/>
                            <GoDownButton/>
                        </>
                    :
                        filter === 'none' ?
                            <NoCharactersFound message="Ops, parece que não foi possivel encontrar alguém com esse nome."/>
                        :
                            <NoCharactersFound
                             message={`Ops, parece que não foi possivel encontrar alguém com status "${translateFilter()}" com esse nome.`}
                            />

                :
                    <div
                     className="
                        w-2/5 m-auto mt-[100px]
                     "
                    >
                        <Loading/>
                    </div>
            }
        </main>
    )
}