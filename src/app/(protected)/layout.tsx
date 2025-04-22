import { CreateNoteModal } from "@/components/App/create-note-modal";
import { Sidebar } from "@/components/Auth/sidebar";
import { getServerSession } from "@/hooks/get-server-session";
import { redirect } from "next/navigation";
import React from "react";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession();

    if (!session) {
        redirect("/login")
    };

    return (
        <Sidebar>
            <div
                className="w-[100%]"
            >
                {children}
            </div>
            <CreateNoteModal
                floating={true}
            />
        </Sidebar>
    )
}