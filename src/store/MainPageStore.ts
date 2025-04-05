import { action, makeObservable, observable, computed, runInAction } from 'mobx';
import { getReposByOrg } from 'api/api';
import { META, MetaValue } from 'config/meta';
import { repositoryTypes, RepositoryTypes } from 'config/repositoryTypes';
import FilterStore from 'store/FilterStore';
import PaginationStore from 'store/PaginationStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { normalizeRepo, RepoModel } from 'store/models/api/repo';

type PrivateFields = '_meta' | '_repos' | '_orgName';

class MainPageStore implements ILocalStore {
  private _meta: MetaValue = META.initial;
  private _orgName = '';
  private _repos: RepoModel[] = [];
  private readonly _paginationStore = new PaginationStore<RepoModel>();
  private readonly _filterStore = new FilterStore<RepositoryTypes>(repositoryTypes[0], repositoryTypes);

  constructor() {
    makeObservable<MainPageStore, PrivateFields>(this, {
      _meta: observable,
      _repos: observable.ref,
      _orgName: observable,
      paginatedRepos: computed,
      reposOnCurrPage: computed,
      isError: computed,
      isLoading: computed,
      currPageNum: computed,
      typeFilter: computed,
      filterOptions: computed,
      filterSelectedOption: computed,
      orgName: computed,
      repos: computed,
      totalPages: computed,
      perPage: computed,
      fetchRepos: action,
      setTypeFilter: action,
      setOrgName: action,
      setCurrPage: action,
      setPerPage: action,
    });
  }

  get paginatedRepos() {
    return this._paginationStore.paginatedRepos;
  }

  get reposOnCurrPage() {
    return this._paginationStore.currPageItems;
  }

  get isError() {
    return this._meta === 'error';
  }

  get isLoading() {
    return this._meta === 'loading';
  }

  get currPageNum() {
    return this._paginationStore.currPageNum;
  }

  get typeFilter() {
    return this._filterStore.currValue;
  }

  get filterOptions() {
    return this._filterStore.options;
  }

  get filterSelectedOption() {
    return this._filterStore.selectedOption;
  }

  get orgName() {
    return this._orgName;
  }

  get repos() {
    return this._repos;
  }

  get totalPages() {
    return Math.ceil(this._repos.length / this.perPage);
  }

  get perPage() {
    return this._paginationStore.perPage;
  }

  fetchRepos = async () => {
    try {
      this._meta = META.loading;
      this._repos = [];
      const result = await getReposByOrg({ org: this._orgName.trim(), type: this._filterStore.currValue });
      runInAction(() => {
        this._repos = result.map(normalizeRepo);
        this._paginationStore.setItems(this._repos);
        this._meta = META.success;
      });
    } catch {
      this._meta = META.error;
    }
  };

  setTypeFilter = (type: string | RepositoryTypes) => {
    this._filterStore.setValue(type);
  };

  setOrgName = (e: string) => {
    this._orgName = e;
  };

  setCurrPage = (n: number) => {
    this._paginationStore.setCurrPage(n);
  };

  setPerPage = (n: number) => {
    this._paginationStore.setPerPage(n);
  };

  destroy(): void {}
}

export default MainPageStore;
