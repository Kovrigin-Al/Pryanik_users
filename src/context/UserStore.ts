import { makeAutoObservable } from "mobx";

export default class UserStore {
    _isAuth: boolean;
    _token: string;

    constructor() {
        this._isAuth = false;
        this._token = '';
        makeAutoObservable(this);
    }

    setIsAuth(state: boolean) {
        this._isAuth = state;
    }

    get isAuth() {
        return this._isAuth;
    }

    setToken(token: string) {
        this._token = token;
    }

    get token() {
        return this._token;
    }
}
