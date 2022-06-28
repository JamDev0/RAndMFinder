//@ts-ignore
import translate from "translate";
translate.engine = "google";

import { createContext, ReactNode, useContext, useState } from "react";

interface characterInterface {
    name: string;
    species: string;
    status: string;
    gender: string;
    image: string;
}

interface TranslateCharactersProviderProps {
    children: ReactNode;
}

interface translateCharactersContextInterface {
    translatedCharacters: characterInterface[];
    isTranslating: boolean;
    translateCharacters: (arg: characterInterface[]) => Promise<void>;
}

const translateCharactersContext = createContext<translateCharactersContextInterface>({} as translateCharactersContextInterface);

export function TranslateCharactersProvider({children}: TranslateCharactersProviderProps) {
    const [isTranslating, setIsTranslating] = useState<boolean>(true);
    const [translatedCharacters, setTranslatedCharacters] = useState<characterInterface[]>([] as characterInterface[]);

    async function translateCharacters(innerCharacters: characterInterface[]) {    
        let innerTranslatedCharacters: characterInterface[] = [];

        for(const character of innerCharacters) {
            let translatedCharacter: characterInterface = {
                gender: '',
                image: character.image,
                name: character.name,
                species: '',
                status: ''
            }

            translatedCharacter.gender = await translate(character.gender, 'pt');

            if(character.species === 'Alien') {
                translatedCharacter.species = 'Alien'
            } else {
                translatedCharacter.species = await translate(character.species, 'pt');
            }
            translatedCharacter.status = await translate(character.status, 'pt');
    
            innerTranslatedCharacters.push(translatedCharacter);
        }
        setTranslatedCharacters(innerTranslatedCharacters);
        setIsTranslating(false);
    }

    return(
        <translateCharactersContext.Provider value={{translatedCharacters, isTranslating, translateCharacters}}>
            {children}
        </translateCharactersContext.Provider>
    )
}

export function useTranslateCharacters() {
    const context = useContext(translateCharactersContext);

    return context;
}