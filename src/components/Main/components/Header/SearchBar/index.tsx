import { TestTube } from "phosphor-react";
import { useEffect, useState } from "react";


import { useGetCharactersByPageLazyQuery, useGetCharactersByStatusAndNameLazyQuery, useGetCharactersByStatusLazyQuery, useGetCharactersByNameLazyQuery } from "../../../../../graphql/generated";

import { useCurrentCharactersPage } from "../../../../../hooks/useCurrentCharactersPage";

import { useIsLoading } from "../../../../../hooks/useIsLoading";
import { useSearchFilter } from "../../../../../hooks/useSearchFilter";

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


    const [randomCharactersCaughtByPage, setRandomCharactersCaughtByPage] = useState<characterInterface[]>([] as characterInterface[]);

    const [allRandomCharactersCaughtByStatus, setAllRandomCharactersCaughtByStatus] = useState<characterInterface[]>([] as characterInterface[]);

    const [pagedRandomCharactersCaughtByStatus, setPagedRandomCharactersCaughtByStatus] = useState<characterInterface[]>([] as characterInterface[]);

    const [AllCharactersCaughtByName, setAllCharactersCaughtByName] = useState<characterInterface[]>([] as characterInterface[]);

    const [allCharactersCaughtByNameAndStatus, setAllCharactersCaughtByNameAndStatus] = useState<characterInterface[]>([] as characterInterface[]);

    const [pagedAndSortedCharactersCaughtByName, setPagedAndSortedCharactersCaughtByName] = useState<characterInterface[]>([] as characterInterface[]);
    
    const [pagedAndSortedCharactersCaughtByNameAndStatus, setPagedAndSortedCharactersCaughtByNameAndStatus] = useState<characterInterface[]>([] as characterInterface[]);


    const [getCharactersByNameLazyQuery, nameProps] = useGetCharactersByNameLazyQuery();

    const [getCharactersByPageLazyQuery, pageProps] = useGetCharactersByPageLazyQuery();

    const [getCharactersByStatusLazyQuery, statusProps] = useGetCharactersByStatusLazyQuery();

    const [getCharactersByStatusAndNameLazyQuery, statusAndNameProps] = useGetCharactersByStatusAndNameLazyQuery()


    const { translateCharacters} = useTranslateCharacters();


    const { changeLoadingState } = useIsLoading();


    const { filter } = useSearchFilter();


    const { currentCharactersPage, setLastCharactersPage, setCurrentCharactersPage } = useCurrentCharactersPage()


    function getCharactersByStatusAndName() {
        getCharactersByStatusAndNameLazyQuery({
            variables: {
                name: searchValue,
                status: filter,
                page: 1
            }
        })
        .then(({ data }) => {
            setAllCharactersCaughtByNameAndStatus(data?.characters?.results as characterInterface[])
            setCurrentCharactersPage(1);
        });
    }

    function getCharactersByStatus() {
        getCharactersByStatusLazyQuery({
            variables: {
                page: 1,
                status: filter
            }
        })
        .then(({ data }) => {
            setAllRandomCharactersCaughtByStatus(data?.characters?.results as characterInterface[])
             setCurrentCharactersPage(1);
        });
    }


    function getCharactersByName() {
        getCharactersByNameLazyQuery({
            variables: {
                name: searchValue,
                page: 1
            }
        })
        .then(({ data }) => {
            setAllCharactersCaughtByName(data?.characters?.results as characterInterface[])
            setCurrentCharactersPage(1);
        });
    }

    function getRandomCharacters() {
        let randomNumber = Math.floor(Math.random() * 43)
    
        getCharactersByPageLazyQuery({
            variables: {
                page: randomNumber
            }
        }).then(({ data }) => {
            setRandomCharactersCaughtByPage(data?.characters?.results as characterInterface[])
            setCurrentCharactersPage(randomNumber);
        });
    }


    function sortCharacters(innerCharacters: characterInterface[], name: string) {
        return innerCharacters.sort( (characterA, characterB) => {
            if(characterA.name.toLocaleLowerCase().indexOf(name) > characterB.name.toLocaleLowerCase().indexOf(name)) {
                return 1
            }

            if(characterA.name.toLocaleLowerCase().indexOf(name) < characterB.name.toLocaleLowerCase().indexOf(name)) {
                return -1
            }

            if(characterA.name.toLocaleLowerCase() > characterB.name.toLocaleLowerCase()) {
                return 1;
            }

            if(characterA.name.toLocaleLowerCase() < characterB.name.toLocaleLowerCase()) {
                return -1;
            }

            return 0;
        });
    }


    function charactersPagination(innerCharacters: characterInterface[], charactersPerPage: number, currentPage: number) {
        return innerCharacters.slice(((charactersPerPage * currentPage) - charactersPerPage), (charactersPerPage * currentPage))
    }



    useEffect(()=>{
        if(filter !== 'none') {
            if(searchValue !== '') {
                changeLoadingState(true);

                getCharactersByStatusAndName();
            } else {
                changeLoadingState(true);

                getCharactersByStatus();
            }
        } else {
            if(searchValue !== '') {
                changeLoadingState(true);

                getCharactersByName();
            } else {
                changeLoadingState(true);
                
                getRandomCharacters();
            }
        }
    }, [searchValue, filter])


    useEffect(() => {
        if(searchValue === '' && filter === 'none') { 
            changeLoadingState(true);
            pageProps.refetch({
                page: currentCharactersPage
            })
            .then(({data}) => {
                setRandomCharactersCaughtByPage(data.characters?.results as characterInterface[]);
                changeLoadingState(false);
            });
        }
    }, [currentCharactersPage])


    useEffect(()=> {
        if(searchValue === '' && filter !== 'none') {
                if(statusProps.data?.characters?.info?.next) {
                    getCharactersByStatusLazyQuery({
                        variables: {
                            page: statusProps.data?.characters?.info?.next,
                            status: filter
                        }
                    })
                    .then( data => {
                        setAllRandomCharactersCaughtByStatus( last => [...last, ...data.data?.characters?.results as characterInterface[]])
                    });
                } else {
                    let innerCharacters = Array.from(allRandomCharactersCaughtByStatus);
    
                    setLastCharactersPage(Math.ceil(innerCharacters.length/20))

                    innerCharacters = charactersPagination(innerCharacters, 20, currentCharactersPage);
    

                    setPagedRandomCharactersCaughtByStatus(innerCharacters);
                }
        }
    }, [allRandomCharactersCaughtByStatus, currentCharactersPage])




    useEffect(()=> {
        if(searchValue !== '' && filter !== 'none') {
                if(statusAndNameProps.data?.characters?.info?.next) {
                    getCharactersByStatusAndNameLazyQuery({variables: {
                        name: searchValue,
                        page: statusAndNameProps.data?.characters?.info?.next,
                        status: filter
                    }}).then( data => {setAllCharactersCaughtByNameAndStatus( last => [...last, ...data.data?.characters?.results as characterInterface[]]); console.log('Meio')})
                } else {
                    let innerCharacters = Array.from(allCharactersCaughtByNameAndStatus);
    
                    let lowercasedSearchValue = searchValue.toLocaleLowerCase();

    
                    setLastCharactersPage(Math.ceil(innerCharacters.length/20))
                    
                    innerCharacters = sortCharacters(innerCharacters, lowercasedSearchValue);

                    innerCharacters = charactersPagination(innerCharacters, 20, currentCharactersPage);
    

                    setPagedAndSortedCharactersCaughtByNameAndStatus(innerCharacters);
                }
        }
    }, [allCharactersCaughtByNameAndStatus, currentCharactersPage])



    useEffect(()=> {
        if(searchValue !== '' && filter === 'none') {
            if(nameProps.data?.characters?.info?.next) {
                getCharactersByNameLazyQuery({variables: {
                    name: searchValue,
                    page: nameProps.data?.characters?.info?.next
                }}).then( data => {setAllCharactersCaughtByName( last => [...last, ...data.data?.characters?.results as characterInterface[]])})
            } else {
                let innerCharacters = Array.from(AllCharactersCaughtByName);

                let lowercasedSearchValue = searchValue.toLocaleLowerCase();


                setLastCharactersPage(Math.ceil(innerCharacters.length/20))
                
                innerCharacters = sortCharacters(innerCharacters, lowercasedSearchValue);

                innerCharacters = charactersPagination(innerCharacters, 20, currentCharactersPage);


                setPagedAndSortedCharactersCaughtByName(innerCharacters);
            } 
        }
    }, [AllCharactersCaughtByName, currentCharactersPage])


    useEffect(()=>{
        if(searchValue !== '' && filter !== 'none') {
            translateCharacters(pagedAndSortedCharactersCaughtByNameAndStatus).finally(() => {
                changeLoadingState(false) //Talvez colocar um to no final do nome desse metódo
            })
        }
    }, [pagedAndSortedCharactersCaughtByNameAndStatus])

    useEffect(()=>{
        if(searchValue !== '' && filter === 'none') {
            translateCharacters(pagedAndSortedCharactersCaughtByName).finally(() => {
                changeLoadingState(false) //Talvez colocar um to no final do nome desse metódo
            })
        }
    }, [pagedAndSortedCharactersCaughtByName])


    useEffect(() => {
        if(searchValue === '' && filter === 'none') {
            translateCharacters(randomCharactersCaughtByPage).finally(() => {
                changeLoadingState(false)
            })
        }
    }, [randomCharactersCaughtByPage])


    useEffect(() => {
        if(searchValue === '' && filter !== 'none') {
            translateCharacters(pagedRandomCharactersCaughtByStatus).finally(() => {
                changeLoadingState(false)
            })
        }
    }, [pagedRandomCharactersCaughtByStatus])


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