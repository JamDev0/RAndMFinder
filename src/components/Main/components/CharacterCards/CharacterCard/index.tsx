//@ts-ignore
import translate from "translate";

interface characterInterface {
    name: string;
    species: string;
    status: string;
    gender: string;
    image: string;
}


export function CharacterCard({gender, image, name, species, status}: characterInterface) {

    translate.engine = "google";


    async function getTranslatedCharacters(innerCharacters: characterInterface[]) {
        if(innerCharacters.length <= 0) {
            console.error('You need to pass an array of characters');
        }

        let translatedCharacters: characterInterface[] = [];

        await innerCharacters.forEach( async (character) => {
            let translatedCharacter: characterInterface = {
                gender: '',
                image: character.image,
                name: character.name,
                species: '',
                status: ''
            }

            await translate(character.gender, 'pt').then( (data: string) => translatedCharacter.gender = data);
            await translate(character.species, 'pt').then( (data: string) => translatedCharacter.species = data);
            await translate(character.status, 'pt').then( (data: string) => translatedCharacter.status = data);

            translatedCharacters.push(translatedCharacter);
        })

        return translatedCharacters;
    }

    function stylingForStatusIndicatorBasedOnCurrentStatus() {
        switch(status) {
            case 'Alive':
                return 'text-brand-green-600 border-brand-green-600'

            case 'Dead':
                return 'text-brand-pink-600 border-brand-pink-600'

            case 'unknown':
                return 'text-gray-500 border-gray-500'
        }
    }

    function stylingForImgBorderBasedOnCurrentStatus() {
        switch(status) {
            case 'Alive':
                return 'border-brand-green-600'

            case 'Dead':
                return 'border-brand-pink-600'

            case 'unknown':
                return 'border-gray-500'
        }
    }

    function stylingForNameUnderlineBasedOnCurrentStatus() {
        switch(status) {
            case 'Alive':
                return 'decoration-brand-green-600'

            case 'Dead':
                return 'decoration-brand-pink-600'

            case 'unknown':
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