import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import AdminTables from './pages/admin/tables';
import { Toaster } from 'sonner';
import { AdminLayout} from './components/admin/layout';
import Foods from './pages/admin/foods';
import UserTablesPage from './pages/user/tables';

const client = new ApolloClient({
    uri: 'http://localhost:3000/',
    cache: new InMemoryCache({ addTypename:false}),
  });



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        {/* Envolvemos las rutas con el Layout */}
        <Route path="/Admin" element={<AdminLayout />}>
          <Route index path='Dashboard' element={<></>} />
          <Route path='Tables' element={<AdminTables/>} />
          <Route path='Menu' element={<Foods/>} />
        </Route>
        <Route path="/User" element={<AdminLayout />}>
          <Route index path='Dashboard' element={<></>} />
          <Route path='Tables' element={<UserTablesPage/>} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    <Toaster />
    </ApolloProvider>
  </StrictMode>,
)
