import { Loading } from "../Loading";

import { Navigation } from "../Navigation";

import { CharacterCards } from "./components/CharacterCards";

import { Header } from "./components/Header";


import { useIsLoading } from "../../hooks/useIsLoading";


export function Main() {
    const { isLoading } = useIsLoading()
    
    return (
        <main 
         className='
            flex flex-col p-8
         '
        >
            <Header/>
            {
                !isLoading ?
                    <>
                        <CharacterCards />
                        <Navigation/>
                    </>
                :
                    <div
                     className="
                        w-2/3 m-auto
                     "
                    >
                        <Loading/>
                    </div>
            }
        </main>
    )
}