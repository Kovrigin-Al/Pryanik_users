import { IRecord } from "../../context/ListStore";
import { useForm } from "react-hook-form";
import { useRequest } from "../../hooks/useRequest";
import { FC } from "react";
type Props = {
    handleCreate: (record: IRecord) => void
}
const NewRecordForm: FC<Props> = ({handleCreate}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRecord>();

    const { request, error, isLoading } = useRequest();

    const onSubmit = handleSubmit(handleCreate);
    return (
        <form onSubmit={onSubmit} className="flex flex-col w-3/4 h-full justify-between ">
            <div>
                <label htmlFor="companySigDate" className="text-white text-sm">
                    Company Signature Date
                </label>
                <input
                    className="relative block w-full mb-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    type="datetime-local"
                    {...register("companySigDate", {
                        required: true,
                        setValueAs: (v) => {
                            if (v) {
                                return new Date(v).toISOString() + "\t";
                            }
                        },
                    })}
                />
            </div>

            <input
                className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                type="text"
                placeholder="Company Signature Name"
                {...register("companySignatureName", { required: true })}
            />
            <input
                className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                type="text"
                placeholder="Document Name"
                {...register("documentName", { required: true })}
            />
            <input
                className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                type="text"
                placeholder="Document Status"
                {...register("documentStatus", { required: true })}
            />
            <input
                className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                type="text"
                placeholder="Document Type"
                {...register("documentType", { required: true })}
            />
            <input
                className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                type="text"
                placeholder="Employee Number"
                {...register("employeeNumber", { required: true })}
            />
            <input
                className="relative block w-full my-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                type="text"
                placeholder="Employee Signature Name"
                {...register("employeeSignatureName", { required: true })}
            />

            <div>
                <label htmlFor="employeeSigDate" className="text-white text-sm">
                    Employee Signature Date
                </label>
                <input
                    className="relative block w-full mb-3 appearance-none rounded-md border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    type="datetime-local"
                    placeholder="Employee Signature Date"
                    {...register("employeeSigDate", {
                        required: true,
                        setValueAs: (v) => {
                            if (v) {
                                return new Date(v).toISOString() + "\t";
                            }
                        },
                    })}
                />
            </div>

            <input
                type="submit"
                className=" m-5 text-white font-semibold p-2 rounded-xl flex items-center justify-center bg-sky-500/60 highlight-white/20 hover:bg-sky-400"
            />
        </form>
    );
};
export default NewRecordForm;
