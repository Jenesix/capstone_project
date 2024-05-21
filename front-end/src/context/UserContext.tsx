"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { axioslib } from '@/lib/axioslib';
import { User } from '@/interface/interface';

interface UserContextProps {
    user: User | undefined;
    isLogin: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const fetchUser = async () => {
        try {
            const response = await axioslib.get('/api/user/getuserbyid');
            const { data, status } = response;
            if (status === 200 && data?.message !== "Unauthorized") {
                setUser(data);
                setIsLogin(true);
            } else {
                setIsLogin(false);
                setUser(undefined);
            }
        } catch (error: any) {
            console.log(error.response?.status);
            setIsLogin(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLogin, setUser, setIsLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
