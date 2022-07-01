import { ApolloProvider } from "@apollo/client";

import { client } from "./client";


import { Header } from "./components/Header";

import { Main } from "./components/Main";


import { TranslateCharactersProvider } from "./hooks/useTranslateCharacters";
import { IsLoadingProvider} from "./hooks/useIsLoading";
import { CurrentCharactersPageProvider } from "./hooks/useCurrentCharactersPage";
import { SearchFilterProvider } from "./hooks/useSearchFilter";


export function App() {

  return (
    <ApolloProvider client={client}>
      <TranslateCharactersProvider>
        <IsLoadingProvider>
          <CurrentCharactersPageProvider>
            <SearchFilterProvider>
              <Header/>
              
              <Main/>
            </SearchFilterProvider>
          </CurrentCharactersPageProvider>
        </IsLoadingProvider>
      </TranslateCharactersProvider>
    </ApolloProvider>
  )
}
