import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getRepoLanguages } from 'api/api';
import { GetRepoLanguagesParams, RepoLanguagesApi } from 'api/types';
import MetaStore from 'store/MetaStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { getLangPercents } from 'utils/utils';

type PrivateFields = '_data';

class LanguagesStore implements ILocalStore {
  readonly metaStore = new MetaStore();
  private _data: RepoLanguagesApi = {};

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
    try {
      this.metaStore.updateMeta('loading');

      const data = await getRepoLanguages({ owner, repo });
      runInAction(() => {
        this._data = data;
        this.metaStore.updateMeta('success');
      });
    } catch {
      this.metaStore.updateMeta('error');
    }
  };

  destroy(): void {
    this.metaStore.destroy();
    this._data = {};
  }
}

export default LanguagesStore;
