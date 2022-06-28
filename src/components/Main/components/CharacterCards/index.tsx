//@ts-ignore
import translate from "translate";
translate.engine = "google";

import { useEffect, useState } from "react";

import { useGetCharactersByPageLazyQuery, useGetCharactersByPageQuery } from "../../../../graphql/generated";

import { CharacterCard } from "./CharacterCard";
import { useTranslateCharacters } from "../../../../hooks/useTranslateCharacters";


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
    
    useEffect(()=>{
        getCharactersByPageLazyQuery({
            variables: {
                page: Math.floor(Math.random() * 43)
            }
        })
    }, [])


    useEffect(()=>{
        translateCharacters(data?.characters?.results as characterInterface[]);
    }, [data])



    if(!loading && called) {
        if(!isTranslating) {
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
        } else {
            return <p>Translating...</p>
        }
                
    }
    else {
        return <p>Loading...</p>
    }
}