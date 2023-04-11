import { FC, useContext } from "react";
import { Row } from "react-table";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useRequest } from "../hooks/useRequest";
import { ListContext, UserContext } from "../context";
import { observer } from "mobx-react-lite";
import UpdateButton from "./UpdateButton";
import { IData } from "../pages/TablePage";

export enum IActions {
    create = "create",
    delete = "delete",
}

type Props = {
    selectedUsers: Row<IData>[];
    // setIsLoading: (condition: boolean) => void
};

const ToolBar: FC<Props> = observer(({ selectedUsers }) => {
    const list = useContext(ListContext);
    const user = useContext(UserContext);
    const { request, isLoading } = useRequest();

    const handleDelete = () => {
        selectedUsers.forEach((i) =>
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
        <div className="h-24 w-full flex justify-start items-end">
            {/* <UpdateButton name={IActions.create} isDisabled={isLoading || selectedUsers.length === 0} clickHandler={clickHandler}/> */}
            <UpdateButton
                name={IActions.delete}
                isDisabled={isLoading || selectedUsers.length === 0}
                clickHandler={handleDelete}
            >
                <TrashIcon className="h-6 w-6" />
            </UpdateButton>
        </div>
    );
});
export default ToolBar;
