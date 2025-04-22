import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getRepos } from 'api/api';
import { LS_KEY_REPOS } from 'config/localStorage';
import LocalStorageStore from 'store/LocalStorageStore';
import { ILocalStore } from 'store/hooks/useLocalStoreApp';
import { normalizeRepo, RepoModel } from 'store/models/api';
import { RepoModelLS } from 'store/models/ls';

type PrivateFields = '_dataLS' | '_repos';

class VisitedReposStore implements ILocalStore {
  private _dataLS: RepoModelLS[] = [];
  private _repos: RepoModel[] = [];
  readonly lsStore = new LocalStorageStore<RepoModelLS[]>(LS_KEY_REPOS);

  constructor() {
    makeObservable<VisitedReposStore, PrivateFields>(this, {
      _dataLS: observable.ref,
      _repos: observable.ref,
      repos: computed,
      data: computed,
      addRepoToLS: action,
      setLSData: action,
      fetchRepos: action,
      destroy: action,
    });

    this.setLSData();
  }

  setLSData = () => {
    const stored = this.lsStore.data;

    if (stored) {
      this._dataLS = stored;
    }
  };

  get data() {
    return this._dataLS;
  }

  get repos() {
    return this._repos;
  }

  addRepoToLS = (repo: RepoModel) => {
    const data = this.data;

    if (data.some((el) => el.repo === repo.name)) {
      return;
    }

    const repoLS = { owner: repo.owner.login, repo: repo.name };

    this._dataLS = [repoLS, ...data].slice(0, 5);

    this.lsStore.setData(this._dataLS);
  };

  fetchRepos = async () => {
    const response = await getRepos(this._dataLS);
    runInAction(() => {
      this._repos = response.data.map(normalizeRepo);
    });
  };

  destroy = (): void => {
    this._dataLS = [];
    this._repos = [];
  };
}

export default VisitedReposStore;
