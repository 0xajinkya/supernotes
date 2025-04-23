import { getServerSession } from "@/hooks/get-server-session";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export const CheckSession = async () => {
    const supabase = await createClient();

    const session = await getServerSession();
    if (!session) {
        return null;
    };

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();
    if (!user) {
        return null
    };

    const dbUser = await db.user.findFirst({
        where: {
            email: user?.email
        }
    });

    if (!dbUser) {
        return null;
    };

    return dbUser;
};