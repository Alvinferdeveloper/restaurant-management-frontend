import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import AdminTables from './pages/admin/tables';

const client = new ApolloClient({
    uri: 'http://localhost:3000/',
    cache: new InMemoryCache(),
  });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/tables',
    element: <AdminTables/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)
