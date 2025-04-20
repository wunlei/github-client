import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getUser } from 'api';
import MetaStore from 'store/MetaStore';
import VisitedUsersStore from 'store/VisitedUsersStore';
import { ILocalStore } from 'store/hooks/useLocalStoreApp';
import { normalizeUser, UserModel } from 'store/models/api';

type PrivateFields = '_username' | '_data';

class UserPageStore implements ILocalStore {
  private _username = '';
  private _data: UserModel | null = null;
  readonly metaStore = new MetaStore();
  readonly visitedUsersStore = new VisitedUsersStore();

  constructor() {
    makeObservable<UserPageStore, PrivateFields>(this, {
      _username: observable,
      _data: observable.ref,
      data: computed,
      setUsername: action,
      fetchUser: action,
      destroy: action,
    });
  }

  get data() {
    return this._data;
  }

  setUsername = (s: string) => {
    this._username = s.trim();
  };

  fetchUser = async () => {
    this.metaStore.updateMeta('loading');
    this._data = null;

    const response = await getUser(this._username);
    runInAction(() => {
      if (response.success) {
        this._data = normalizeUser(response.data);
        this.metaStore.updateMeta('success');
        this.visitedUsersStore.addUser(this._data);
      } else {
        this.metaStore.updateMeta('error', response.errorMessage);
      }
    });
  };

  destroy = (): void => {
    this.metaStore.destroy();
    this._username = '';
    this._data = null;
  };
}

export default UserPageStore;
