import { createClient } from "@/utils/supabase/server"
// import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as string;
    const supabase = await createClient();
    const { data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `http://localhost:3000/api/auth/callback?type=${type}`
        },
    })

    if (data.url) {
        // redirect(data.url)
        return new NextResponse(JSON.stringify({
            status: true,
            content: {
                data: {
                    url: data.url
                }
            }
        }));
    }

    return new NextResponse(JSON.stringify({
        status: false,
        errors: [
            {
                message: "Google OAuth failed",
                code: "GOOGLE_OAUTH_FAILED"
            }
        ]
    }));
}