import { getServerSession } from "@/hooks/get-server-session";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Mate } from "@theinternetfolks/mate";
import { getPublicId } from "@/utils/id";

export async function POST(request: NextRequest) {
    const { title, content, generateAiSummay } = await request.json();
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
    }

    let slug = Mate.toSlug(title);
    while (await db.note.findFirst({
        where: {
            slug
        }
    })) {
        slug = Mate.toSlug(`${title} ${getPublicId(4)}`);
    }
    const note = await db.note.create({
        data: {
            title,
            content,
            userId: dbUser.id,
            aiSummary: "This is to be done",
            slug
        }
    });

    return NextResponse.json({
        status: true,
        content: {
            data: note
        }
    });
}