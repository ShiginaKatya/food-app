import React from 'react';
import './Input.css';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    value, 
    onChange,
    afterSlot,
    disabled,
    placeholder,
    ...props
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };
    const inputClassName = classNames('input', {'input-disabled': disabled}, className)
    return(
      
      <div className={inputClassName}>
        <input ref={ref} type="text" value={value} onChange={handleChange} disabled={disabled} placeholder={placeholder} {...props}/>
        {afterSlot && <div className='logo'>{afterSlot}</div>}
      </div>
    )
  }
);

export default Input;
