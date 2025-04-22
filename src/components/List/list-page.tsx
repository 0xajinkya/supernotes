"use client";

import { useAppSelector } from "@/store/hooks"
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

export const ListPage = () => {

    const note = useAppSelector((st) => st.notes.currentNote);

    return (
        <div
            className="flex flex-col gap-[24px] h-full"
        >
            <div
                className="flex flex-col"
            >
                <p
                    className="text-4xl font-bold"
                >
                    {note?.title}
                </p>
            </div>
            <Separator />
            <div
                className="flex flex-row items-start h-full"
            >
                <ScrollArea
                    className="flex-1 h-full px-[20px] flex flex-col"
                >
                    <Badge
                        className="mb-[12px] bg-[#F56565]"
                    >
                        Your content
                    </Badge>
                    <div dangerouslySetInnerHTML={{ __html: note?.content ?? "" }} />
                </ScrollArea>
                <Separator
                    orientation="vertical"
                    className="w-[1px] h-full"
                />
                <ScrollArea
                    className="flex-1 h-full px-[20px] flex flex-col"
                >
                    <Badge
                        className="mb-[12px] bg-[#006400]"
                    >
                        AI Summary
                    </Badge>
                    <div dangerouslySetInnerHTML={{ __html: note?.aiSummary ?? "" }} />
                </ScrollArea>
            </div>
        </div>
    )
}