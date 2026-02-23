import * as React from 'react'
import { type IconProps } from '../Icon';
import s from '../Icon/Icon.module.scss';
import classNames from 'classnames';

const FavoriteIcon: React.FC<IconProps> = ({
  className,
  color='accent'
}) => {
  return( 
    <svg className={classNames(s.icon, s.icon_stroke, color && s[`icon_color-${color}-stroke`], className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 5.59586C10.3006 3.36339 7.46079 2.67346 5.3315 4.71773C3.2022 6.76201 2.90242 10.1799 4.57457 12.5977C5.96485 14.6079 10.1723 18.8476 11.5513 20.2199C11.7055 20.3734 11.7827 20.4501 11.8727 20.4803C11.9512 20.5066 12.0371 20.5066 12.1157 20.4803C12.2057 20.4501 12.2828 20.3734 12.4371 20.2199C13.8161 18.8476 18.0235 14.6079 19.4138 12.5977C21.0859 10.1799 20.8227 6.7405 18.6568 4.71773C16.4909 2.69496 13.6994 3.36339 12 5.59586Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
export default FavoriteIcon;
