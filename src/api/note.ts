import { IResponseSingle } from "@/interfaces/api";
import { ICreateNoteArgs } from "@/interfaces/note";
import { http } from "@/lib/http";
import { Note } from "@prisma/client";
import { AxiosRequestConfig } from "axios";

export const createNote = async ({
    data,
    config
}: ICreateNoteArgs) => {
    const response = await http.post<IResponseSingle<Note>>(
        '/api/note',
        data,
        config
    );

    return response?.data;
};

export const getSideNotes = async ({
    page
}: {
    page?: number
}) => {
    const response = await http.get<IResponseSingle<Pick<Note, "title" | "slug">[]>>(
        `/api/note/get-side-notes?page=${page || 1}&limit=10`
    );

    return response?.data;
};

export const getNote = async ({
    slug
}: {
    slug: string
}) => {
    const response = await http.get<IResponseSingle<Note>>(
        `/api/note/${slug}`
    );

    return response?.data;
};

export const updateNote = async (identifier: string, data: {
    title: string,
    content: string
}, config?: AxiosRequestConfig) => {
    const response = await http.put<IResponseSingle<Note>>(
        `/api/note/${identifier}`,
        data,
        config
    );

    return response?.data;

}