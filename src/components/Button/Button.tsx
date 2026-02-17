import React from 'react';
import classNames from 'classnames';
import './Button.css'
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  className,
  children,
  onClick,
  ...props
}) => {
  
  const fullClassName = classNames('btn', {'btn-disabled': disabled}, className)
  return(
    <button data-testid="button" className={fullClassName} {...props} disabled={disabled || loading} onClick={onClick}>
      {loading && <Loader size='s' className='btn-loader'/>}
      {children}
    </button>
  )
};

export default Button;
