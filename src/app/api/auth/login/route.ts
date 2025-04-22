import { getUser } from "@/services/user";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {
        email,
        password
    } = await request.json();

    const existingUser = await getUser(email);

    if (!existingUser) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'USER_DOES_NOT_EXISTS',
                    message: 'User with provided credentials does not exists'
                }
            ]
        }), { status: 400 });
    };

    const supabase = await createClient();
    const res = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    const {
        data: {
            session,
            user
        }
    } = res;

    if (res.error?.code === "email_not_confirmed") {
        await supabase.auth.resend({
            email,
            type: "signup"
        });
        await supabase.auth.signOut();
        return new NextResponse(JSON.stringify({
            status: true,
            content: {}
        }));
    } else if(res.error) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'SOME_ERROR_OCCURED',
                    message: 'Some error occured'
                }
            ]
        }), { status: 400 });
    };

    return new NextResponse(JSON.stringify({
        status: true,
        content: {
            data: {
                ...user,
                session
            }
        }
    }));
};