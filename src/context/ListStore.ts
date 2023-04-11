import { makeAutoObservable } from "mobx";

export interface IRecord {
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
  _items: IRecord[];
  constructor() {
    this._items = [];
    makeAutoObservable(this);
  }

  setItems = (items: IRecord[]) => {
    this._items = items;
  };

  addItem = (item: IRecord) => {
    this._items= [...this._items, item]
  }

  updateItems = (items: IRecord[]) => {
    this._items = [...this._items.filter(i => items.findIndex(newItem => i.id === newItem.id)), ...items];
  };

  deleteItemById = (id: string) => {
    this._items = this._items.filter(i => i.id !== id);
  };

  get items() {
    return this._items;
  }
}  