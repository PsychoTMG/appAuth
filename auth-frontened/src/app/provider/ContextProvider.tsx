'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
    token: string | null;
    setToken: (value: string | null) => void;
}

const AppContext = createContext<AppContextType>({
    token: null,
    setToken: () => { },
});

export function AppProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AppContext.Provider value={{ token, setToken }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}