import { useMemo } from 'react';
import { ApolloClient } from '@apollo/client';
const { HttpLink } = require('@apollo/client/link/http');

import { cache } from './cache';

let apolloClient;

// function createIsomorphLink() {
//   if (typeof window === 'undefined') {
//     const { SchemaLink } = require('@apollo/client/link/schema');
//     const { schema } = require('../schema');
//     return new SchemaLink({ schema });
//   } else {
//     return new HttpLink({
//       uri: '/api/graphql',
//       credentials: 'same-origin',
//     });
//   }
// }

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: 'https://hasura.obsorb.net/v1/graphql',
    credentials: 'omit',
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJraWQiOiJCZDJZTXNvOFRrU1BoTXpHK2VNOWQ3ZHpSRXpuNEJYZzJhZmpTaVdEUmFjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZDI2NTcyOC02MDAzLTQwODQtOTNhYi1mNjYwOGM1NTFmYmEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6XC9cL2hhc3VyYS5pb1wvand0XC9jbGFpbXMiOiJ7XCJ4LWhhc3VyYS11c2VyLWlkXCI6XCI1ZDI2NTcyOC02MDAzLTQwODQtOTNhYi1mNjYwOGM1NTFmYmFcIixcIngtaGFzdXJhLWRlZmF1bHQtcm9sZVwiOlwiYWRtaW5cIixcIngtaGFzdXJhLWFsbG93ZWQtcm9sZXNcIjpbXCJ1c2VyXCIsXCJhZG1pblwiXX0iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9mTVdFZ1ZEZzgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNWQyNjU3MjgtNjAwMy00MDg0LTkzYWItZjY2MDhjNTUxZmJhIiwib3JpZ2luX2p0aSI6ImFhMDUxOTBiLTI0OTEtNDhlNy04MGNkLTFiNTE2MDE5ODZiZiIsImF1ZCI6IjJzdGNybGdjOXYwZmMybDY3MnIyMDJpMzRkIiwiZXZlbnRfaWQiOiIxOGIxYmUxMS03MWFkLTQ4MGMtYmU1MS1hZmQ1ODBlNGNlNzgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1OTU4NDk0OSwiZXhwIjoxNjU5NTg4NTQ5LCJpYXQiOjE2NTk1ODQ5NDksImp0aSI6IjQ4YmY2MDhkLTY5ZjctNGI0NS04ZDBiLWU3MGI2YTljM2RjNCIsImVtYWlsIjoia2V2LmNhZG9nYW4zMDBAZ21haWwuY29tIn0.gGd2f9j9bIVLrspewNqKnD99uzp9EN77rO2YAXzQDkdEUEkVXYf-dWV-Fsv8LVhZOJrnuVUgrHADtkL2kmI4tN-P2p0dBzxuzoggDaqB194vuBR76bkAs2YFcQHn880-p-dAmGK8u6c1lYDOw1OlqHo8oZjAfvvjyUHEuECLoe5tW5TZvtGyWXm1p-fklEssD3lQxg0Bdc5F3S9InPPC-ujivR1UkgN-FRcpC_Fg07woONuK9UM9PU0LeK9Cb-i8jmljL6FqrTjpb09eHewvYw1vGmr8N-UyzhV7i7490riBokn8gHc402ArQyShoA7KvZAm_I6FiFGwHhRqVL9jmw',
    },
        fetchOptions: {
      mode: 'no-cors',
    },
    // auth token is fetched on the server side
    // fetch,
  });
  return httpLink;
};
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createHttpLink(),
    cache: cache,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
