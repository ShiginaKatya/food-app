// import React from 'react';
import classNames from 'classnames';
import FavoriteIcon from '../icons/FavoriteIcon';
import LogoIcon from '../icons/LogoIcon';
import PersonIcon from '../icons/PersonIcon';
import Text from '../Text';
import s from './Header.module.scss';
import { Link } from 'react-router';

const Header = () =>{
  return (
    <header className={s.header}>
      <div className={s.header__logo}>
        <LogoIcon/>
        <Text tag='p' view='p-20' weight='bold' ><a href="">Food Client</a></Text>
      </div>
      <nav className={classNames(s.header__nav, s.nav)}>
        <ul className={s.nav__list}>
          <li className={s.nav__list__link}>
            <Text tag='p' view='p-16' ><Link to='/recipes'>Recipes</Link></Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag='p' view='p-16' ><a href="">Meal Categories</a></Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag='p' view='p-16' ><a href="">Products</a></Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag='p' view='p-16' ><a href="">Menu Items</a></Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag='p' view='p-16' ><a href="">Meal Planning</a></Text>
          </li>
        </ul>
      </nav>
      <div className={s.header__personal}>
        <a href="" className={s.personal_favorites}><FavoriteIcon/></a>
        <a href="" className={s.personal_account}><PersonIcon/></a>
      </div>
    </header>
  )
};

export default Header;
