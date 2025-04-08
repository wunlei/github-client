import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getRepoLanguages } from 'api/api';
import { GetRepoLanguagesParams, RepoLanguagesApi } from 'api/types';
import { META, MetaValue } from 'config/meta';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { getLangPercents } from 'utils/utils';

type PrivateFields = '_data' | '_meta';

class LanguagesStore implements ILocalStore {
  private _meta: MetaValue = META.initial;
  private _data: RepoLanguagesApi = {};

  constructor() {
    makeObservable<LanguagesStore, PrivateFields>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      dataFormatted: computed,
      isError: computed,
      isLoading: computed,
      fetchData: action,
    });
  }

  get data() {
    return this._data;
  }

  get dataFormatted() {
    return getLangPercents(this._data);
  }

  get isError() {
    return this._meta === 'error';
  }

  get isLoading() {
    return this._meta === 'loading';
  }

  fetchData = async ({ owner, repo }: GetRepoLanguagesParams) => {
    try {
      this._meta = META.loading;
      const data = await getRepoLanguages({ owner, repo });
      runInAction(() => {
        this._data = data;
        this._meta = META.success;
      });
    } catch {
      this._meta = META.error;
    }
  };

  destroy(): void {
    this._meta = META.initial;
    this._data = {};
  }
}

export default LanguagesStore;
