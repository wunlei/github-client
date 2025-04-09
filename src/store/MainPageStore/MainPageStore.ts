import { action, makeObservable, observable, computed, runInAction } from 'mobx';
import { getReposByOrg } from 'api/api';
import { repositoryTypes, RepositoryTypes } from 'config/repositoryTypes';
import FilterStore from 'store/FilterStore';
import MetaStore from 'store/MetaStore';
import PaginationStore from 'store/PaginationStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { normalizeRepo, RepoModel } from 'store/models/api/repo';

type PrivateFields = '_meta' | '_repos' | '_orgName';

class MainPageStore implements ILocalStore {
  readonly metaStore = new MetaStore();
  private _orgName = '';
  private _repos: RepoModel[] = [];
  readonly paginationStore = new PaginationStore<RepoModel>();
  readonly filterStore = new FilterStore<RepositoryTypes>(repositoryTypes[0], repositoryTypes);

  constructor() {
    makeObservable<MainPageStore, PrivateFields>(this, {
      _meta: observable,
      _repos: observable.ref,
      _orgName: observable,
      orgName: computed,
      repos: computed,
      totalPages: computed,
      fetchRepos: action,
      setOrgName: action,
    });
  }

  get orgName() {
    return this._orgName;
  }

  get repos() {
    return this._repos;
  }

  get totalPages() {
    return Math.ceil(this._repos.length / this.paginationStore.perPage);
  }

  fetchRepos = async () => {
    try {
      this.metaStore.updateMeta('loading');
      this._repos = [];
      const result = await getReposByOrg({ org: this._orgName.trim(), type: this.filterStore.currValue });
      runInAction(() => {
        this._repos = result.map(normalizeRepo);
        this.paginationStore.setItems(this._repos);
        this.metaStore.updateMeta('success');
      });
    } catch {
      this.metaStore.updateMeta('error');
    }
  };

  setOrgName = (e: string) => {
    this._orgName = e;
  };

  destroy(): void {
    this.metaStore.destroy();
    this._orgName = '';
    this._repos = [];
    this.filterStore.destroy();
    this.paginationStore.destroy();
  }
}

export default MainPageStore;
