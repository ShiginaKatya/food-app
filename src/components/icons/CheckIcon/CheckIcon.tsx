import * as React from 'react'
import { IconProps } from '../Icon';
// import '../Icon/Icon.css';

const CheckIcon: React.FC<IconProps> = ({
  className,
  color,
  width=24,
  height=24
}) => {
  const colorChoice ={
    'primary': 'black',
    'secondary': '#AFADB5',
    'accent': 'var(--brand)'
  }
  const ChoisenColor = (color && colorChoice[color]) || 'inherit'
  return(
    <svg className={className} data-testid="icon" height={height} width={width} viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg" fill="none">
      <path xmlns="http://www.w3.org/2000/svg" d="M4 11.6129L9.87755 18L20 7" stroke={ChoisenColor} strokeWidth="2"/>
    </svg>
  );
};
export default CheckIcon;
