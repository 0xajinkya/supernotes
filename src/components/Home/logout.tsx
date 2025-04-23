'use client';

import { logout } from "@/app/actions";
import { Button } from "../ui/button"
import { useAppDispatch } from "@/store/hooks";
import { clearSession } from "@/store/slices/session";
import React from "react";
import { cn } from "@/lib/utils";

export const LogoutButton = ({
    button,
    cls
}: {
    button?: React.ReactNode,
    cls?: string
}) => {

    const dispatch = useAppDispatch();
    return (
        <>
            {
                <Button
                    onClick={async () => {
                        dispatch(clearSession())
                        await logout()
                    }}
                    className={cn("bg-[#F56565] hover:bg-[#F56565] cursor-pointer", cls)}
                >
                    {button
                        ?? "Log out"}
                </Button>
            }
        </>
    )
}