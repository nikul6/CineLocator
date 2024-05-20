import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    handleLogout: () => void;
}

const initialState: AuthContextProps = {
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    handleLogout: () => { },
};

export const AuthContext = createContext<AuthContextProps>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await AsyncStorage.getItem('isAuthenticated');
            if (authStatus === 'true') {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isAuthenticated');
            setIsAuthenticated(false);
            console.log('logout');
        } catch (error) {
            console.error('Error in logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};