import { FC, useContext, useState } from "react";
import { Row } from "react-table";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useRequest } from "../../hooks/useRequest";
import { ListContext, UserContext } from "../../context";
import { observer } from "mobx-react-lite";
import UpdateButton from "./UpdateButton";
import { NewRecordModal } from "../newRecordModal/NewRecordModal";
import { IRecord } from "../../context/ListStore";
import { useAuth } from "../../hooks/useAuth";

export enum IActions {
    create = "create",
    delete = "delete",
}

type Props = {
    selectedRecords: Row<IRecord>[];
};

const ToolBar: FC<Props> = observer(({ selectedRecords }) => {
    const list = useContext(ListContext);
    const user = useContext(UserContext);
    const { request, isLoading } = useRequest();
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleCreate = (newRecord: IRecord) => {
        request("/ru/data/v3/testmethods/docs/userdocs/create", "POST", newRecord, {
            "x-auth": user.token,
        })
            .then((response) => {
                if (response.error_code === 0) {
                    list.addItem(response.data);
                } else {
                    throw Error();
                }
            })
            .then(() => closeModal());
    };

    const handleDelete = () => {
        selectedRecords.forEach((i) =>
            request(
                `/ru/data/v3/testmethods/docs/userdocs/delete/${i.original.id}`,
                "DELETE",
                null,
                {
                    "x-auth": user.token,
                }
            ).then((response) => {
                if (response.error_code === 0) {
                    list.deleteItemById(i.original.id);
                }
            })
        );
    };
    return (
        <div className="h-12 w-full flex justify-start items-end">
            <button
                className=" bg-sky-600 hover:bg-sky-700  w-20 flex mx-1 items-center justify-center rounded-xl border border-transparent  p-2 text-base font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2"
                onClick={logout}
            >
                logout
            </button>
            <UpdateButton
                name={IActions.create}
                isDisabled={isLoading}
                clickHandler={openModal}
            />
            <UpdateButton
                name={IActions.delete}
                isDisabled={isLoading || selectedRecords.length === 0}
                clickHandler={handleDelete}
            >
                <TrashIcon className="h-6 w-6" />
            </UpdateButton>
            <NewRecordModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleCreate={handleCreate}
            />
        </div>
    );
});
export default ToolBar;
