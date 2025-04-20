import { action, computed, makeObservable, observable } from 'mobx';
import { LS_KEY_REPOS } from 'config/localStorage';
import LocalStorageStore from 'store/LocalStorageStore';
import { ILocalStore } from 'store/hooks/useLocalStoreApp';
import { LSRepoModel, normalizeLSRepo, RepoModel } from 'store/models/api';

type PrivateFields = '_data';

class VisitedReposStore implements ILocalStore {
  private _data: RepoModel[] = [];
  readonly lsStore = new LocalStorageStore<LSRepoModel[]>(LS_KEY_REPOS);

  constructor() {
    makeObservable<VisitedReposStore, PrivateFields>(this, {
      _data: observable.ref,
      data: computed,
      addRepo: action,
      destroy: action,
    });
  }

  get data() {
    const stored = this.lsStore.data;

    if (stored) {
      this._data = stored.map(normalizeLSRepo);
    }

    return this._data;
  }

  addRepo = (repo: RepoModel) => {
    const data = this.data;
    if (data.some((el) => el.id === repo.id)) {
      return;
    }

    this._data = [repo, ...data].slice(0, 5);

    const lsData = this._data.map((repo) => ({
      ...repo,
      updatedAt: repo.updatedAt.toISOString(),
    }));

    this.lsStore.setData(lsData);
  };

  destroy = (): void => {
    this._data = [];
  };
}

export default VisitedReposStore;
