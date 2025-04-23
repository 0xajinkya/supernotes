'use client';

import { useMemo } from "react";
import { CreateNoteModal } from "@/components/App/create-note-modal";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

export default function AppPage() {
    const user = useAppSelector((st) => st.session.user);

    const greet = useMemo(() => getGreeting(), []);

    return (
        <Sidebar>
            <div className="h-full flex items-center justify-center flex-col gap-[20px]">
                <p className="text-2xl md:text-4xl font-semibold text-center">
                    {greet}, <span className="text-[#F56565] font-extrabold capitalize">{user?.firstName}</span><br />What brought you here?
                </p>
                <CreateNoteModal 
                    button={
                        <Button className="bg-[#F56565] p-[25px] md:p-[30px] text-xl md:text-2xl rounded-full hover:bg-[#F56565] cursor-pointer" >
                            Create a note
                        </Button>
                    }
                />
            </div>
        </Sidebar>
    );
}
