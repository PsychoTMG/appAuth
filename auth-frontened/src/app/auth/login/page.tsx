'use client'
import Bg from '@/app/components/Bg'
import { useAppContext } from '@/app/provider/ContextProvider';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ComingSoon from '@/app/components/ComingSoon';




const page = () => {
    const [form, setForm] = useState({
        password: '',
        email: '',
    });
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const { token, setToken } = useAppContext();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<string>('http://localhost:3001/auth/login', form);
            console.log('Регистрация успешна:', response.data);
            setToken(response.data)
            toast.success('Вы успешно вошли');

            router.push('/')
            'dsds'
            console.log(token)
        } catch (error: any) {
            console.error('Ошибка при регистрации:', error.response?.data?.message);
            setError(error.response?.data?.message)
        }
    };

    return (
        <div className='fixed'>
            <Bg >

                <div className='bg-[#050A24] flex justify-center items-center h-screen w-screen'>
                    <div className='flex flex-col bg-white w-80 h-[456px] lg:w-135 justify-center items-center rounded-[20px] z-50 '>
                        <form onSubmit={handleSubmit} className='flex flex-col bg-white w-70 lg:w-100  justify-center  gap-[24px] '>
                            <h1 className='text-[28px] font-bold'>Login to your account</h1>
                            <label>
                                <p className="font-medium text-[#344054]">Email</p>
                                {error}
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
                                    className="rounded-[8px] w-full h-[48px] px-3 border-[#D0D5DD] border focus:outline-none focus:border-[#050A24] focus:border-2"
                                    type="password"
                                    placeholder="Password"
                                />
                            </label>
                            <button className='w-full bg-[#1570EF] cursor-pointer h-[52px]  hover:bg-[#050A24] text-white' type='submit'>Login now</button>
                            <span className='flex gap-1'>
                                <p>Don't have an account ?</p>
                                <Link href='/auth/register'><p className='text-[#1570EF] cursor-pointer ' >Sign up</p></Link>
                            </span>
                        </form>
                        <div className='text-red-600'>{error}</div>

                    </div>

                </div>
            </Bg>
        </div>
    )
}

export default page