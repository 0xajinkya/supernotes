import { SignupForm } from '@/components/Auth/form'
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { GoogleOAuthButton } from '@/components/Auth/google-oauth-button';


export default function SignupPage() {
    return (

        <div className="flex-[1.8] flex items-center justify-center px-[40px]">
            <div
                className="w-[60%] rounded-md bg-white/10 backdrop-blur-md shadow-lg"
            >
                <div
                    className='p-[40px] pb-[10px] flex flex-col gap-[12px]'
                >
                    <p
                        className='text-center text-sm'
                    >
                        Register With:
                    </p>
                    <div
                        className='flex gap-[12px] items-center'
                    >
                        <GoogleOAuthButton 
                            type='signup'
                        />

                        <Button
                            className="flex-1 bg-transparent text-sm text-black font-semibold border border-gray-300 hover:bg-transparent hover:text-[#1877F2] hover:border-[#1877F2]"
                        >
                            <Image
                                src={"/icons/facebook.svg"}
                                width={20}
                                height={20}
                                alt="Continue With Facebook"
                            />
                            Facebook
                        </Button>

                        <Button
                            className="flex-1 bg-transparent text-sm text-black font-semibold border border-gray-300 hover:bg-transparent hover:text-[#0A66C2] hover:border-[#0A66C2]"
                        >
                            <Image
                                src={"/icons/linkedin.svg"}
                                width={20}
                                height={20}
                                alt="Continue With LinkedIn"
                            />
                            LinkedIn
                        </Button>

                    </div>
                </div>
                <div
                    className='flex items-center gap-[12px] pt-[20px] px-[20px]'
                >
                    <Separator
                        className='flex-1'
                    />
                    <p
                        className='text-sm font-bold'
                    >or</p>
                    <Separator
                        className='flex-1'
                    />
                </div>
                <div className="p-[40px] pt-[20px] pb-[20px]">
                    <SignupForm />
                </div>
                <div
                    className='px-[40px] pb-[30px] flex flex-col gap-[12px]'
                >
                    <p
                        className='text-sm text-gray-500'
                    >
                        By creating an account you agress to the <Link href={"/terms"} className='font-semibold underline'>terms and conditions</Link>. We&apos;ll ocassionaly send you important updates about Superlist.
                    </p>

                    <p
                        className='text-center text-sm font-semibold'
                    >
                        Already have an account? <Link className='text-[#F56565] font-bold' href={"/login"}>Login</Link>
                    </p>
                </div>
            </div>

        </div>
    );
}
