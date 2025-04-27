import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getUserRepos } from 'api';
import MetaStore from 'store/MetaStore';
import { ILocalStore } from 'store/hooks/useLocalStoreApp';
import { normalizeRepo, RepoModel } from 'store/models/api';

type PrivateFields = '_data';

class UserRepoStore implements ILocalStore {
  private _data: RepoModel[] = [];
  readonly metaStore = new MetaStore();

  constructor() {
    makeObservable<UserRepoStore, PrivateFields>(this, {
      _data: observable.ref,
      data: computed,
      fetchData: action,
      destroy: action,
    });
  }

  get data() {
    return this._data;
  }

  fetchData = async (username: string) => {
    this.metaStore.updateMeta('loading');

    const response = await getUserRepos(username);

    runInAction(() => {
      if (response.success) {
        this._data = response.data.map((repo) => normalizeRepo(repo));
        this.metaStore.updateMeta('success');
      } else {
        this.metaStore.updateMeta('error');
      }
    });
  };

  destroy = (): void => {
    this.metaStore.destroy();
    this._data = [];
  };
}

export default UserRepoStore;
