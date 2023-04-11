import { useEffect, useState } from "react";
import { useTable, useRowSelect, Row } from "react-table";
import { IData } from "../pages/TablePage";
import { IndeterminateCheckbox } from "../components/IndeterminateCheckbox";
import { EditableCell } from "../components/EditableCell";
import { IUser } from "../context/ListStore";
import { useColumnsCreate } from "./useColumnsCreate";
import { useTableUpdate } from "./useTableUpdate";

export const useTableSetup = (
    users: IUser[],
    sendChange: (
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | undefined,
        body: any,
        headers?: {}
    ) => Promise<any>
) => {
    const [data, setData] = useState(users);
    useEffect(() => {
        setData(users);
    }, [users]);

    const { updateMyData, skipPageReset } = useTableUpdate(setData, sendChange);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns: useColumnsCreate(),
            data,
            defaultColumn: { Cell: EditableCell },
            updateMyData,
            autoResetPage: !skipPageReset,
        },
        useRowSelect,
        ({ visibleColumns }) => {
            visibleColumns.push((columns) => [
                {
                    id: "selection",

                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                    ),

                    Cell: ({ row }: { row: Row<IData> }) => (
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    ),
                },
                ...columns,
            ]);
        }
    );
    return {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    };
};
