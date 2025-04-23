import { db } from "@/lib/db"

const CreateUser = async ({
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

const GetUser = async (identifier: string) => {
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

const UpdateUser = async ({
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

export const UserService = {
    CreateUser,
    GetUser,
    UpdateUser
}