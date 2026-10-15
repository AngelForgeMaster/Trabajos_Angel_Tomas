// src/lib/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://countries.trevorblades.com/',
  }),
  cache: new InMemoryCache(),
});