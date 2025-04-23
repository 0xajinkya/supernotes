import { UserService } from "@/services/user";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {
        email,
        firstName,
        lastName,
        password
    } = await request.json();

    const existingUser = await UserService.GetUser(email);
    if (existingUser) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'USER_ALREADY_EXISTS',
                    message: 'User already exists'
                }
            ]
        }), { status: 400 });
    };

    const supabase = await createClient();
    const {
        error
    } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.dir(error);
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'USER_SIGNUP_FAILED',
                    message: 'Failed to create your account.'
                }
            ]
        }), { status: 400 });
    };

    const user = await UserService.CreateUser({
        email,
        firstName,
        lastName
    });

    if (!user) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'USER_SIGNUP_FAILED',
                    message: 'Failed to create your account.'
                }
            ]
        }), { status: 400 });
    }



    return new NextResponse(JSON.stringify({
        status: true,
        content: {
            data: {
                ...user
            }
        }
    }));
};