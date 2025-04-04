import { action, computed, makeObservable, observable } from 'mobx';
import { getRepoContributors } from 'api/api';
import { GetRepoContributorsParams } from 'api/types';
import { META, MetaValue } from 'config/meta';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { UserModel, normalizeUser } from 'store/models/api/user';

type PrivateFields = '_data' | '_meta' | '_isAllVisible' | '_maxShownCount';

class ContributorsStore<T extends string> implements ILocalStore {
  private _meta: MetaValue = META.initial;
  private _data: UserModel[] = [];
  private _isAllVisible: boolean = false;
  private _maxShownCount: number = 3;

  constructor() {
    makeObservable<ContributorsStore<T>, PrivateFields>(this, {
      _data: observable.ref,
      _meta: observable,
      _isAllVisible: observable,
      _maxShownCount: observable,
      data: computed,
      isError: computed,
      isLoading: computed,
      visibleItems: computed,
      isAllVisible: computed,
      hasHiddenItems: computed,
      toggleVisible: action,
      fetchData: action,
    });
  }

  get data() {
    return this._data;
  }

  get isError() {
    return this._meta === 'error';
  }

  get isLoading() {
    return this._meta === 'loading';
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
      this._meta = META.loading;
      this._data = [];
      const result = await getRepoContributors({ owner, repo });
      this._data = result.map(normalizeUser);
      this._meta = META.success;
    } catch {
      this._meta = META.error;
    }
  };

  destroy(): void {}
}

export default ContributorsStore;
