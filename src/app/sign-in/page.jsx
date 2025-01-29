'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import authImg from '@/assets/Images/auth-img.jpg'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

function SignIn() {
    const {login} = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {

        const payload = { email, password }
        try {
            const response = await axios.post('/api/sign-in', payload)
            console.log(response.data)
            if (response.status === 201) {
                alert(response.data.message);

                // Save token to localStorage
                // localStorage.setItem('token', response.data.token);

                login(response.data.token)
                router.push('/');
            }
        }
        catch (error) {
            console.error('Sign-In Error:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to sign in.');
        }
    }
    return (
        <div className='absolute top-0 bg-green-50 h-screen w-full grid lg:grid-cols-2'>
            <div className='w-full h-full hidden lg:block'>
                <Image src={authImg} alt='img' className='h-full object-cover w-full' />
            </div>
            <div className='grid place-items-center'>
                <div className='bg-white w-[90%] h-auto md:w-[60%] lg:w-[70%] shadow-xl rounded-2xl px-4 py-8'>
                    <h2 className='text-center font-bold text-zinc-800 text-2xl'>Login</h2>
                    <hr className='my-2' />
                    <div className='mt-4 flex flex-col gap-4'>
                        <input type="email" className='px-3 py-2 text-lg font-medium w-full outline-none border rounded-md text-zinc-800' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className='px-3 py-2 text-lg font-medium w-full outline-none border rounded-md text-zinc-800' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='text-white w-full bg-zinc-900 text-lg font-medium py-2' onClick={handleSubmit}>Sign In</button>
                    </div>
                    <p className='text-zinc-800 text-base font-semibold text-center mt-4'>Don&apos;t have an account? <Link className='text-green-900' href={'/sign-up'}>Register here</Link></p>
                </div>
            </div>

        </div>
    )
}

export default SignIn