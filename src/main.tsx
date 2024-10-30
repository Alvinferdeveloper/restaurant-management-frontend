import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import { Toaster } from 'sonner';
import { onError } from "@apollo/client/link/error";
import GlobalRoutes from './components/shared/routes';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      if (err.extensions?.code === "FORBIDDEN" ) {
        window.location.href = '/Login';
      }
    });
  }
});

const httpLink = new HttpLink({ uri: 'http://localhost:3000/' , credentials:'include'})

const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename:false}),
    link: from([errorLink, httpLink])
  });


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <GlobalRoutes/>
    <Toaster />
    </ApolloProvider>
  </StrictMode>,
)
