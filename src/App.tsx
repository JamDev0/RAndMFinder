import { ApolloProvider } from "@apollo/client";

import { client } from "./client";


import { Header } from "./components/Header";

import { Main } from "./components/Main";
import { TranslateCharactersProvider } from "./hooks/useTranslateCharacters";
import { IsLoadingProvider } from "./hooks/useIsLoading";
import { Loading } from "./components/Loading";

export function App() {

  return (
    <ApolloProvider client={client}>
      <TranslateCharactersProvider>
        <IsLoadingProvider>
          <Header/>
          
          <Main/>
        </IsLoadingProvider>
      </TranslateCharactersProvider>
    </ApolloProvider>
  )
}
