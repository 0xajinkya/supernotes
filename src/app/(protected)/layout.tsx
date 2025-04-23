import { CreateNoteModal } from "@/components/App/create-note-modal";
import { Sidebar } from "@/components/Auth/sidebar";
import { getServerSession } from "@/hooks/get-server-session";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: "SuperNotes",
    description: "SuperNotes is a note taking app that allows you to create, edit, and organize your notes in a simple and intuitive way.",
};

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