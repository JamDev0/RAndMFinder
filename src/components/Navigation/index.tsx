import { CaretLeft, CaretRight } from "phosphor-react"
import { useCurrentCharactersPage } from "../../hooks/useCurrentCharactersPage"

export function Navigation() {
    const { currentCharactersPage, setCurrentCharactersPage, lastCharactersPage } = useCurrentCharactersPage()

    return(
        <footer
         className="
            mt-[40px] mb-[50px] flex justify-center items-center
            lg:mt-[95px] lg:mb-[20px]
         "
        >
            <div
             className="
                flex justify-center items-center text-3xl
             "
            >
                {
                    currentCharactersPage > 1 ?
                        <button>
                            <CaretLeft
                             weight="bold"
                             onClick={() => {
                                setCurrentCharactersPage(currentCharactersPage - 1)
                             }}
                            />
                        </button>
                    :
                            null
                }
                <span
                 className="
                  font-bold
                 "
                >
                    {currentCharactersPage}
                </span>

                {
                    lastCharactersPage !== currentCharactersPage ?
                        <button>
                            <CaretRight
                             weight="bold"
                             onClick={() => {
                                setCurrentCharactersPage(currentCharactersPage + 1)
                             }}
                            />
                        </button>
                    :
                         null
                }
                
            </div>
        </footer>
    )
}