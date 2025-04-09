import { makeObservable, observable, computed, action } from 'mobx';
import { META, MetaKey, MetaValue } from 'config/meta';
import { ILocalStore } from 'store/hooks/useLocalStore';

type PrivateFields = '_meta';

class MetaStore implements ILocalStore {
  private _meta: MetaValue = META.initial;

  constructor() {
    makeObservable<MetaStore, PrivateFields>(this, {
      _meta: observable,
      isError: computed,
      isLoading: computed,
      isSuccess: computed,
      isInitial: computed,
      updateMeta: action,
    });
  }

  get isError() {
    return this._meta === 'error';
  }

  get isLoading() {
    return this._meta === 'loading';
  }

  get isSuccess() {
    return this._meta === 'success';
  }

  get isInitial() {
    return this._meta === 'initial';
  }

  updateMeta(state: MetaKey) {
    this._meta = META[state];
  }

  destroy(): void {
    this._meta = META.initial;
  }
}

export default MetaStore;
