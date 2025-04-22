'use client';

import { logout } from "@/app/actions";
import { Button } from "../ui/button"
import { useAppDispatch } from "@/store/hooks";
import { clearSession } from "@/store/slices/session";

export const LogoutButton = () => {

    const dispatch = useAppDispatch();

    return (
        <Button
            onClick={async() => {
                dispatch(clearSession())
                await logout()
            }}
            className="bg-[#F56565] hover:bg-[#F56565]"
        >
            Log out
        </Button>
    )
}