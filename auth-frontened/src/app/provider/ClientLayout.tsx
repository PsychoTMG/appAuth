'use client'
import { usePathname } from "next/navigation";
import { AppProvider } from "./ContextProvider"
import Header from "../components/Header";
import { Toaster } from 'react-hot-toast';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const path = pathname.endsWith("auth/login") || pathname.endsWith("auth/register")

    return (
        <AppProvider>
            {!path && <Header />}
            <div className={`${!path ? 'pt-10' : 'pt-0'}`}>
                {children}
                <Toaster position="top-right" />
            </div>
        </AppProvider>

    )
}

export default ClientLayout