import { NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { db } from '@/lib/db';

export async function GET() {
    const supabase = await createClient();

    const {
        data: {
            session,
        }
    } = await supabase.auth.getSession();
    const {
        data: {
            user,
        }
    } = await supabase.auth.getUser();

    if (!user || !session) {
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
    const dbUser = await db.user.findFirst({
        where: {
            email: user?.email as string
        }
    });

    if (!user) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'SOME_ERROR_OCCURED',
                    message: 'Some error occured'
                }
            ]
        }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ status: true, content: { data: { session, ...dbUser } } }));
};