'use server'

import { db } from "@/lib/db"

export const createUser = async ({
    email,
    firstName,
    lastName
}: {
    email: string,
    firstName: string,
    lastName: string
}) => {
    const user = await db.user.create({
        data: {
            email,
            firstName,
            lastName,
        }
    });
    return user;
};

export const getUser = async (identifier: string) => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                { id: identifier },
                { email: identifier }
            ]
        }
    });
    return user;
};

export const updateUser = async ({
    id,
    email,
    firstName,
    lastName
}: {
    id: string,
    email: string,
    firstName: string,
    lastName: string
}) => {
    const user = await db.user.update({
        where: {
            id
        },
        data: {
            email,
            firstName,
            lastName,
        }
    });
    return user;
};