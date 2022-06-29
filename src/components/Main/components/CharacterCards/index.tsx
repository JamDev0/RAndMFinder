//@ts-ignore
import translate from "translate";
translate.engine = "google";

import { useEffect } from "react";

import { useGetCharactersByPageLazyQuery } from "../../../../graphql/generated";

import { CharacterCard } from "./CharacterCard";
import { useTranslateCharacters } from "../../../../hooks/useTranslateCharacters";
import { useIsLoading } from "../../../../hooks/useIsLoading";
import { Loading } from "../../../Loading";


interface characterInterface {
    name: string;
    species: string;
    status: string;
    gender: string;
    image: string;
}

export function CharacterCards() {
    const [getCharactersByPageLazyQuery, { called, loading, data }] = useGetCharactersByPageLazyQuery();

    const {translatedCharacters, isTranslating, translateCharacters} = useTranslateCharacters();

    const { isLoading, changeLoadingState } = useIsLoading()
    
    useEffect(()=>{
        changeLoadingState(true)
        getCharactersByPageLazyQuery({
            variables: {
                page: Math.floor(Math.random() * 43)
            }
        }).finally(() => {changeLoadingState(false)})
    }, [])


    useEffect(()=>{
        translateCharacters(data?.characters?.results as characterInterface[]);
    }, [data])


    if(!isLoading && !isTranslating) {
        return(
            <section
            className="
                flex flex-wrap gap-y-[32px] w-full
            "
            >
                {
                    translatedCharacters.map( caracter => {
                        return(
                            <CharacterCard
                            key={caracter?.image} 
                            gender={caracter?.gender!}
                            image={caracter?.image!}
                            name={caracter?.name!}
                            species={caracter?.species!}
                            status={caracter?.status!}
                            />
                        )
                    })
                }
            </section>
        )
    }
    else {
        return (
            <div
             className="
                w-2/3 m-auto
             "
            >
                <Loading/>
            </div>
        )
    }
}