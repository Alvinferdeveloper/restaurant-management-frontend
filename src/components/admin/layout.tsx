import {
    LayoutDashboard,
    Sofa,
    UtensilsCrossed,
    ChevronRight,
    ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import React, {  useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Outlet, useLocation } from "react-router-dom";
import NavItem from "../shared/navItem";
import LogOutItem from "../shared/logOutItem";

const navItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        navTo: "/Admin/Dashboard",
        selectedName:'Dashboard',
    },
    {
        icon: Sofa,
        label: "Tables",
        navTo: "/Admin/Tables",
        seletedName: "Tables",
    },
    {
        icon: UtensilsCrossed,
        label: "Menu",
        navTo: "/Admin/Menu",
        selectedName:'Menu',
    },

]

export const AdminLayout = React.memo(() => {
    {
        const [collapsed, setCollapsed] = useState(false)
        const location = useLocation();
        return (
            <div className="flex h-screen overflow-hidden">
                <aside className={cn(
                    " bg-blue-950 border-r transition-all duration-300 ease-in-out text-white relative",
                    collapsed ? "w-16" : "w-64"
                )}>
                    <div className="flex items-center justify-between p-4">
                        {!collapsed && <h1 className="text-xl font-semibold">Finalytic</h1>}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    </div>
                    <ScrollArea className="h-[calc(100vh-5rem)]">
                        <div className="space-y-4 py-4">
                            <div className="px-3 py-2">
                                <div className="space-y-1">
                                    {
                                        navItems.map(item => (
                                            <NavItem icon={item.icon} label={item.label} collapsed={collapsed} pathName={location.pathname}  navTo={item.navTo} selectedName={item.navTo} />
                                        ))
                                    }

                                    <hr />

                                </div>
                                <div className="space-y-1">
                                    <LogOutItem collapsed={collapsed} />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </aside>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        )
    }
})