import { ArrowUp } from "phosphor-react";
import { useEffect, useState } from "react";


export function BackUpButton() {
    const [shouldAppear, setShouldAppear] = useState<boolean>(false)

    const scrollEventHandler = (Event: typeof event) => {
        window.scrollY > document.getElementsByTagName('body')[0].scrollHeight*0.5 ? 
            setShouldAppear(true)
        : 
            setShouldAppear(false)
    }

    useEffect(() => {
        if(document.getElementsByTagName('body')[0].getAttribute('scrollEventAdded') === 'true') {
            window.removeEventListener('scroll', ( event ) => scrollEventHandler(event))

            document.getElementsByTagName('body')[0].setAttribute('scrollEventAdded', 'true')
            window.addEventListener('scroll', ( event ) => scrollEventHandler(event))
        } else {
            document.getElementsByTagName('body')[0].setAttribute('scrollEventAdded', 'true')
            window.addEventListener('scroll', ( event ) => scrollEventHandler(event))
        }
    }, []);

    

    return(
        <>
            {
                shouldAppear ?
                    <button
                     className="
                        rounded-full p-3 fixed bottom-[20px] right-[20px] z-20 shadow-md shadow-black
                        bg-brand-purple-200
                        dark:bg-brand-purple-750
                     "
                     onClick={() => {
                         window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
                     }}
                    >
                        <ArrowUp
                         weight="bold"
                         className="
                            w-11 h-11
                         "
                        />
                    </button>
                :
                    null
            }
        </>
    )
}