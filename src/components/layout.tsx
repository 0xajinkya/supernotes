'use client';

import { getSession } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSession } from "@/store/slices/session";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const Layout = ({
    children
}: {
    children: React.ReactNode;
    withAuth?: boolean;
    title?: string;
}) => {
    // const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector((state) => state.session.isLoaded);
    const isLoggedIn = useAppSelector((state) => state.session.isLoggedIn);

    const {
        data: sessionData,
        isSuccess
    } = useQuery({
        queryKey: ['session'],
        queryFn: () => getSession(),
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        enabled: isLoaded === isLoggedIn
    });

    useEffect(() => {
        if (isSuccess && sessionData) {
            dispatch(setSession({
                ...sessionData.content.data
            }))
        };
    }, [isSuccess, sessionData, dispatch])

    return (
        <>
            {children}
        </>
    )
}