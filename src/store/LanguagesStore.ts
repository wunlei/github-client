import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getRepoLanguages } from 'api';
import { GetRepoLanguagesParams, RepoLanguagesApi } from 'api/types';
import MetaStore from 'store/MetaStore';
import { ILocalStore } from 'store/hooks';
import { getLangPercents } from 'utils';

type PrivateFields = '_data';

class LanguagesStore implements ILocalStore {
  private _data: RepoLanguagesApi = {};
  readonly metaStore = new MetaStore();

  constructor() {
    makeObservable<LanguagesStore, PrivateFields>(this, {
      _data: observable.ref,
      data: computed,
      dataFormatted: computed,
      fetchData: action,
      destroy: action,
    });
  }

  get data() {
    return this._data;
  }

  get dataFormatted() {
    return getLangPercents(this._data);
  }

  fetchData = async ({ owner, repo }: GetRepoLanguagesParams) => {
    this.metaStore.updateMeta('loading');
    const response = await getRepoLanguages({ owner, repo });

    runInAction(() => {
      if (response.success) {
        this._data = response.data;
        this.metaStore.updateMeta('success');
      } else {
        this.metaStore.updateMeta('error');
      }
    });
  };

  destroy = (): void => {
    this.metaStore.destroy();
    this._data = {};
  };
}

export default LanguagesStore;
