import { action, computed, makeObservable, observable } from 'mobx';
import { getRepoLanguages } from 'api/api';
import { GetRepoLanguagesParams, RepoLanguagesApi } from 'api/types';
import { META, MetaValue } from 'config/meta';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { getLangPercents } from 'utils/utils';

type PrivateFields = '_data' | '_meta';

class LanguagesStore<T extends string> implements ILocalStore {
  private _meta: MetaValue = META.initial;
  private _data: RepoLanguagesApi = {};

  constructor() {
    makeObservable<LanguagesStore<T>, PrivateFields>(this, {
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
      this._data = {};
      this._data = await getRepoLanguages({ owner, repo });
      this._meta = META.success;
    } catch {
      this._meta = META.error;
    }
  };

  destroy(): void {}
}

export default LanguagesStore;
