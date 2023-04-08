import { createContext, FC, ReactNode } from "react";
import UserStore from "./UserStore";
import ListStore from "./ListStore";

interface Props {
    children: ReactNode;
}

export const UserContext = createContext<UserStore>({} as UserStore);
export const ListContext = createContext<ListStore>({} as ListStore);
export const ContextProvider: FC<Props> = ({ children }) => {
    return (
        <UserContext.Provider value={new UserStore()}>
            <ListContext.Provider value={new ListStore()}>
                {children}
            </ListContext.Provider>
        </UserContext.Provider>
    );
};
