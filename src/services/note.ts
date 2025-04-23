import { db } from "@/lib/db";
import { getPublicId } from "@/utils/id";
import { Mate } from "@theinternetfolks/mate";
import { GeminiService } from "./gemini";
import { Note } from "@prisma/client";

const CreateNote = async ({
    title,
    content,
    userId
}: {
    title: string,
    content: string,
    userId: string
}) => {
    let slug = Mate.toSlug(title);
    while (await db.note.findFirst({
        where: {
            slug
        }
    })) {
        slug = Mate.toSlug(`${title} ${getPublicId(4)}`);
    };

    let aiSummary = "";
    try {
        aiSummary = (await GeminiService.GenerateSummary({
            title,
            content
        })).content;
    } catch {
        aiSummary = ""
    };

    const note = await db.note.create({
        data: {
            slug,
            title,
            content,
            userId,
            aiSummary
        }
    });
    return note;
};

const GetNote = async (identifier: string) => {
    const note = await db.note.findFirst({
        where: {
            OR: [
                { id: identifier },
                { slug: identifier }
            ]
        },
        include: {
            user: true
        }
    });
    return note;
}

const UpdateNote = async (identifier: string, data: Pick<Note, "title" | "content">) => {
    const note = await GetNote(identifier);
    if (!note) {
        return null;
    };

    if (note.content === data.content && note.title === data.title) {
        return null;
    };

    const aiSummary = (await GeminiService.GenerateSummary({
        title: data.title,
        content: data.content
    })).content;

    let slug = note.slug;
    if (data.title !== note.title) {
        slug = Mate.toSlug(data.title);
        while (await db.note.findFirst({
            where: {
                slug
            }
        })) {
            slug = Mate.toSlug(`${data.title} ${getPublicId(4)}`);
        };
    }

    const updatedNote = await db.note.update({
        where: {
            id: note.id
        },
        data: {
            ...data,
            slug,
            aiSummary
        }
    });
    return updatedNote;
};

const DeleteNote = async (identifier: string) => {
    const note = await GetNote(identifier);
    if (!note) {
        return null;
    };

    const deletedNote = await db.note.delete({
        where: {
            id: identifier
        }
    });
    return deletedNote;
};

const ListNote = async (query: {
    skip?: number,
    take?: number,
    where?: Record<string, unknown>,
    include?: Record<string, unknown>,
    select?: Record<string, unknown>,
    orderBy?: Record<string, "asc" | "desc">
}) => {
    const { skip, take, where, include, select, orderBy } = query;

    const notes = await db.note.findMany({
        skip,
        take,
        where,
        orderBy,
        ...(include ? { include } : {}),
        ...(include ? {} : select ? { select } : {})
    });

    const meta = await db.note.count({
        where: query.where
    });

    return {
        notes,
        meta
    };
};


export const NoteService = {
    CreateNote,
    GetNote,
    UpdateNote,
    DeleteNote,
    ListNote
};