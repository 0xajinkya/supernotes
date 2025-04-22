import { getServerSession } from "@/hooks/get-server-session";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const {
        searchParams
    } = new URL(request.url);

    const supabase = await createClient();

    const session = await getServerSession();
    if (!session) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'UNAUTHORIZED',
                    message: 'Unauthorized'
                }
            ]
        }), { status: 403 });
    };

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();
    if (!user) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'UNAUTHORIZED',
                    message: 'Unauthorized'
                }
            ]
        }), { status: 403 });
    };

    const dbUser = await db.user.findFirst({
        where: {
            email: user?.email
        }
    });

    if (!dbUser) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'UNAUTHORIZED',
                    message: 'Unauthorized'
                }
            ]
        }), { status: 403 });
    };

    const slug = searchParams.get("slug");
    if (!slug) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'NOT_FOUND',
                    message: 'The note was not found.'
                }
            ]
        }), { status: 404 });
    }
    const note = await db.note.findFirst({
        where: {
            slug: slug
        },
        include: {
            user: true
        }
    });

    return NextResponse.json({
        status: true,
        content: {
            data: note,
        }
    });
}