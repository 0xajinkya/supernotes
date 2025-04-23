"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentNote } from "@/store/slices/notes";
import { Separator } from "@radix-ui/react-separator"
import Link from "next/link";
import React from "react"

export const Sidebar = ({
    children
}: {
    children: React.ReactNode
}) => {

    const note = useAppSelector((st) => st.notes.currentNote);
    const dispatch = useAppDispatch();

    return (
        <SidebarInset
            className="flex-1 h-full"
        >
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            {/* <BreadcrumbLink> */}
                                <Link
                                    href={"/app"}
                                    onClick={() => dispatch(setCurrentNote(null))}
                                >
                                    Notes
                                </Link>
                            {/* </BreadcrumbLink> */}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{note?.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 h-full">
                {children}
            </div>
        </SidebarInset>
    )
}