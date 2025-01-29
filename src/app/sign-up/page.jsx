'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import authImg from '@/assets/Images/auth-img.jpg'
import axios from 'axios'
import { useRouter } from 'next/navigation';

function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        const payload = { username, email, password };
        // console.log(payload)
        try {
            const response = await axios.post('/api/sign-up', payload)
            console.log(response.data)
            if (response.status === 201) {
                alert('User registered successfully');
                router.push('/sign-in');
            }

        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert('Failed to register user')
        }
    }
    return (
        <div className='absolute top-0 bg-green-50 h-screen w-full grid lg:grid-cols-2'>
            <div className='w-full h-full hidden lg:block'>
                <Image src={authImg} alt='img' className='h-full object-cover w-full' />
            </div>
            <div className='grid place-items-center'>
                <div className='bg-white w-[90%] h-auto md:w-[60%] lg:w-[70%] shadow-xl rounded-2xl px-4 py-8'>
                    <h2 className='text-center font-bold text-zinc-800 text-2xl'>Register</h2>
                    <hr className='my-2' />
                    <div className='mt-4 flex flex-col gap-4'>
                        <input type="text" className='px-3 py-2 text-lg font-medium w-full outline-none border rounded-md text-zinc-800' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" className='px-3 py-2 text-lg font-medium w-full outline-none border rounded-md text-zinc-800' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className='px-3 py-2 text-lg font-medium w-full outline-none border rounded-md text-zinc-800' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='text-white w-full bg-zinc-900 text-lg font-medium py-2' onClick={handleSubmit}>Sign Up</button>

                    </div>
                    <p className='text-zinc-800 text-base font-semibold text-center mt-4'>Already have an account? <Link className='text-green-900' href={'/sign-in'}>Login here</Link></p>
                </div>
            </div>

        </div>

    )
}

export default SignUp