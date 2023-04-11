import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    value: string;
    onCalendaerChange: (date: any) => void;
    onCalendarClose: ()=>void
};

export const Calendar: FC<Props> = ({ value, onCalendaerChange, onCalendarClose }) => {
    return (
        <DatePicker
            selected={new Date(value)}
            onChange={onCalendaerChange}
            onCalendarClose={onCalendarClose}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="dd.MM.yyyy h:mm aa"
        />
    );
};
