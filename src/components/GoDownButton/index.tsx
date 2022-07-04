import { ArrowDown } from "phosphor-react";

import { useEffect, useState } from "react";


export function GoDownButton() {
    const [shouldAppear, setShouldAppear] = useState<boolean>(false)

    const scrollEventHandler = (Event: typeof event) => {
        window.scrollY > document.getElementsByTagName('body')[0].scrollHeight*0.07 && window.scrollY < document.getElementsByTagName('body')[0].scrollHeight*0.35 ? 
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
                        window.scrollTo(0, document.getElementsByTagName('body')[0].scrollHeight)
                     }}
                    >
                        <ArrowDown
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