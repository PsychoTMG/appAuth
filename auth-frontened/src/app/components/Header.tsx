import Image from "next/image"
import Logout from "./Logout"
import { useAppContext } from "../provider/ContextProvider";
import Link from "next/link";


const Header = () => {
    const { token } = useAppContext();

    return (
        <div className="fixed items-center flex top-0 w-screen bg-[#2d56fb60] h-10 justify-between p-5" >
            <Link href='/'><Image width={98} height={28} alt='dsd' src='/logo.svg'></Image></Link>
            {token ? <Logout /> : <div className="text-white"><Link href='/auth/register'>Регистрация</Link></div>}
        </div>
    )
}

export default Header