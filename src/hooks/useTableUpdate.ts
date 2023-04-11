import { useContext, useState } from "react";
import { IRecord } from "../context/ListStore";
import { UserContext } from "../context";

export const useTableUpdate = (setData: React.Dispatch<React.SetStateAction<IRecord[]>>, sendChange: (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | undefined,
    body: any,
    headers?: {}
) => Promise<any>) => {
    const [skipPageReset, setSkipPageReset] = useState(false);
    const { token } = useContext(UserContext);

    const updateMyData = (rowIndex: number, columnId: keyof IRecord, value: IRecord) => {
        sendChange(`/ru/data/v3/testmethods/docs/userdocs/set/${value.id}`, 'POST', value, {
            "x-auth": token
        });
        setSkipPageReset(true);
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value[columnId],
                    };
                }
                return row;
            })
        );
    };

    return { updateMyData, skipPageReset };
};