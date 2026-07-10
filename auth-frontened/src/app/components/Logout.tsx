
'use client'
import axios from "axios"
import { useAppContext } from "../provider/ContextProvider";




const Logout = () => {
    const { setToken } = useAppContext(); // предполагаю, что у тебя в провайдере есть setter
    const handleClick = async () => {
        const res = await axios.post('http://localhost:3001/auth/logout');
        setToken(null)

    }
    return (
        <div className="text-white "><button onClick={handleClick} className="cursor-pointer" type="submit">Выход</button></div>
    )
}

export default Logout