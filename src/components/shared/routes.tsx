import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import { AdminLayout } from "../admin/layout";
import AdminTables from "@/pages/admin/tables";
import Foods from "@/pages/admin/foods";
import UserTablesPage from "@/pages/user/tables";
import NewOrder from "@/pages/user/order";
import Login from "@/pages/login";
import Register from "@/pages/register";

export default function GlobalRoutes() {
    return (
        <Router>
            <Routes>
                {/* Envolvemos las rutas con el Layout */}
                <Route path='/' element={<Navigate to={'/User/Tables'} />} />
                <Route path="/Admin" element={<AdminLayout />}>
                    <Route path='Dashboard' element={<></>} />
                    <Route index path='Tables' element={<AdminTables />} />
                    <Route path='Menu' element={<Foods />} />
                </Route>
                <Route path="/User" element={<AdminLayout />}>
                    <Route index path='Dashboard' element={<></>} />
                    <Route path='Tables' element={<UserTablesPage />} />
                    <Route path='NewOrder' element={<NewOrder />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}