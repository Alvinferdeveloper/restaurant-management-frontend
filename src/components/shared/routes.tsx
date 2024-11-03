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
import ProtectedRoute from "./protectedRoute";
import { useQuery } from "@apollo/client";
import { GET_USER_AUTH } from "@/resolvers/auth";
import { UserLayout } from "../user/layout";
import UserOrders from "@/pages/user/orders";


type User = {
    id: number,
    name: string,
    roles: string[]
}

interface Data {
    user: User
}

export default function GlobalRoutes() {
    const { data, loading } = useQuery<Data>(GET_USER_AUTH);
    
    if (loading) return <div>Loading...</div>;
    let initialPath = '/Login';
    if (data?.user) {
        const isAdmin = data.user.roles.includes('ADMIN');
        initialPath = isAdmin ? '/Admin/Tables' : '/User/Tables';

    }

    return (
        <Router>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to={initialPath} />}
                />
                <Route path="/Admin" element={<AdminLayout />}>
                    <Route element={<ProtectedRoute user={data?.user} requiredRoles={['ADMIN']} />}>
                        <Route path='Tables' element={<AdminTables />} />
                        <Route path='Dashboard' element={<></>} />
                        <Route path='Menu' element={<Foods />} />
                    </Route>
                </Route>
                <Route path="/User" element={<UserLayout />}>
                    <Route element={<ProtectedRoute user={data?.user} requiredRoles={['USER']} />}>
                        <Route path='Tables' element={<UserTablesPage />} />
                        <Route index path='Dashboard' element={<></>} />
                        <Route path='NewOrder' element={<NewOrder />} />
                        <Route path='Orders' element={<UserOrders />} />
                    </Route>
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}