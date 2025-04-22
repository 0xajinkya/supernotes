'use client';

import { getNote } from "@/api/note";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentNote } from "@/store/slices/notes";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react"
import { LoadingSpinner } from "../ui/spinner";

export const ListLayout = ({
    children,
    slug
}: {
    children: React.ReactNode;
    slug: string;
}) => {

    const dispatch = useAppDispatch();

    const {
        data: currentNote,
        isLoading
    } = useQuery({
        queryKey: ["note", slug],
        queryFn: () => getNote({ slug })
    });

    useEffect(() => {
        if (currentNote) {
            dispatch(setCurrentNote(currentNote.content.data));
        }
    }, [currentNote, dispatch])


    return (
        <div
            className="h-full"
        >
            {children}
            {isLoading && <LoadingSpinner
                className="mx-auto"
            />}
        </div>
    )
}