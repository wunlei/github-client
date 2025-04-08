import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Dropdown from 'components/Dropdown';
import { useMainPageStore } from 'store/MainPageStore/';
import { TypesDropdownProps } from './TypesDropdown.types';

const TypeDropdown: React.FC<TypesDropdownProps> = observer(({ className, onChange }) => {
  const store = useMainPageStore();
  const { filterOptions, filterSelectedOption } = store;

  return <Dropdown className={className} options={filterOptions} value={filterSelectedOption} onChange={onChange} />;
});

export default TypeDropdown;
