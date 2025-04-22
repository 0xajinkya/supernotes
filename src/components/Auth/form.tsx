"use client";

import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { ILoginArgs, ISignUpArgs } from "@/interfaces/auth";
import { logIn, signUp } from "@/api/auth";
import { useEffect } from "react";
import { successToast } from "../toasts";

export const LoginForm = () => {

    const {
        mutate,
        data: loginDetails
    } = useMutation({
        mutationFn: ({ data, config }: ILoginArgs) => logIn(data, config)
    })

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate({
            data: {
                email: data.email,
                password: data.password
            }
        });
    };

    useEffect(() => {
        if (loginDetails) {
            if (!loginDetails.content.data) {
                successToast({
                    title: "Confirmation link has been sent to your mail."
                });
            } else {
                successToast({
                    title: "You are logged in."
                });
            }
        }
    }, [loginDetails])


    return (
        <Form
            {...form}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jane@doe.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="*****" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-[#F56565] hover:bg-[#F56565]/80 text-white"
                >
                    Log In
                </Button>
            </form>
        </Form>
    )
}


export const SignupForm = () => {

    const {
        mutate,
        // isPending,
        isSuccess,
        // isError,
        data: userDetails,
    } = useMutation({
        mutationFn: ({ data, config }: ISignUpArgs) => signUp(data, config)
    });

    const formSchema = z.object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(8),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            }
        });
    };

    useEffect(() => {
        if (userDetails && isSuccess) {
            successToast({
                title: "Confirmation link sent on your mail."
            });
        }
    }, [userDetails, form, isSuccess]);

    return (
        <Form
            {...form}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div
                    className="flex gap-[20px] items-center w-auto"
                >
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem
                                className="flex-1"
                            >
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem
                                className="flex-1"
                            >
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jane@doe.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="*****" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-[#F56565] hover:bg-[#F56565]/80 text-white"
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    )
}