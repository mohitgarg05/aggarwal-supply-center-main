'use client'
import { LogOut, ShoppingCart, UserRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import logo from '@/assets/Images/logo.png'
import Image from 'next/image'
function Nav() {

    const { isLoggedIn, logout } = useAuth();
    const [isHovered, setIsHovered] = useState(false)
    // const [cartLength, setCartLength] = useState(0)

    // useEffect(() => {
    //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //     setCartLength(cart.length)
    // }, [])

    return (
        <div className='px-4 lg:px-20 py-4 bg-gray-100 flex justify-between items-center'>
            <Link href={'/'}>
                <Image src={logo} alt='logo' className='w-10 h-10'/>
            </Link>
            <div className='flex gap-8 items-center'>
                <div className='relative'>
                    <Link href={'/cart'}>
                        <ShoppingCart />
                    </Link>
                    {/* <div className='absolute w-4 h-4 bg-red-700 text-white text-[.7rem] grid place-items-center rounded-full font-medium top-3 -right-2'><p>{cartLength}</p></div> */}
                </div>
                <div>
                    {
                        isLoggedIn ?
                            <div className='relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                <UserRound />
                                {
                                    isHovered &&
                                    <div className='absolute top-0 -translate-x-1/2 left-1/2 pt-10'><button className=' flex items-center gap-2 px-5 py-2 text-zinc-800 font-semibold bg-white shadow-md' onClick={logout}>Logout <LogOut size={18} strokeWidth={3} /></button></div>
                                }
                            </div> : <Link href={'/sign-in'} className='py-2 px-5 rounded-md bg-zinc-900 text-white font-semibold'>Login</Link>
                    }

                </div>
            </div>
        </div>
    )
}

export default Nav