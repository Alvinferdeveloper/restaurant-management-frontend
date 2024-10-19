import {
    LayoutDashboard,
    DollarSign,
    CalendarDays,
    Building2,
    Plug,
    GitBranch,
    Monitor,
    ChevronRight,
    ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Outlet } from "react-router-dom";
import NavItem from "../shared/navItem";



export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const [selected, setSelected] = useState("Payments")
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className={cn(
                " bg-blue-950 border-r transition-all duration-300 ease-in-out text-white",
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
                                <NavItem icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} selected={selected} onClick={() => setSelected("Dashboard")} navTo="Dashboard" />
                                <NavItem icon={DollarSign} label="Payments" collapsed={collapsed} selected={selected} onClick={() => setSelected("Payments")}  navTo="Payments"/>
                                <NavItem icon={CalendarDays} label="Bookings" collapsed={collapsed} selected={selected} onClick={() => setSelected("Bookings")} navTo="Bookings"/>
                                <NavItem icon={Building2} label="Units" collapsed={collapsed} selected={selected} onClick={() => setSelected("Units")} navTo="Units" />
                                <NavItem icon={Plug} label="Connections" collapsed={collapsed} selected={selected} onClick={() => setSelected("Connections")} badge="2"  navTo="Connections"/>
                                <NavItem icon={GitBranch} label="Workflow" collapsed={collapsed} selected={selected} onClick={() => setSelected("Workflow")} navTo="Workflow" />
                                <NavItem icon={Monitor} label="Owner Portal" collapsed={collapsed} selected={selected} onClick={() => setSelected("Owner Portal")} navTo="Monitor" />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </aside>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}