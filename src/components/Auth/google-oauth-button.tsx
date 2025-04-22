'use client';

import Image from "next/image"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { googleOauth } from "@/api/auth";

export const GoogleOAuthButton = ({
    type
}: {
    type: "login" | "signup"
}) => {

    const {
        mutate,
        // data: googleOauthDetails
    } = useMutation({
        mutationFn: ({
            type
        }: {
            type: "login" | "signup"
        }) => googleOauth({type}),
        onSuccess: (props) => {
            // console.log(props);
            window.location.href = props.content.data.url;
        }
    })

    return (
        <Button
            className="flex-1 bg-transparent text-sm text-black font-semibold border border-gray-300 hover:bg-transparent hover:text-[#0F9D58] hover:border-[#0F9D58]"
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