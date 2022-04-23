import { Fragment } from 'react';

import classes from './Header.module.css';
import HeaderCartButton from 'components/Layout/HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>

        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      <div className={classes['main-image']}>
        <img src="https://rawcdn.githack.com/bkr88/react-meals/17c8a33ce1963ef7685a5e81518c3ca7abe4504e/src/assets/meals.jpg" alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
