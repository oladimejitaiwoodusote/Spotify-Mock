import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface IsClientContextType {
    isClient: boolean;
}

const IsClientContext = createContext<IsClientContextType | undefined>(undefined);

export const IsClientCtxProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return <IsClientContext.Provider value={{isClient}}>{children}</IsClientContext.Provider> 
};

export const useIsClient = (): boolean => {
    const context = useContext(IsClientContext);
    if (context === undefined) {
        throw new Error('useIsClient must be used within an IsClientCtxProvider');
    }
    return context.isClient;
};