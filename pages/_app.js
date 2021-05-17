import '../public/reset.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import 'semantic-ui-css/semantic.min.css'
import './styles.css'


export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
