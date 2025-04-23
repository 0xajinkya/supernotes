'use client';

import Image from "next/image"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { googleOauth } from "@/api/auth";
import { cn } from "@/lib/utils";

export const GoogleOAuthButton = ({
    type,
    cls
}: {
    type: "login" | "signup",
    cls?: string
}) => {

    const {
        mutate,
    } = useMutation({
        mutationFn: ({
            type
        }: {
            type: "login" | "signup"
        }) => googleOauth({ type }),
        onSuccess: (props) => {
            window.location.href = props.content.data.url;
        }
    })

    return (
        <Button
            className={cn("flex-1 bg-transparent text-sm text-black font-semibold border border-gray-300 hover:bg-transparent hover:text-[#0F9D58] hover:border-[#0F9D58]", cls)}
            onClick={() => mutate({
                type
            })}
        >
            <Image
                src={"/icons/google.svg"}
                width={20}
                height={20}
                alt="Continue With Google"
            />
            Google
        </Button>
    )
}