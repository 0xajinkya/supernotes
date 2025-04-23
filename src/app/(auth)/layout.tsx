import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import { Bomb, CircleCheck, Users, ShieldEllipsis, CircleCheckBig, Dot } from 'lucide-react';
import Link from "next/link";

const Pointer = ({
    logo,
    heading,
    description
}: {
    logo: React.ReactNode,
    heading: string,
    description: string
}) => {
    return (
        <div className="flex flex-col items-start gap-[20px]">
            <div
                className='flex flex-col items-start gap-[12px]'
            >
                {logo}
                <p className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                    {heading}
                </p>
                <p className="scroll-m-20 text-md tracking-tight text-white">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient()

    const {
        data: { session }
    } = await supabase.auth.getSession();


    if (session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden md:flex flex-1 flex-col px-[20px] px-[80px] py-[20px] pt-[30px] gap-[70px] bg-[#F56565]">
                <div
                    className='flex flex-col items-start gap-[20px]'
                >
                    <div
                        className='flex items-center gap-[12px]'
                    >
                        <Bomb
                            size={28}
                            // color='#F56565'
                            color="white"
                        />
                        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                            SuperNotes
                        </h4>
                    </div>
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                        Start your 30-day free trial now
                    </h2>
                    <div
                        className='flex items-center gap-[12px]'
                    >
                        <CircleCheck
                            className='w-[16px]'
                            color="white"
                        />
                        <p
                            className='text-white'
                        >
                            No credit card required
                        </p>
                    </div>
                </div>

                <Pointer
                    logo={<Users size={44} color='white' />}
                    heading='Invite unlimited colleagues'
                    description='Integrate with developer friendly APIs or openly to choose a build-ready or no-code solution'
                />

                <Pointer
                    logo={<ShieldEllipsis size={44} color='white' />}
                    heading='Built-in security'
                    description='Keep your team members and customer in loop by sharing your dashboard public.'
                />

                <Pointer
                    logo={<CircleCheckBig size={44} color='white' />}
                    heading='Ensure compliance'
                    description='Receive detailed insights on all your numbers in real-time, see where visitors are coming from.'
                />
                <div
                    className='mt-auto flex justify-between'
                >
                    <div
                        className='flex gap-[5px] text-sm items-center'
                    >
                        <Link
                            href={"/terms"}
                        >
                            Terms
                        </Link>
                        <Dot />
                        <Link
                            href={"/privacy"}
                        >
                            Privacy
                        </Link>
                        <Dot />
                        <Link
                            href={"/docs"}
                        >
                            Docs
                        </Link>
                        <Dot />
                        <Link
                            href={"/helps"}
                        >
                            Helps
                        </Link>
                    </div>
                    <div>
                        <p
                            className='text-white'
                        >
                            English
                        </p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
