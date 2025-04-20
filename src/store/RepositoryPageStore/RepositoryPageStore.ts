import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getReadme, getSingleRepo } from 'api';
import MetaStore from 'store/MetaStore';
import { ILocalStore } from 'store/hooks';
import { normalizeRepo, RepoModel } from 'store/models/api';

type PrivateFields = '_orgName' | '_repoName' | '_repoData' | '_readme';

class RepositoryPageStore implements ILocalStore {
  private _orgName = '';
  private _repoName = '';
  private _repoData: RepoModel | null = null;
  private _readme: string | null = null;
  readonly metaStore = new MetaStore();

  constructor() {
    makeObservable<RepositoryPageStore, PrivateFields>(this, {
      _orgName: observable,
      _repoName: observable,
      _repoData: observable.ref,
      _readme: observable,
      orgName: computed,
      repoName: computed,
      repoData: computed,
      readme: computed,
      setOrgName: action,
      setRepoName: action,
      fetchRepo: action,
      fetchReadme: action,
      destroy: action,
    });
  }

  get orgName() {
    return this._orgName;
  }

  get repoName() {
    return this._repoName;
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

  fetchRepo = async () => {
    this.metaStore.updateMeta('loading');
    this._repoData = null;
    const response = await getSingleRepo({ owner: this._orgName, repo: this._repoName });

    runInAction(() => {
      if (response.success) {
        this._repoData = normalizeRepo(response.data);
        this.metaStore.updateMeta('success');
      } else {
        this.metaStore.updateMeta('error', response.errorMessage);
      }
    });
  };

  fetchReadme = async () => {
    this.metaStore.updateMeta('loading');
    this._readme = null;
    const response = await getReadme({ owner: this._orgName, repo: this._repoName });

    runInAction(() => {
      if (response.success) {
        this._readme = response.data;
        this.metaStore.updateMeta('success');
      }
    });
  };

  destroy = (): void => {
    this.metaStore.destroy();
    this._orgName = '';
    this._repoName = '';
    this._repoData = null;
    this._readme = null;
  };
}

export default RepositoryPageStore;
