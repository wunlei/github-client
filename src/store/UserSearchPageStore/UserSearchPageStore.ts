import { action, makeObservable, observable, computed, runInAction } from 'mobx';
import { searchUsers } from 'api';
import MetaStore from 'store/MetaStore';
import PaginationStore from 'store/PaginationStore';
import { ILocalStore } from 'store/hooks/useLocalStoreApp';
import { normalizeSearchUser, SearchUserModel } from 'store/models/api/searchUser';

type PrivateFields = '_users' | '_username';

class UserSearchPageStore implements ILocalStore {
  private _username = '';
  private _users: SearchUserModel[] = [];
  readonly metaStore = new MetaStore();
  readonly paginationStore = new PaginationStore<SearchUserModel>();

  constructor() {
    makeObservable<UserSearchPageStore, PrivateFields>(this, {
      _username: observable,
      _users: observable.ref,
      username: computed,
      users: computed,
      totalPages: computed,
      setUsername: action,
      fetchUsers: action,
      destroy: action,
    });
  }

  get username() {
    return this._username;
  }

  get users() {
    return this._users;
  }

  get totalPages() {
    return Math.ceil(this._users.length / this.paginationStore.perPage);
  }

  setUsername = (e: string) => {
    this._username = e;
  };

  fetchUsers = async () => {
    this.metaStore.updateMeta('loading');
    this._users = [];
    const response = await searchUsers(encodeURIComponent(this._username));

    runInAction(() => {
      if (response.success) {
        this._users = response.data.items.map(normalizeSearchUser);
        this.paginationStore.setItems(this._users);
        this.metaStore.updateMeta('success');
      } else {
        this.metaStore.updateMeta('error', response.errorMessage);
      }
    });
  };

  destroy = (): void => {
    this.metaStore.destroy();
    this.paginationStore.destroy();
    this._username = '';
    this._users = [];
  };
}

export default UserSearchPageStore;
