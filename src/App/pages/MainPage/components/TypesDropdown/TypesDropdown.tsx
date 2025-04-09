import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Dropdown from 'components/Dropdown';
import { Option } from 'components/Dropdown/Dropdown.types';
import { useMainPageStore } from 'store/MainPageStore/';
import { TypesDropdownProps } from './TypesDropdown.types';

const TypeDropdown: React.FC<TypesDropdownProps> = observer(({ className, onChange }) => {
  const store = useMainPageStore();
  const { options, selectedOption, setValue } = store.filterStore;

  const handleTypeChange = (option: Option) => {
    setValue(option.key);
    onChange(option);
  };

  return <Dropdown className={className} options={options} value={selectedOption} onChange={handleTypeChange} />;
});

export default TypeDropdown;
