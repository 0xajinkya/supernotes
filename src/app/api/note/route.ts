import { NextRequest, NextResponse } from "next/server";
import { NoteService } from "@/services/note";
import { CheckSession } from "@/middlewares/check-session";

export async function POST(request: NextRequest) {
    const { title, content } = await request.json();

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

    const note = await NoteService.CreateNote({
        title,
        content,
        userId: sessionUser.id
    });

    if (!note) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'NOTE_CREATE_FAILED',
                    message: 'Failed to create your note.'
                }
            ]
        }), { status: 400 });
    };

    return NextResponse.json({
        status: true,
        content: {
            data: note
        }
    });
};