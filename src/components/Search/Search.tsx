import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import SearchIcon from 'components/icons/SearchIcon';
import { SearchProps } from './Search.types';
import s from './Search.module.scss';

const Search: React.FC<SearchProps> = ({ value, placeholder, handleSearch }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.target instanceof HTMLInputElement) {
        handleSearch(e.target.value);
      }
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={s.inputWrapper}>
      <Input
        placeholder={placeholder}
        className={s.input}
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={handleEnter}
      />

      <Button onClick={() => handleSearch(inputValue)}>
        <SearchIcon className={s.btnIcon} />
      </Button>
    </div>
  );
};

export default memo(Search);
