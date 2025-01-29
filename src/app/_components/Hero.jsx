import React from 'react'
import heroImg from '@/assets/Images/hero2.jpg'
import Image from 'next/image'
function Hero() {

    return (
        <div className='w-full lg:h-[85vh] overflow-hidden flex items-center'>
            <Image src={heroImg} alt="img" className='h-auto w-full object-cover'/>
            <div className='absolute px-4 lg:top-40 lg:px-20'>
                <h1 className='text-3xl md:text-5xl font-bold text-white '>Aggarwal Supply center</h1>
                <p className='text-white font-semibold text-xl md:text-3xl mt-3'>Simplifying your ordering process effortlessly</p>
            </div>
        </div>
    )
}

export default Hero