import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type User = {
    id: number,
    name:string,
    roles: string[]
}
interface Props {
    user: User | undefined,
    requiredRoles: string[],
}
export default function ProtectedRoute({ user, requiredRoles }: Props){
    const isAuthorized = requiredRoles.some(role => user?.roles.includes(role));
    const navigate = useNavigate();
    useEffect(()=> {
        if(!user)
            navigate('/Login')
        if(!isAuthorized)
            return navigate(-1)
    }, [navigate, isAuthorized, user])
   
    return <Outlet/>
}