import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'
import { createUser, getUser } from '@/services/user'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const type = searchParams.get('type') as "login" | "signup"
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const res = await supabase.auth.exchangeCodeForSession(code);
        console.dir(res, {
            depth: Number.POSITIVE_INFINITY
        })

        const {
            data: {
                user,
                // session
            },
            error
        } = res;
        const existingUser = await getUser(user?.email as string);



        if (!error) {
            if ((type === "signup" && !existingUser) || !existingUser) {
                await createUser({
                    email: user?.email as string,
                    firstName: user?.user_metadata?.name?.split(" ")[0],
                    lastName: user?.user_metadata?.name?.split(" ")[1]
                });
            }

            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}