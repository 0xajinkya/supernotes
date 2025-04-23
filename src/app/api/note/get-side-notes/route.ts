import { CheckSession } from "@/middlewares/check-session";
import { NoteService } from "@/services/note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const {
        searchParams
    } = new URL(request.url);

    const sessionUser = await CheckSession();

    if (!sessionUser) {
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

    const {
        notes,
        meta: totalNotes
    } = await NoteService.ListNote({
        where: {
            userId: sessionUser.id
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

    return NextResponse.json({
        status: true,
        content: {
            data: notes,
            meta: {
                page: searchPage === 0 ? 1 : Math.floor(searchPage / searchTake),
                total: Math.max(Math.ceil(totalNotes / searchTake), 1)
            }
        }
    });
}