interface CharacterCardProps {
    name: string;
    species: string;
    status: string;
    gender: string;
    image: string;
}


export function CharacterCard({gender, image, name, species, status}: CharacterCardProps) {

    

    function stylingForStatusIndicatorBasedOnCurrentStatus() {
        switch(status) {
            case 'Vivo':
                return 'text-brand-green-600 border-brand-green-600'

            case 'Morto':
                return 'text-brand-pink-600 border-brand-pink-600'

            case 'desconhecido':
                return 'text-gray-500 border-gray-500'
        }
    }

    function stylingForImgBorderBasedOnCurrentStatus() {
        switch(status) {
            case 'Vivo':
                return 'border-brand-green-600'

            case 'Morto':
                return 'border-brand-pink-600'

            case 'desconhecido':
                return 'border-gray-500'
        }
    }

    function stylingForNameUnderlineBasedOnCurrentStatus() {
        switch(status) {
            case 'Vivo':
                return 'decoration-brand-green-600'

            case 'Morto':
                return 'decoration-brand-pink-600'

            case 'desconhecido':
                return 'decoration-gray-500'
        }
    }

    return(
        <section
         className="
            flex flex-col bg-brand-cyan-800 px-6 py-8 relative rounded-xl gap-y-[24px]
         "
        >
            <span
             className={`
                ${stylingForStatusIndicatorBasedOnCurrentStatus()}
                absolute right-8 top-10 px-4 bg-brand-cyan-200 border border-solid rounded font-semibold text-lg
             `}
            >

                {status}
            </span>

            <img
             className={`
                ${stylingForImgBorderBasedOnCurrentStatus()}
                rounded-lg border border-solid w-full
             `}
             src={image}
            />

            <section
             className="
                flex flex-col
             "
            >

                    <strong
                     className={`
                        ${stylingForNameUnderlineBasedOnCurrentStatus()}
                        text-3xl mb-[16px] text-center underline
                     `}
                    >
                        {name}
                    </strong>

                <div
                 className="
                    flex gap-x-2 text-xl
                 "
                >
                    <span
                     className="
                        brightness-75
                     "
                    >
                        Espécie:
                    </span>

                    <strong>
                        {species}
                    </strong>

                </div>

                <div
                 className="
                    flex gap-x-2 text-xl
                 "
                >
                    <span
                     className="
                        brightness-75
                     "
                    >
                        Genero:
                    </span>

                    <strong>
                        {gender}
                    </strong>

                </div>
            </section>
        </section>
    )
}