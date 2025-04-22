'use client';

import { AppSidebar } from "@/components/app-sidebar"

import { useParams } from "next/navigation"
import React from "react"
import { SidebarProvider } from "../ui/sidebar";

export function Sidebar({
    children
}: {
    children: React.ReactNode
}) {

    const {
        id
    } = useParams();

    console.log(id);

    return (
        <SidebarProvider>
            <AppSidebar />
            {children}
        </SidebarProvider>
    )
}
