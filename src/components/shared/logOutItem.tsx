import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import {  LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { gql, useMutation } from "@apollo/client"


interface NavItemProps {
    collapsed: boolean
  }

  
const LOG_OUT = gql`
mutation LOG_OUT {
logOut
}
`
  
export default function LogOutItem({ collapsed }: NavItemProps) {
    const [ LogOutMutation ] = useMutation(LOG_OUT);
    const navigate = useNavigate();
    return (
      <div onClick={async ()=>{
        await LogOutMutation();
        navigate('/Login')
      }}>
      <Button 
        className={cn("w-full justify-start hover:opacity-8 bg-inherit", collapsed ? "px-2" : "px-4")}
      >
        <LogOut className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
        {!collapsed && <span>Cerrar Sesion</span>}
      </Button>
      </div>
    )
  }