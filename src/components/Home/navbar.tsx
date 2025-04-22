"use client";

import { useAppSelector } from '@/store/hooks'


export const Navbar = () => {
  const user = useAppSelector((state) => state.session.user);
    console.log(user);
    return (
        <div>
            {user?.email}
        </div>
    )
}