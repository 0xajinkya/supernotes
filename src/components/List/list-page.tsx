"use client";

import { useAppSelector } from "@/store/hooks";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ListPage = () => {
    const note = useAppSelector((st) => st.notes.currentNote);

    return (
        <div className="flex flex-col gap-[24px] h-full">
            <div className="flex flex-col">
                {!note?.title ? (
                    <Skeleton className="w-full h-[40px]" />
                ) : (
                    <p className="text-2xl md:text-4xl font-bold">{note?.title}</p>
                )}
            </div>
            <Separator />

            <div
                className="h-[100%] flex-row hidden md:flex"
            >
                <div
                    className="flex-1 h-[100%]"
                >
                    <div
                        className="px-[20px] h-full flex flex-col overflow-hidden"
                    >
                        {!note?.content ? (
                            <Skeleton className="w-full h-[20px] w-[40px] mb-[12px]" />
                        ) : (
                            <Badge className="mb-[12px] bg-[#F56565]">Your content</Badge>
                        )}
                        <ScrollArea
                            className="h-[76vh] pr-[20px]"
                        >
                            {!note?.content ? (
                                <Skeleton className="w-full h-[400px]" />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: note?.content ?? "" }} />
                            )}
                        </ScrollArea>
                    </div>
                </div>
                <Separator orientation="vertical" className="w-[1px] h-full" />
                <div
                    className="flex-1 h-[100%]"
                >
                    <div
                        className="px-[20px] h-full flex flex-col overflow-hidden"
                    >
                        {!note?.content ? (
                            <Skeleton className="w-full h-[20px] w-[40px] mb-[12px]" />
                        ) : (
                            <Badge className="mb-[12px] bg-[#006400]">AI Summary</Badge>

                        )}
                        <ScrollArea
                            className="h-[76vh] pr-[20px]"
                        >
                            {!note?.content ? (
                                <Skeleton className="w-full h-[400px]" />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: note?.aiSummary ?? "" }} />
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </div>

            <div
                className="h-full flex md:hidden"
            >
                <Tabs defaultValue="your-content" className="w-full">
                    {!note ?
                        <Skeleton
                            className="h-[50px]"
                        />
                        :
                        <TabsList
                            className="w-full"
                        >
                            <TabsTrigger value="your-content" className="text-[#F56565]">
                                Your content
                            </TabsTrigger>
                            <TabsTrigger value="ai-summary" className="text-[#0F9D58]">AI Summary</TabsTrigger>
                        </TabsList>
                    }
                    {!note ?
                        <Skeleton
                            className="h-[350px]"
                        />
                        :
                        <>
                            <TabsContent value="your-content" className="h-full">
                                <ScrollArea
                                    className="h-[70vh]"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{ __html: note?.content ?? "" }}
                                    />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="ai-summary" className="h-full">
                                <ScrollArea
                                    className="h-[70vh]"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{ __html: note?.aiSummary ?? "" }}
                                    />
                                </ScrollArea>
                            </TabsContent>
                        </>
                    }
                </Tabs>
            </div>
        </div>
    );
};