import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import AdminTables from './pages/admin/tables';
import { Toaster } from 'sonner';
import { AdminLayout} from './components/admin/layout';
import Foods from './pages/admin/foods';
import UserTablesPage from './pages/user/tables';
import NewOrder from './pages/user/order';
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      if (err.extensions?.code === "UNAUTHENTICATED" || err.extensions?.code === "FORBIDDEN" ) {
        // Lógica de manejo para usuarios no autorizados (por ejemplo, redirigir al login)
        if(window.location.href == '/User/Tables'){
            return window.location.href = "/Admin/Tables";
        }
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
    <Router>
      <Routes>
        {/* Envolvemos las rutas con el Layout */}
        <Route path='/' element = {<Navigate to={'/User/Tables'}/>}/>
        <Route path="/Admin" element={<AdminLayout />}>
          <Route path='Dashboard' element={<></>} />
          <Route index path='Tables' element={<AdminTables/>} />
          <Route path='Menu' element={<Foods/>} />
        </Route>
        <Route path="/User" element={<AdminLayout />}>
          <Route index path='Dashboard' element={<></>} />
          <Route path='Tables' element={<UserTablesPage/>} />
          <Route path='NewOrder' element={<NewOrder/>} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    <Toaster />
    </ApolloProvider>
  </StrictMode>,
)
