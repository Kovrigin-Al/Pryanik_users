import { useCallback, useContext } from "react";
import { UserContext } from "../context";

const PREFIX = 'pryaniki-users-';
const LOCAL_STORAGE_KEY = PREFIX + 'token';

export const useAuth = () => {
    const user = useContext(UserContext);

    const login = useCallback(
        (jwtToken: string) => {
                user.setIsAuth(true);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jwtToken));
        },
        [user]
    );

    const logout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        user.setIsAuth(false);
    }, [user]);

    return { login, logout };
};