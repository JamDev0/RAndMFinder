import { CharacterCards } from "./components/CharacterCards";
import { Header } from "./components/Header";

export function Main() {
    return (
        <main className='p-8'>
            <Header/>

            <CharacterCards />
        </main>
    )
}