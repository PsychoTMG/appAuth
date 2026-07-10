'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Bg from '@/app/components/Bg';
import AnimateText from '@/app/components/AnimateText';
import { useAppContext } from '@/app/provider/ContextProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default function Page() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [error, setError] = useState<string>('')
    const { token, setToken } = useAppContext();
    const router = useRouter()



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<string>('http://localhost:3001/auth/register', form);
            console.log('Регистрация успешна:', response.data);
            setToken(response.data)
            router.push('/')
            console.log(token)
        } catch (error: any) {
            console.error('Ошибка при регистрации:', error);
            toast.error(error.response.data.message);
        }
    };



    return (
        <div className="fixed flex w-screen h-screen ">
            {/* Левая часть — форма */}
            <div className='hidden lg:block h-full lg:w-1/2 bg-[#050A24] '>
                <Bg>
                    <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2
                 bg-gradient-to-b from-white to-99% bg-clip-text text-transparent font-normal
                 text-[56px] w-[568px] text-center">
                        <AnimateText text="Welcome.Start your journey now with our management system!" speed={80} />

                    </h1>
                </Bg>
            </div>


            {/* Правая часть — картинка */}
            <div className="flex w-screen lg:w-1/2 items-center justify-center  flex-col h-full z-1 bg-white ">
                <form onSubmit={handleSubmit} className="flex flex-col w-80 animate-none  duration-100 lg:animate-[var(--animation-fade-left)]">
                    <h1 className="text-[28px] font-bold">Create an account</h1>

                    <div className="flex flex-col w-full gap-[24px] pt-[32px] ">
                        <label>
                            <p className="font-medium text-[#344054]">Name</p>
                            <input
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="rounded-[8px] w-full h-[48px] px-3 border-[#D0D5DD] border focus:border-[#050A24] focus:border-2"
                                type="text"
                                placeholder="Enter your name"
                            />
                        </label>

                        <label>
                            <p className="font-medium text-[#344054]">Email</p>
                            <input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="rounded-[8px] w-full h-[48px] px-3 border-[#D0D5DD] border focus:border-[#050A24] focus:border-2"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </label>

                        <label>
                            <p className="font-medium text-[#344054]">Password</p>
                            <input
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="rounded-[8px] w-full h-[48px] px-3 border-[#D0D5DD] border focus:border-[#050A24] focus:border-2"
                                type="password"
                                placeholder="Password"
                            />
                        </label>

                        <div className="flex flex-col gap-[20px] items-center">
                            <button
                                type="submit"
                                className="bg-[#1570EF] rounded-[8px] text-white h-[48px] hover:bg-[#050A24] cursor-pointer w-full"
                            >
                                Create account
                            </button>

                            <span className='flex gap-1'>
                                <p>Already have an account?</p>
                                <Link href='/auth/login'><p className='text-[#1570EF] cursor-pointer'>Log in</p></Link>
                            </span>
                        </div>
                    </div>
                </form>
                <div className='text-red-600'>{error}</div>


            </div>
        </div >
    );
}