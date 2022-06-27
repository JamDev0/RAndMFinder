import { useGetCharactersByPageQuery } from "../../../../graphql/generated";

import { CharacterCard } from "./CharacterCard";

export function CharacterCards() {

    const {data, loading, error} = useGetCharactersByPageQuery({
        variables: {
            page: Math.floor(Math.random()*43)
        }
    })

    if(!loading && !error) {
        return(
            <section
             className="
                flex flex-wrap gap-y-[32px] w-full
             "
            >
                {
                    data?.characters?.results?.map( caracter => {
                        return(
                            <CharacterCard
                             key={caracter?.name!} 
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
        return <p>Wait...</p>
    }
    
}