// import { redirect } from 'next/navigation'
// import { createClient } from '@/utils/supabase/server'
import { LogoutButton } from '@/components/Home/logout'
import { Navbar } from '@/components/Home/navbar'


export default function HomePage() {
  

  return (
    <div>
      <LogoutButton />
      <Navbar />
    </div>
  )
}