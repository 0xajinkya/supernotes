import { createClient } from "@/utils/supabase/server"

export const getServerSession = async() => {
    const supabase = await createClient();
    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();
    return session;
};