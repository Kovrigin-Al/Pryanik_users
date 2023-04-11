import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect } from "react";
import ToolBar from "../components/table/ToolBar";
import { useTableSetup } from "../hooks/useTableSetup";
import { useRequest } from "../hooks/useRequest";
import { ListContext, UserContext } from "../context";
import LoadingSpinner from "../components/LoadingSpinner";
import { IRecord } from "../context/ListStore";

type Props = {};

interface ITableResponse {
    error_code: number;
    error_message: string;
    data: IRecord[];
}

const TablePage: FC<Props> = observer(({}) => {
    const { request, isLoading, error, cleanError } = useRequest();
    const { request: sendChange, isLoading: isSyncing, error: syncError } = useRequest();
    const { token, isAuth } = useContext(UserContext);
    const { setItems, items } = useContext(ListContext);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTableSetup(items, sendChange);

    useEffect(() => {
        async function fetchData() {
            await request("/ru/data/v3/testmethods/docs/userdocs/get", "GET", null, {
                "x-auth": token,
            }).then((response: ITableResponse) => {
                setItems(response.data);
            });
        }
        if (isAuth) {
            fetchData();
        }
    }, []);

    if (error || syncError) {
        return <div className="w-screen flex justify-center text-lg"> Something went wrong: {error || syncError}</div>
    }

    return (
        <div className="w-full flex justify-center text-sm tracking-tight">
            <div className=" w-full container h-full flex flex-col justify-center pt-2">
                <ToolBar selectedRecords={selectedFlatRows} />
                {isLoading && <LoadingSpinner/>}
                <div className="relative ">
                {isSyncing && <div className="absolute top-0">Data is syncing..</div>}
                {!isLoading && <table
                    {...getTableProps()}
                    className="border-collapse mt-2 border-2 border-sky-200 p-2"
                >
                    <thead>
                        {headerGroups.map((hg) => (
                            <tr {...hg.getHeaderGroupProps()}>
                                {hg.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="bg-sky-200"
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((r) => {
                            prepareRow(r);
                            return (
                                <tr
                                    {...r.getRowProps()}
                                    className="border-2 border-collapse border-sky-200 mx-5"
                                >
                                    {r.cells.map((c) => (
                                        <td
                                            key={c.column.id}
                                            {...c.getCellProps}
                                            className="border-2 border-collapse border-sky-200 px-2 my-5"
                                        >
                                            {c.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>}
                </div>

            </div>
        </div>
    );
});

export default TablePage;
