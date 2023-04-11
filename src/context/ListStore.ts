import { makeAutoObservable } from "mobx";

export interface IUser {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
}

export default class ListStore {
  _items: IUser[];
  constructor() {
    this._items = [];
    makeAutoObservable(this);
  }

  setItems = (items: IUser[]) => {
    this._items = items;
  };

  updateItems = (items: IUser[]) => {
    this._items = [...this._items.filter(i => items.findIndex(newItem => i.id === newItem.id)), ...items];
  };

  deleteItemById = (id: string) => {
    this._items = this._items.filter(i => i.id !== id);
  };

  get items() {
    return this._items;
  }
}  