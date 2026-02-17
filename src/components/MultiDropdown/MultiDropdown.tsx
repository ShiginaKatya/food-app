import React, {useState, useRef, useMemo, useEffect} from 'react';
import classNames from 'classnames';
import Input from '../Input';
import './MultiDropdown.css'
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) setIsOpen(false);
  }, [disabled]);
  const filterations = useMemo(() => {
    return options.filter((opt) =>
      opt.value.toLowerCase().includes(filter.toLowerCase())
    );
  }, [options, filter]);
  const inputToggle = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);
    if (isSelected) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };
  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
      setFilter('');
    }
  };
  const currentTitle = getTitle(value);
  const displayValue = isOpen ? filter : (value.length > 0 ? getTitle(value) : '');
  const inputPlaceholder = (isOpen || value.length === 0) ? currentTitle : '';
  const selectName = classNames('select', className)
  return (
    <div 
      className={selectName} 
      ref={containerRef} 
      onBlur={handleBlur}
    >
      <Input
        disabled={disabled}
        value={displayValue}
        placeholder={inputPlaceholder}
        onChange={(val: string) => {
          setIsOpen(true);
          setFilter(val);}}
        onClick={() => !disabled && setIsOpen(true)}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isOpen && !disabled && (
        <ul className="select-list">
          {filterations.map((opt) => {
            const isSelected = value.some((v) => v.key === opt.key);
            return (
              <li className='list-item'
                key={opt.key}
                onMouseDown={(e) => {
                  e.preventDefault();
                  inputToggle(opt);
                }}
                style={{ color: isSelected ? 'var(--brand)' : 'black' }}
              >
                {opt.value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
