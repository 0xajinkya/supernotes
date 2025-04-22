'use client';

import { getSession } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { LoadingSpinner } from "../ui/spinner";
import { CircleCheckBig, Ban } from 'lucide-react';
import Link from "next/link";
// import { Button } from "../ui/button";

export const SuccessLoader = () => {
    const {
        mutate,
        isSuccess,
        isPending,
        isError,
        data: sessionDetails
    } = useMutation({
        mutationFn: () => getSession()
    });

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (sessionDetails) {
            //Do something
        }
    }, [sessionDetails]);

    return (
        <div
            className="flex flex-col items-center justify-center"
        >
            {/* {isPending && <p>Loading...</p>}
            {isSuccess && <p>Success</p>}
            {isError && <p>Error</p>}
            */}
            {isPending &&
                <LoadingSpinner
                    className="w-15 h-15"
                />
            }
            {isSuccess &&

                <div
                    className="flex flex-col gap-[12px] items-center"
                >
                    <CircleCheckBig
                        color="darkgreen"
                        className="w-15 h-15"
                    />
                    <p
                        className="font-semibold text-center text-sm"
                    >
                        Email verified, you&apos;ll be redirected shortly to the <Link href={"/"} className="underline font-bold text-[#F56565]">home page</Link>
                    </p>
                </div>
            }
            {isError &&
                <div
                    className="flex flex-col gap-[12px] items-center"
                >
                    <Ban
                        color="darkred"
                        className="w-15 h-15"
                    />
                    <p
                        className="font-semibold text-center text-sm"
                    >
                        Email verification failed, request a new link by clicking <Link href={"/login"} className="underline font-bold text-[#F56565]">here</Link>
                        {/* <Button
                        className="p-0 bg-transparent text-sm text-[#F56565] hover:bg-transparent hover:text-[#F56565] font-bold underline"
                    >here
                    </Button> */}
                    </p>
                </div>
            }
        </div>
    );
}