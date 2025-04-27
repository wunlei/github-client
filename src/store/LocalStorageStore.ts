import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_data';

class LocalStorageStore<T> {
  private _data: T | null = null;
  private _key: string;

  constructor(key: string) {
    makeObservable<LocalStorageStore<T>, PrivateFields>(this, {
      _data: observable.ref,
      data: computed,
      setData: action,
    });
    this._key = key;

    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        this._data = JSON.parse(stored) as T;
      } catch {
        this._data = null;
      }
    }
  }

  get data(): T | null {
    return this._data;
  }

  setData = (data: T) => {
    this._data = data;
    localStorage.setItem(this._key, JSON.stringify(data));
  };
}

export default LocalStorageStore;
