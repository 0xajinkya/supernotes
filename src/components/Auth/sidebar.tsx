import { AppSidebar } from "@/components/app-sidebar"

import React from "react"
import { SidebarProvider } from "../ui/sidebar";

export function Sidebar({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <SidebarProvider
        >
            <AppSidebar />
            {children}
        </SidebarProvider>
    )
}
