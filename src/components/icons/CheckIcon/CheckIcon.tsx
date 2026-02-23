import * as React from 'react'
import { type IconProps } from '../Icon';
import classNames from 'classnames';
import s from '../Icon/Icon.module.scss';


const CheckIcon: React.FC<IconProps> = ({
  className,
  color,
  width=24,
  height=24
}) => {
  return(
    <svg className={classNames(s.icon, s.icon_stroke, color && s[`icon_color-${color}_stroke`], className)} data-testid="icon" height={height} width={width} viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg" fill="none">
      <path xmlns="http://www.w3.org/2000/svg" d="M4 11.6129L9.87755 18L20 7" strokeWidth="2"/>
    </svg>
  );
};
export default CheckIcon;
