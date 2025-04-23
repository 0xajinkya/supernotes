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
    // const note = await db.note.findFirst({
    //     where: {
    //         slug: slug
    //     },
    //     include: {
    //         user: true
    //     }
    // });

    const note = await NoteService.GetNote(slug);

    return NextResponse.json({
        status: true,
        content: {
            data: note,
        }
    });
}