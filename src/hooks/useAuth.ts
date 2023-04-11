import { useCallback, useContext } from "react";
import { UserContext } from "../context";

const PREFIX = 'pryaniki-users-';
const LOCAL_STORAGE_KEY = PREFIX + 'token';

export const useAuth = () => {
    const user = useContext(UserContext);

    const login = useCallback(
        (jwtToken: string) => {
            user.setIsAuth(true);
            user.setToken(jwtToken);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jwtToken));
        },
        [user]
    );

    const logout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        user.setIsAuth(false);
        user.setToken('');
    }, [user]);

    const checkIsLogin = useCallback(() => {
        const tokenJson = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (tokenJson) {
            user.setIsAuth(true);
            user.setToken(JSON.parse(tokenJson));
        } else {
            user.setIsAuth(false);
        }
    }, []);

    return { login, logout, checkIsLogin };
};