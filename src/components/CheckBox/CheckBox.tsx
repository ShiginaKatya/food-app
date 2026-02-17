import React from 'react';
import classNames from 'classnames';
import './CheckBox.css'
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  disabled,
  checked,
  className,
  ...props
  }) => {
    const checkName = classNames('check', {'check-disabled': disabled}, className)
  return (
    <label className={checkName}>
        <input type="checkbox" className='check_input' checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} {...props}  />
        {checked && <CheckIcon className='checked-icon' color='accent' width={40} height={40}/>}
    </label>
    
  )
};

export default CheckBox;
