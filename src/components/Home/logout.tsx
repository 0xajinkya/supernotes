'use client';

import { logout } from "@/app/actions";
import { Button } from "../ui/button"

export const LogoutButton = () => {

    return (
        <Button
            onClick={() => logout()}
        >
            Log out
        </Button>
    )
}