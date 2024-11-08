import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NavItemProps {
    icon: React.ElementType
    label: string
    collapsed: boolean
    pathName: string
    badge?: string
    navTo: string,
    selectedName: string
  }
  
export default function NavItem({ icon: Icon, label, collapsed, pathName, badge, navTo, selectedName }: NavItemProps) {
    return (
      <Link to={navTo}>
      <Button 
        variant={pathName.includes(selectedName) ? "secondary" : "ghost"} 
        className={cn("w-full justify-start hover:opacity-8", collapsed ? "px-2" : "px-4")}
      >
        <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
        {!collapsed && <span>{label}</span>}
        {!collapsed && badge && (
          <span className="ml-auto bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </Button>
      </Link>
    )
  }