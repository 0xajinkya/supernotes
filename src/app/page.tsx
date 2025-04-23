import { Navbar } from '@/components/Home/navbar'
import { getServerSession } from '@/hooks/get-server-session'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {

  const session = await getServerSession();

  return (
    <div
      className='w-[100%] h-[100vh] flex flex-col items-stretch relative'
    >
      <Image
        src={"/home/hero.jpg"}
        fill
        alt='Superlist'
        priority
        className='z-[-1] object-cover'
      />
      <Navbar
        session={session}
      />
      <div
        className='w-[100%] h-[100%] flex flex-col items-center justify-center gap-[40px]'
      >
        <p
          className='text-3xl md:text-8xl text-center  tracking-tight'
        >
          Google Notes, on <br /><span className='text-[#F56565] font-bold'>AI Steroids</span>
        </p>
        <div
          className='flex items-center gap-[16px]'
        >
          {/* {session ? 
          
        } */}
          {!session &&
            <Link
              className='px-[20px] md:px-[35px] py-[10px] md:py-[15px] text-xl md:text-2xl  font-bold bg-[#F56565] hover:bg-[#F56565] rounded-full text-white hover:text-white'
              href={"/signup"}
            >
              Sign Up
            </Link>
          }
          {!session &&
            <Link
              className='px-[20px] md:px-[35px] py-[10px] md:py-[15px] text-xl md:text-2xl font-bold border-[3px] rounded-full border-[#F56565] bg-transparent hover:bg-transparent text-[#F56565]'
              href={"/login"}
            >
              Log In
            </Link>
          }
          {session &&
            <Link
              className='px-[20px] md:px-[35px] py-[10px] md:py-[15px] text-xl md:text-2xl font-bold bg-[#F56565] hover:bg-[#F56565] rounded-full text-white hover:text-white'
              href={"/app"}
            >
              Go To App
            </Link>
          }
        </div>
      </div>
    </div>
  )
}