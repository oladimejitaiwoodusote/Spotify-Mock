import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface IsClientContextType {
    isClient: boolean;
}

const IsClientContext = createContext<IsClientContextType | undefined>(undefined);