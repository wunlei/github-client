import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getReadme, getSingleRepo } from 'api/api';
import MetaStore from 'store/MetaStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { normalizeRepo, RepoModel } from 'store/models/api/repo';

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
      fetchReadme: action,
      fetchRepo: action,
      destroy: action,
    });
  }

  fetchRepo = async () => {
    try {
      this.metaStore.updateMeta('loading');
      this._repoData = null;
      const result = await getSingleRepo({ owner: this._orgName, repo: this._repoName });
      runInAction(() => {
        this._repoData = normalizeRepo(result);
        this.metaStore.updateMeta('success');
      });
    } catch {
      this.metaStore.updateMeta('error');
    }
  };

  fetchReadme = async () => {
    try {
      this.metaStore.updateMeta('loading');
      this._readme = null;
      const result = await getReadme({ owner: this._orgName, repo: this._repoName });
      runInAction(() => {
        this._readme = result;
        this.metaStore.updateMeta('success');
      });
    } catch {
      this.metaStore.updateMeta('error');
    }
  };

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

  destroy(): void {
    this.metaStore.destroy();
    this._orgName = '';
    this._repoName = '';
    this._repoData = null;
    this._readme = null;
  }
}

export default RepositoryPageStore;
