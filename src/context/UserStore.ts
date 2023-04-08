import { makeAutoObservable } from "mobx";

export default class UserStore {
    _isAuth: boolean;

    constructor() {
        this._isAuth = false;
        makeAutoObservable(this);
    }

    setIsAuth(state: boolean) {
        this._isAuth = state;
    }

    get isAuth() {
        return this._isAuth;
    }
}
