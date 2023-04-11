import { useMemo } from "react";
import { Column } from "react-table";
import { IRecord } from "../context/ListStore";

export const useColumnsCreate = (): Column<IRecord>[] => {
    return useMemo(
        () => [
            {
                Header: "Company Sign Date",
                accessor: "companySigDate",
            },
            {
                Header: "Company Signature Name",
                accessor: "companySignatureName",
            },

            {
                Header: "Document Name",
                accessor: "documentName",
            },
            {
                Header: "Document Status",
                accessor: "documentStatus",
            },
            {
                Header: "Document Type",
                accessor: "documentType",
            },
            {
                Header: "Employee Number",
                accessor: "employeeNumber",
            },
            {
                Header: "Employee Sign Date",
                accessor: "employeeSigDate",
            },
            {
                Header: "Employee Signature Name",
                accessor: "employeeSignatureName",
            },
        ],
        []
    );
};