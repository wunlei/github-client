import { makeObservable, observable, computed, action } from 'mobx';
import { META, MetaKey, MetaValue } from 'config/meta';
import { ILocalStore } from 'store/hooks';

type PrivateFields = '_meta' | '_errorMessage';

class MetaStore implements ILocalStore {
  private _meta: MetaValue = META.initial;
  private _errorMessage: string | null = null;

  constructor() {
    makeObservable<MetaStore, PrivateFields>(this, {
      _meta: observable,
      _errorMessage: observable,
      isError: computed,
      isLoading: computed,
      isSuccess: computed,
      isInitial: computed,
      updateMeta: action,
      destroy: action,
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

  get errorMessage() {
    return this._errorMessage;
  }

  updateMeta = (state: MetaKey, errorMessage: string | null = null) => {
    this._meta = META[state];
    this._errorMessage = errorMessage;
  };

  destroy = (): void => {
    this._meta = META.initial;
    this._errorMessage = null;
  };
}

export default MetaStore;
