import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getReadme, getSingleRepo } from 'api/api';
import { MetaValue, META } from 'config/meta';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { normalizeRepo, RepoModel } from 'store/models/api/repo';

type PrivateFields = '_meta' | '_orgName' | '_repoName' | '_repoData' | '_readme';

class RepositoryPageStore implements ILocalStore {
  private _meta: MetaValue = META.initial;
  private _orgName = '';
  private _repoName = '';
  private _repoData: RepoModel | null = null;
  private _readme: string | null = null;

  constructor() {
    makeObservable<RepositoryPageStore, PrivateFields>(this, {
      _meta: observable,
      _orgName: observable,
      _repoName: observable,
      _repoData: observable.ref,
      _readme: observable,
      orgName: computed,
      repoName: computed,
      isError: computed,
      isLoading: computed,
      repoData: computed,
      readme: computed,
      setOrgName: action,
      setRepoName: action,
      fetchReadme: action,
      fetchRepo: action,
    });
  }

  fetchRepo = async () => {
    try {
      this._meta = META.loading;
      this._repoData = null;
      const result = await getSingleRepo({ owner: this._orgName, repo: this._repoName });
      runInAction(() => {
        this._repoData = normalizeRepo(result);
        this._meta = META.success;
      });
    } catch {
      this._meta = META.error;
    }
  };

  fetchReadme = async () => {
    try {
      this._meta = META.loading;
      this._readme = null;
      const result = await getReadme({ owner: this._orgName, repo: this._repoName });
      runInAction(() => {
        this._readme = result;
        this._meta = META.success;
      });
    } catch {
      this._meta = META.error;
    }
  };

  get orgName() {
    return this._orgName;
  }

  get repoName() {
    return this._repoName;
  }

  get isError() {
    return this._meta === 'error';
  }

  get isLoading() {
    return this._meta === 'loading';
  }

  get repoData() {
    return this._repoData;
  }

  get readme() {
    return this._readme;
  }

  setOrgName = (e: string) => {
    this._orgName = e;
  };

  setRepoName = (e: string) => {
    this._repoName = e;
  };

  destroy(): void {
    this._meta = META.initial;
    this._orgName = '';
    this._repoName = '';
    this._repoData = null;
    this._readme = null;
  }
}

export default RepositoryPageStore;
