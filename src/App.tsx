import { ApolloProvider } from "@apollo/client";

import { client } from "./client";


import { Header } from "./components/Header";

import { Main } from "./components/Main";

export function App() {

  return (
    <ApolloProvider client={client}>
      <Header/>
      
      <Main/>
    </ApolloProvider>
  )
}
