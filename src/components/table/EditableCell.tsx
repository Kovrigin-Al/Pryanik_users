import { FC, useEffect, useState } from "react";
import { CellProps } from "react-table";
import { Calendar } from "./Calendar";
import useDebounceCallback from "../../hooks/useDebouncedCallback";
import { IRecord } from "../../context/ListStore";

export const EditableCell: FC<CellProps<IRecord>> = ({
    flatRows,
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = useState(initialValue);
    const debouncedUpdateMyData = useDebounceCallback(updateMyData, 700);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        const updatedRecord = {
            ...flatRows.find((i) => i.index === index)?.original,
            [id]: value,
        };
        debouncedUpdateMyData(index, id, updatedRecord);
    };
    const onCalendaerChange = (e: Date) => {
        setValue(e?.toISOString());
    };
    const onCalendarClose = () => {
        const updatedRecord = {
            ...flatRows.find((i) => i.index === index)?.original,
            [id]: value,
        };
        updateMyData(index, id, updatedRecord);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    if (id === "companySigDate" || id === "employeeSigDate") {
        return (
            <Calendar
                value={value}
                onCalendaerChange={onCalendaerChange}
                onCalendarClose={onCalendarClose}
            />
        );
    }

    return (
        <input
            className="w-fit border-none outline-none"
            value={value}
            onChange={onChange}
        />
    );
};
