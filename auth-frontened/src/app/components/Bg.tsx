import Image from 'next/image'
import React from 'react'

const Bg = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="flex relative  h-full ">
            {children}
            <div className='absolute top-6 left-6'><Image width={98} height={28} alt='dsd' src='/logo.svg'></Image></div>
            <div className="absolute  right-0  translate-x-1/2
                bg-[#2d56fb60] blur-[100px] w-[400px] h-[400px] rounded-full z-[1]">
            </div>
            <div className="absolute bottom-0 left-0  -translate-x-1/2
                bg-[#2d56fb60] blur-[100px] w-[400px] h-[400px] rounded-full z-[1]">
            </div>
        </div>
    )
}

export default Bg