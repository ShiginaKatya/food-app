import * as React from 'react';
import { IconProps } from '../Icon';
import '../Icon/Icon.css';

const ArrowDownIcon: React.FC<IconProps> = ({
  className,
  color='inherit',
  width=24,
  height=24
}) => {
  return(
    <svg className={className} data-testid="icon" data-color={color} height={height} width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"/>
    </svg>
  );
};

export default ArrowDownIcon;
