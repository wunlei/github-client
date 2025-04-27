import { action, computed, makeObservable, observable } from 'mobx';
import { LS_KEY_USERS } from 'config/localStorage';
import LocalStorageStore from 'store/LocalStorageStore';
import { ILocalStore } from 'store/hooks/useLocalStoreApp';
import { UserModelLS } from 'store/models/ls/user';

type PrivateFields = '_data';

class VisitedUsersStore implements ILocalStore {
  private _data: UserModelLS[] = [];
  readonly lsStore = new LocalStorageStore<UserModelLS[]>(LS_KEY_USERS);

  constructor() {
    makeObservable<VisitedUsersStore, PrivateFields>(this, {
      _data: observable.ref,
      data: computed,
      addUser: action,
      destroy: action,
    });
  }

  get data() {
    const stored = this.lsStore.data;

    if (stored) {
      this._data = stored;
    }

    return this._data;
  }

  addUser = (user: UserModelLS) => {
    const data = this.data;
    if (data.some((el) => el.login === user.login)) {
      return;
    }

    this._data = [user, ...data].slice(0, 5);

    this.lsStore.setData(this._data);
  };

  destroy = (): void => {
    this._data = [];
  };
}

export default VisitedUsersStore;
