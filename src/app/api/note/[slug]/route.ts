import { CheckSession } from "@/middlewares/check-session";
import { NoteService } from "@/services/note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params


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

    const note = await NoteService.GetNote(slug);

    return NextResponse.json({
        status: true,
        content: {
            data: note,
        }
    });
};

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }
) {
    const { title, content } = await request.json();
    const { slug } = await params

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

    const note = await NoteService.UpdateNote(slug, {
        title,
        content
    });

    if (!note) {
        return new NextResponse(JSON.stringify({
            status: false,
            errors: [
                {
                    code: 'SAME_CONTENT',
                    message: 'Failed to update your note.'
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