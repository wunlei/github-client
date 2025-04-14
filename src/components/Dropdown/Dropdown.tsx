import c from 'classnames';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState, memo } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { DropdownProps, Option } from './Dropdown.types';
import * as s from './Dropdown.module.scss';

const Dropdown: React.FC<DropdownProps> = ({ options, value, disabled, onChange, className, placeholder }) => {
  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(
    () => options.filter((el) => el.value.toLowerCase().includes(filter)),
    [options, filter],
  );

  const handleClickOption = (option: Option) => {
    onChange(option);
    setIsOpen(false);
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

    if (value) {
      return value.value;
    }

    return '';
  }, [filter, isOpen, value]);

  return (
    <div ref={containerRef} className={s.container}>
      <Input
        ref={inputRef}
        value={inputValue}
        className={className}
        disabled={disabled}
        placeholder={placeholder}
        afterSlot={
          <Button
            size="small"
            variant="ghost"
            onClick={() => {
              setIsOpen((v) => !v);
            }}
          >
            <ArrowDownIcon />
          </Button>
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
              className={c(s.option, option.key === value.key && s.optionSelected)}
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

export default memo(Dropdown);
