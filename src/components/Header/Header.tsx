import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router';

import Text from '../Text';
import FavoriteIcon from '../icons/FavoriteIcon';
import LogoIcon from '../icons/LogoIcon';
import PersonIcon from '../icons/PersonIcon';

import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header__logo}>
        <LogoIcon />
        <Text tag="p" view="p-20" weight="bold">
          <a href="">Food Client</a>
        </Text>
      </div>
      <nav className={classNames(s.header__nav, s.nav)}>
        <ul className={s.nav__list}>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              <Link to="/recipes">Recipes</Link>
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              <a href="">Meal Categories</a>
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              <a href="">Products</a>
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              <a href="">Menu Items</a>
            </Text>
          </li>
          <li className={s.nav__list__link}>
            <Text tag="p" view="p-16">
              <a href="">Meal Planning</a>
            </Text>
          </li>
        </ul>
      </nav>
      <div className={s.header__personal}>
        <Link to="/favorites" className={s.header__personal__link}>
          <FavoriteIcon color="accent" />
        </Link>
        <a href="" className={s.header__personal__link}>
          <PersonIcon color="accent" />
        </a>
      </div>
    </header>
  );
};

export default React.memo(Header);
