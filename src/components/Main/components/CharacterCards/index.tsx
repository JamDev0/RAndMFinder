import { useGetCharactersByPageQuery } from "../../../../graphql/generated";

import { CharacterCard } from "./CharacterCard";

export function CharacterCards() {

    const {data, loading, error} = useGetCharactersByPageQuery({
        variables: {
            page: Math.floor(Math.random()*43)
        }
    })

    // Erro ignoravel pois é apenas temporario essa funcionalidade
    if(!loading && !error) {
        return(
            <section
             className="
                flex flex-wrap w-full
             "
            >
                <CharacterCard 
                 gender={data?.characters?.results[0].gender!}
                 image={data?.characters?.results[0].image!}
                 name={data?.characters?.results[0].name!}
                 species={data?.characters?.results[0].species!}
                 status={data?.characters?.results[0].status!}
                />
            </section>
        )
    }
    else {
        return <p>Wait...</p>
    }
    
}