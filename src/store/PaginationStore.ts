import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { paginateArray } from 'utils/utils';

type PrivateFields = '_items' | '_currPageNum' | '_perPage';

class PaginationStore<T> implements ILocalStore {
  private _items: T[] = [];
  private _currPageNum = 1;
  private _perPage = 9;

  constructor() {
    makeObservable<PaginationStore<T>, PrivateFields>(this, {
      _items: observable.ref,
      _currPageNum: observable,
      _perPage: observable,
      paginatedRepos: computed,
      currPageItems: computed,
      currPageNum: computed,
      items: computed,
      totalPages: computed,
      perPage: computed,
      setCurrPage: action,
      setPerPage: action,
      setItems: action,
    });
  }

  get paginatedRepos() {
    return paginateArray(this._items, this.perPage);
  }

  get currPageItems() {
    return this.paginatedRepos[this._currPageNum - 1] || [];
  }

  get currPageNum() {
    return this._currPageNum;
  }

  get items() {
    return this._items;
  }

  get totalPages() {
    return Math.ceil(this._items.length / this.perPage);
  }

  get perPage() {
    return this._perPage;
  }

  setCurrPage = (n: number) => {
    this._currPageNum = n;
  };

  setPerPage = (n: number) => {
    this._perPage = n;
  };

  setItems = (items: T[]) => {
    this._items = items;
    if (this.totalPages < this._currPageNum) {
      this._currPageNum = 1;
    }
  };

  destroy(): void {
    this._items = [];
    this._currPageNum = 1;
    this._perPage = 9;
  }
}

export default PaginationStore;
