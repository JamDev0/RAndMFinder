import { ApolloProvider } from "@apollo/client";

import { client } from "./client";


import { Header } from "./components/Header";

import { Main } from "./components/Main";
import { TranslateCharactersProvider } from "./hooks/useTranslateCharacters";

export function App() {

  return (
    <ApolloProvider client={client}>
      <TranslateCharactersProvider>
        <Header/>
        
        <Main/>
      </TranslateCharactersProvider>
    </ApolloProvider>
  )
}
