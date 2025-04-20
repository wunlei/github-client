import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'store/hooks';

type PrivateFields = '_currValue' | '_filterValues';

class FilterStore<T extends string> implements ILocalStore {
  private _currValue: T;
  private _filterValues: readonly T[];

  constructor(defaultValue: T, filterValues: readonly T[]) {
    this._currValue = defaultValue;
    this._filterValues = filterValues;

    makeObservable<FilterStore<T>, PrivateFields>(this, {
      _currValue: observable,
      _filterValues: observable.ref,
      currValue: computed,
      options: computed,
      selectedOption: computed,
      setValue: action,
      reset: action,
      destroy: action,
    });
  }

  get currValue(): T {
    return this._currValue;
  }

  get options() {
    return this._filterValues.map((v) => ({ key: v, value: v }));
  }

  get selectedOption() {
    return { key: this._currValue, value: this._currValue };
  }

  setValue = (val: string | T) => {
    if (val && this._filterValues.includes(val as T)) {
      this._currValue = val as T;
      return;
    }
    this._currValue = this._filterValues[0];
  };

  reset = () => {
    this._currValue = this._filterValues[0];
  };

  destroy = (): void => {
    this._currValue = this._filterValues[0];
  };
}

export default FilterStore;
