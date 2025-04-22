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

    let searchTake = Number(searchParams.get("limit"));
    searchTake = Math.max(1, searchTake === 0 ? 1 : searchTake);

    let searchPage = Number(searchParams.get("page"));
    searchPage = ((searchPage <= 1 ? 1 : searchPage) - 1) * searchTake;

    const notes = await db.note.findMany({
        where: {
            userId: dbUser.id
        },
        select: {
            slug: true,
            title: true
        },
        take: searchTake,
        skip: searchPage,
        orderBy: {
            createdAt: "desc"
        }
    });

    const totalNotes = await db.note.count({
        where: {
            userId: dbUser.id
        }
    });

    return NextResponse.json({
        status: true,
        content: {
            data: notes,
            meta: {
                page: searchPage === 0 ? 1 : Math.floor(searchPage/searchTake),
                total: Math.max(Math.ceil(totalNotes / searchTake), 1)
            }
        }
    });
}