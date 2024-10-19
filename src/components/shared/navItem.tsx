import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NavItemProps {
    icon: React.ElementType
    label: string
    collapsed: boolean
    selected: string
    onClick: () => void
    badge?: string
    navTo: string,
  }
  
export default function NavItem({ icon: Icon, label, collapsed, selected, onClick, badge, navTo }: NavItemProps) {
    return (
      <Link to={navTo}>
      <Button 
        variant={selected === label ? "secondary" : "ghost"} 
        className={cn("w-full justify-start", collapsed ? "px-2" : "px-4")}
        onClick={onClick}
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