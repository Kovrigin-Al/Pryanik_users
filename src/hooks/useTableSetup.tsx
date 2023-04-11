import { useEffect, useState } from "react";
import { useTable, useRowSelect, Row } from "react-table";
import { IndeterminateCheckbox } from "../components/table/IndeterminateCheckbox";
import { EditableCell } from "../components/table/EditableCell";
import { IRecord } from "../context/ListStore";
import { useColumnsCreate } from "./useColumnsCreate";
import { useTableUpdate } from "./useTableUpdate";

export const useTableSetup = (
    records: IRecord[],
    sendChange: (
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | undefined,
        body: any,
        headers?: {}
    ) => Promise<any>
) => {
    const [data, setData] = useState(records);
    useEffect(() => {
        setData(records);
    }, [records]);

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

                    Cell: ({ row }: { row: Row<IRecord> }) => (
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
