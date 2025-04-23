'use client';

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Bomb, LogOut } from "lucide-react"
import { CreateNoteModal } from "./App/create-note-modal"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { getSideNotes } from "@/api/note";
import { setCurrentNote, setSideNotes } from "@/store/slices/notes";
import { Button } from "./ui/button";
import Link from "next/link";
import { LoadingSpinner } from "./ui/spinner";
import { ScrollArea } from "./ui/scroll-area";
import { LogoutButton } from "./Home/logout";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Your notes",
      url: "/app"
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.sideNotes);
  const currentNote = useAppSelector((state) => state.notes.currentNote);
  const isLoaded = useAppSelector((state) => state.session.isLoaded);
  const isLoggedIn = useAppSelector((state) => state.session.isLoggedIn);
  const [meta, setMeta] = React.useState({
    page: 1,
    total: 1
  });

  const {
    data: notesData,
    isLoading
  } = useQuery({
    queryKey: ["side-notes", meta.page],
    queryFn: () => getSideNotes({
      page: meta.page
    }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isLoaded === isLoggedIn
  });

  React.useEffect(() => {
    if (notesData) {
      dispatch(setSideNotes(notesData.content.data));
      setMeta((st) => ({
        ...st,
        total: notesData.content.meta?.total ?? 1
      }));
    };
  }, [notesData, dispatch])

  return (
    <Sidebar {...props}>
      <SidebarHeader
        className="flex flex-row items-center justify-between"
      >
        <div
          className="flex gap-[10px] items-center"
        >
          <Bomb
            color="#F56565"
          />
          <p
            className="font-bold"
          >
            SuperNotes
          </p>
        </div>
        <LogoutButton
          cls="bg-transparent hover:bg-transparent"
          button={
            <LogOut
              color="#F56565"
            />
          }
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}

        <div
          className="flex flex-col gap-2"
        >
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <CreateNoteModal 
                floating={false} 
              />
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <ScrollArea
                  className="h-[75vh]"
                >
                  <SidebarMenu>
                    {notes.map((item) => (
                      <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton asChild isActive={currentNote?.slug === item.slug}>
                          <Link
                            href={`/list/${item.slug}`}
                            onClick={() => dispatch(setCurrentNote(null))}
                            title={item.title} // Optional: shows full title on hover
                          >
                            <p
                              className="font-semibold truncate text-ellipsis w-[55 vw] md:w-[10vw]"
                            >
                              {item.title}
                            </p>
                          </Link>

                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </ScrollArea>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          {isLoading && <LoadingSpinner
            className="mx-auto"
          />}
        </div>
        <div
          className={`px-[6px] ${(isLoading || meta.page < meta.total) ? "flex" : "hidden"} items-stretch flex-col mt-[auto] mb-[20px]`}
        >
          <Button
            className="bg-[#F56565] text-white hover:bg-[#F56565] hover:text-white cursor-pointer"
            onClick={() => {
              setMeta((mt) => ({ ...mt, page: mt.page + 1 }));
            }}
          >
            {isLoading ? "Loading..." : "Load More..."}
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
