import { action, makeObservable, observable, computed, runInAction } from 'mobx';
import { getReposByOrg } from 'api';
import { RepositoryTypes, repositoryTypes } from 'config/repositoryTypes';
import FilterStore from 'store/FilterStore';
import MetaStore from 'store/MetaStore';
import PaginationStore from 'store/PaginationStore';
import VisitedReposStore from 'store/VisitedReposStore';
import { ILocalStore } from 'store/hooks';
import { RepoModel, normalizeRepo } from 'store/models/api';

type PrivateFields = '_repos' | '_orgName';

class MainPageStore implements ILocalStore {
  private _orgName = '';
  private _repos: RepoModel[] = [];
  readonly metaStore = new MetaStore();
  readonly paginationStore = new PaginationStore<RepoModel>();
  readonly filterStore = new FilterStore<RepositoryTypes>(repositoryTypes[0], repositoryTypes);
  readonly visitedReposStore = new VisitedReposStore();

  constructor() {
    makeObservable<MainPageStore, PrivateFields>(this, {
      _orgName: observable,
      _repos: observable.ref,
      orgName: computed,
      repos: computed,
      totalPages: computed,
      setOrgName: action,
      fetchRepos: action,
      destroy: action,
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

  setOrgName = (e: string) => {
    this._orgName = e;
  };

  fetchRepos = async () => {
    this.metaStore.updateMeta('loading');
    this._repos = [];
    const response = await getReposByOrg({ org: this._orgName.trim(), type: this.filterStore.currValue });

    runInAction(() => {
      if (response.success) {
        this._repos = response.data.map(normalizeRepo);
        this.paginationStore.setItems(this._repos);
        this.metaStore.updateMeta('success');
      } else {
        this.metaStore.updateMeta('error', response.errorMessage);
      }
    });
  };

  destroy = (): void => {
    this.metaStore.destroy();
    this.filterStore.destroy();
    this.paginationStore.destroy();
    this._orgName = '';
    this._repos = [];
  };
}

export default MainPageStore;
