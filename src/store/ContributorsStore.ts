import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getRepoContributors } from 'api/api';
import { GetRepoContributorsParams } from 'api/types';
import MetaStore from 'store/MetaStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { UserModel, normalizeUser } from 'store/models/api/user';

type PrivateFields = '_data' | '_isAllVisible' | '_maxShownCount';

class ContributorsStore implements ILocalStore {
  readonly metaStore = new MetaStore();
  private _data: UserModel[] = [];
  private _isAllVisible: boolean = false;
  private _maxShownCount: number = 3;

  constructor() {
    makeObservable<ContributorsStore, PrivateFields>(this, {
      _data: observable.ref,
      _isAllVisible: observable,
      _maxShownCount: observable,
      data: computed,
      visibleItems: computed,
      isAllVisible: computed,
      hasHiddenItems: computed,
      toggleVisible: action,
      fetchData: action,
      destroy: action,
    });
  }

  get data() {
    return this._data;
  }

  get visibleItems() {
    if (this._isAllVisible) {
      return this._data;
    }
    return this._data.slice(0, this._maxShownCount);
  }

  get isAllVisible() {
    return this._isAllVisible;
  }

  get hasHiddenItems() {
    return this._data.length > this._maxShownCount;
  }

  toggleVisible = () => {
    this._isAllVisible = !this._isAllVisible;
  };

  fetchData = async ({ owner, repo }: GetRepoContributorsParams) => {
    try {
      this.metaStore.updateMeta('loading');
      this._data = [];
      const result = await getRepoContributors({ owner, repo });
      runInAction(() => {
        this._data = result.map(normalizeUser);
        this.metaStore.updateMeta('success');
      });
    } catch {
      this.metaStore.updateMeta('error');
    }
  };

  destroy(): void {
    this.metaStore.destroy();
    this._data = [];
    this._isAllVisible = false;
    this._maxShownCount = 3;
  }
}

export default ContributorsStore;
