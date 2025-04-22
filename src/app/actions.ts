'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
    const supabase = await createClient()
  
    const {
        error
    } = await supabase.auth.signOut()
    // console.dir(error, {
    //   depth: Number.POSITIVE_INFINITY
    // })
    if (error) {
      redirect(`/error?code=${error.code}`)
    }
  
    revalidatePath('/', 'layout')
    redirect('/login')
  }