import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import TransitionChildOpacity from "./TransitionChildOpacity";
import NewRecordForm from "./NewRecordForm";
import {XMarkIcon} from '@heroicons/react/24/outline'
import { IRecord } from "../../context/ListStore";
interface Props {
    isOpen: boolean;
    closeModal: () => void;
    handleCreate: (newRecord: IRecord)=>void
}

export const NewRecordModal: FC<Props> = ({ isOpen, closeModal, handleCreate }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChildOpacity>
                        <div className="fixed inset-0 bg-gray-800 backdrop-blur-sm backdrop-filter  bg-opacity-80" />
                    </TransitionChildOpacity>

                    <div className="fixed inset-0  overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChildOpacity>
                                <Dialog.Panel className="w-full transform h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 p-2 sm:p-6  md:mx-20 text-left align-middle transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="text-xl pl-5 sm:text-2xl font-medium leading-6 text-sky-500/90 sm:mb-4 mb-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            Create new record
                                            <button
                                                type="button"
                                                className=" mx-4  text-white font-semibold p-2 rounded-xl flex items-center justify-center bg-sky-500/20 highlight-white/20 hover:bg-sky-400"
                                                onClick={closeModal}
                                            >
                                                <XMarkIcon className="h-6 w-6 text-white" />
                                            </button>
                                        </div>
                                        <div className="bg-sky-700 py-[2px] mt-2 "></div>
                                    </Dialog.Title>

                                    <div className="pl-5 flex justify-center">
                                        <NewRecordForm handleCreate={handleCreate}/>
                                    </div>
                                </Dialog.Panel>
                            </TransitionChildOpacity>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
