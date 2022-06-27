import { CharacterCards } from "./components/CharacterCards";
import { Header } from "./components/Header";

export function Main() {
    return (
        <main 
         className='
            flex flex-col p-8
         '
        >
            <Header/>

            <CharacterCards />
        </main>
    )
}