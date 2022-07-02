import { ReactSVG } from 'react-svg'

import Logo from '../../assets/RKFinderLogo.svg'

import styles from './Header.module.css'

export function Header() {
    return(
        <header
         className="
            px-2 w-full min-h-[120px] flex justify-center items-center text-3xl font-semibold
            bg-brand-purple-200
            dark:bg-brand-purple-750
         "
        >
                <ReactSVG src={Logo} className={styles.svg}/>
        </header>
    )
}