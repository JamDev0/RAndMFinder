import { useEffect, useState } from "react";

import { useGetCharactersByStringLazyQuery } from "../../../../../graphql/generated";

import { useTranslateCharacters } from "../../../../../hooks/useTranslateCharacters";

interface characterInterface {
    name: string;
    species: string;
    status: string;
    gender: string;
    image: string;
}

export function SearchBar() {
    const [searchValue, setSearchValue] = useState<string>('');

    const [characters, setCharacters] = useState<characterInterface[]>([] as characterInterface[]);

    const [orderedCharacters,setOrderedCharacters] = useState<characterInterface[]>([] as characterInterface[]);

    const [getCharactersByStringLazyQuery, { called, loading, data }] = useGetCharactersByStringLazyQuery();

    const {isTranslating, translateCharacters} = useTranslateCharacters();

    useEffect(()=>{
        if(searchValue.length > 0) {
            getCharactersByStringLazyQuery({variables: {
                name: searchValue,
                page: 1
            }}).then( data => setCharacters(data.data?.characters?.results as characterInterface[]))
        }
    }, [searchValue])


    useEffect(()=> {
        if(data?.characters?.info?.next) {
            getCharactersByStringLazyQuery({variables: {
                name: searchValue,
                page: data?.characters?.info?.next
            }}).then( data => setCharacters( last => [...last, ...data.data?.characters?.results as characterInterface[]]))
        } else {
            if(characters.length > 0) {
                let innerCharacters = Array.from(characters);

                let lowercasedSearchValue = searchValue.toLocaleLowerCase()
                
                innerCharacters = innerCharacters.sort( (characterA, characterB) => {
                    if(characterA.name.toLocaleLowerCase().indexOf(lowercasedSearchValue) > characterB.name.toLocaleLowerCase().indexOf(lowercasedSearchValue)) {
                        return 1
                    }
        
                    if(characterA.name.toLocaleLowerCase().indexOf(lowercasedSearchValue) < characterB.name.toLocaleLowerCase().indexOf(lowercasedSearchValue)) {
                        return -1
                    }

                    if(characterA.name.toLocaleLowerCase() > characterB.name.toLocaleLowerCase()) {
                        return 1;
                    }

                    if(characterA.name.toLocaleLowerCase() < characterB.name.toLocaleLowerCase()) {
                        return -1;
                    }
        
                    return 0
                }).slice(0, 19);

                setOrderedCharacters(innerCharacters);
            }
        } 
    }, [characters])

    useEffect(()=>{
        translateCharacters(orderedCharacters);
    }, [orderedCharacters])

    return (
        <input
         type='text'
         name="Search"
         className="
            bg-brand-cyan-200 w-full rounded-full px-4 py-1 text-2xl text-brand-blue-850 mb-[16px]
            placeholder:text-gray-500
         "
         placeholder="Procurar"
         value={searchValue}
         onChange={ event => setSearchValue(event.target.value)}
        >

        </input>
    )
}