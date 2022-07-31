import {AuthSession} from "@supabase/supabase-js";
import React, {useContext, useEffect, useState} from "react";
import {SupabaseClient} from "../api/SupabaseClient";

export type AuthContextProps = {
    session: AuthSession | null;
};

const AuthContext = React.createContext<AuthContextProps>({session: null});

export type AuthProviderProps = {
    children?: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [session, setSession] = useState<AuthSession | null>(SupabaseClient.auth.session());

    useEffect(() => {
        const cleanup = SupabaseClient.auth.onAuthStateChange((_ev, session) => {
            console.log("auth session changed", session);
            setSession(session);
        });

        return () => {
            console.log("clearing up auth subscription");
            cleanup.data?.unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{session}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
