//@ts-ignore
import translate from "translate";
translate.engine = "google";


import { CharacterCard } from "./CharacterCard";


import { useTranslateCharacters } from "../../../../hooks/useTranslateCharacters";


export function CharacterCards() {
    const { translatedCharacters } = useTranslateCharacters();


    return(
        <section
         className="
            flex flex-wrap gap-y-[85px] gap-x-16 w-full justify-around
            lg:gap-y-[50px]
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