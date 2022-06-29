//@ts-ignore
import translate from "translate";
translate.engine = "google";

import { useEffect } from "react";

import { useGetCharactersByPageLazyQuery } from "../../../../graphql/generated";

import { CharacterCard } from "./CharacterCard";
import { useTranslateCharacters } from "../../../../hooks/useTranslateCharacters";
import { useIsLoading } from "../../../../hooks/useIsLoading";
import { Loading } from "../../../Loading";
import { useCurrentCharactersPage } from "../../../../hooks/useCurrentCharactersPage";


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

    const { isLoading, changeLoadingState } = useIsLoading();

    const { currentCharactersPage, setCurrentCharactersPage } = useCurrentCharactersPage()



    if(!isLoading && !isTranslating) {
        return(
            <section
            className="
                flex flex-wrap gap-y-[32px] w-full
            "
            >
                {
                    translatedCharacters.map( character => {
                        return(
                            <CharacterCard
                            key={character?.image} 
                            gender={character?.gender!}
                            image={character?.image!}
                            name={character?.name!}
                            species={character?.species!}
                            status={character?.status!}
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