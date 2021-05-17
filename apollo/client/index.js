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
    uri: 'https://hasura-mallnet-graphql-api.herokuapp.com/v1/graphql',
    credentials: 'omit',
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4ifSwidXNlcl9pZCI6IjEifQ.52vmkQ2QwrNIm-L8zCrun7MonC3mXY3_LFs6K4t9Ud4"
    }
     // auth token is fetched on the server side
    // fetch,
  })
  return httpLink;
}
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
