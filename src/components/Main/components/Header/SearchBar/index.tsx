import { useEffect, useState } from "react";

import { useGetCharactersByPageLazyQuery, useGetCharactersByStringLazyQuery } from "../../../../../graphql/generated";
import { useCurrentCharactersPage } from "../../../../../hooks/useCurrentCharactersPage";
import { useIsLoading } from "../../../../../hooks/useIsLoading";

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

    const [randomCharacters, setRandomCharacters] = useState<characterInterface[]>([] as characterInterface[]);

    const [characters, setCharacters] = useState<characterInterface[]>([] as characterInterface[]);

    const [orderedCharacters,setOrderedCharacters] = useState<characterInterface[]>([] as characterInterface[]);

    const [getCharactersByStringLazyQuery, { called, loading, data }] = useGetCharactersByStringLazyQuery();

    const [getCharactersByPageLazyQuery, props] = useGetCharactersByPageLazyQuery()

    const { translateCharacters} = useTranslateCharacters();

    const { changeLoadingState } = useIsLoading();

    const { currentCharactersPage, setLastCharactersPage, setCurrentCharactersPage } = useCurrentCharactersPage()

    useEffect(()=>{
        if(searchValue !== '') {
            changeLoadingState(true);
            getCharactersByStringLazyQuery({variables: {
                name: searchValue,
                page: 1
            }}).then( da => {setCharacters(da.data?.characters?.results as characterInterface[]); setRandomCharacters([] as characterInterface[])})
        } else {
            let randomNumber = Math.floor(Math.random() * 43)

            changeLoadingState(true);
            getCharactersByPageLazyQuery({variables: {
                page: randomNumber
            }}).then( da => {setRandomCharacters(da.data?.characters?.results as characterInterface[]); setCharacters([] as characterInterface[]); setCurrentCharactersPage(randomNumber)})
        }
    }, [searchValue])

    useEffect(() => {
        if(randomCharacters.length > 0) {
            changeLoadingState(true);
            getCharactersByPageLazyQuery({
                variables: {
                    page: currentCharactersPage
                }
            })
            .then( da => setRandomCharacters(da.data?.characters?.results as characterInterface[]))
            .finally(() => {changeLoadingState(false); setCurrentCharactersPage(currentCharactersPage)});
        }
    }, [currentCharactersPage])

    useEffect(()=> {
        if(characters.length > 0) {
            if(data?.characters?.info?.next) {
                getCharactersByStringLazyQuery({variables: {
                    name: searchValue,
                    page: data?.characters?.info?.next
                }}).then( data => {setCharacters( last => [...last, ...data.data?.characters?.results as characterInterface[]])})
            } else {
                if(characters.length > 0) {
                    let innerCharacters = Array.from(characters);
    
                    let lowercasedSearchValue = searchValue.toLocaleLowerCase();

                    setLastCharactersPage(Math.ceil(innerCharacters.length/20))
                    
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
                    }).slice((20 * currentCharactersPage) - 20, 20 * currentCharactersPage);
    
                    setOrderedCharacters(innerCharacters);
                }
            } 
        }
    }, [characters, currentCharactersPage])

    useEffect(()=>{
        if(randomCharacters.length > 0) {
            console.log('random: ', randomCharacters)
            translateCharacters(randomCharacters).finally(() => {changeLoadingState(false)})
        } else {
            if(orderedCharacters.length > 0) {
                console.log('ordered: ', orderedCharacters)
                translateCharacters(orderedCharacters).finally(() => {changeLoadingState(false)})
            }
        }
    }, [orderedCharacters, randomCharacters])

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