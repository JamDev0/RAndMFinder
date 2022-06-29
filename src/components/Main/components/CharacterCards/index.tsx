//@ts-ignore
import translate from "translate";
translate.engine = "google";


import { CharacterCard } from "./CharacterCard";


import { useTranslateCharacters } from "../../../../hooks/useTranslateCharacters";


export function CharacterCards() {
    const {translatedCharacters } = useTranslateCharacters();


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