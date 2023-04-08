import { FC } from "react";

type Props = {
    conrolProps: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    name: string;
    type: React.HTMLInputTypeAttribute
};
const InputField: FC<Props> = ({conrolProps, name, type}) => {
    return (
        <input
            {...conrolProps}
            className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            type={type}
            name={name}
            placeholder={name}
            required={true}
        />
    );
};
export default InputField;
