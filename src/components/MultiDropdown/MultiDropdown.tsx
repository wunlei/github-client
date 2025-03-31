import c from 'classnames';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState , memo } from 'react';
import Input from 'components/Input';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { MultiDropdownProps, Option } from './MultiDropdown.types';
import s from './MultiDropdown.module.scss';

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, value, disabled, onChange, getTitle, className }) => {
  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedKeys = useMemo(() => new Set(value.map((e) => e.key)), [value]);

  const filteredOptions = useMemo(
    () => options.filter((el) => el.value.toLowerCase().includes(filter)),
    [options, filter],
  );

  const handleClickOption = (option: Option) => {
    if (selectedKeys.has(option.key)) {
      onChange(value.filter((e) => e !== option));
      return;
    }

    onChange(value.concat(option));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node && !containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const inputValue = useMemo(() => {
    if (isOpen) {
      return filter;
    }

    if (value.length) {
      return getTitle(value);
    }

    return '';
  }, [filter, getTitle, isOpen, value]);

  return (
    <div ref={containerRef} className={s.container}>
      <Input
        ref={inputRef}
        value={inputValue}
        className={className}
        disabled={disabled}
        placeholder={getTitle(value)}
        afterSlot={
          <ArrowDownIcon
            color="secondary"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              }
            }}
          />
        }
        onChange={(v: string) => {
          setFilter(v.toLowerCase());
        }}
        onClick={() => {
          if (isOpen) {
            return;
          }

          setIsOpen((v) => !v);
        }}
      />

      {isOpen && !disabled && (
        <ul className={s.options}>
          {filteredOptions.map((option) => (
            <li
              key={option.key}
              className={c(s.option, selectedKeys.has(option.key) && s.optionSelected)}
              onClick={() => {
                handleClickOption(option);
              }}
            >
              <Typography view="p-16" tag="span">
                {option.value}
              </Typography>
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className={s.option}>
              <Typography view="p-16" tag="span">
                No results
              </Typography>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default memo(MultiDropdown);
