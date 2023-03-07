import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import classNames from 'classnames';

import userAvatar from '../assets/avatar.jpg';
import logoClevertec from '../assets/logoCleverland.svg';
import {useAppDispatch} from '../hooks/redux';
import { Menu } from '../pages/main/menu/menu';
import {logout} from '../store/reducers/user-reducer';
import {AppPaths, DataTestId} from '../types/constants/constants';

import classes from './header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();

    const user = { name: 'Иван', avatar: userAvatar };

    const testId = {
        burgerNav: 'burger-navigation',
        navigationLink: 'burger-',
        navigationLinkCount: 'burger-book-count-for-',
        showcaseId: 'burger-showcase',
        booksId: 'burger-books',
        termsId: 'burger-terms',
        contractId: 'burger-contract'
    };

    const [isMenuOpen, menuToggle] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className={classes.header}>
            <div className={classes['header-bar']}>
                <Link to="/"><img className={classes.logo} src={logoClevertec} alt="logo" /></Link>
                <div className={classes['burger-menu']}>
                    <input className={classes['menu-toggle']} id="menu__toggle" type="checkbox"
                           checked={isMenuOpen} onChange={() => menuToggle(!isMenuOpen)}
                    />
                    <label className={classes['menu-btn']} data-test-id="button-burger"
                           htmlFor="menu__toggle">
                        <span />
                    </label>
                    <Menu burger={true} testId={testId} menuToggle={menuToggle} isMenuOpen={isMenuOpen}/>
                </div>
                <h3 className={classes['header-title']}>Библиотека</h3>
                <div className={classes['welcome-wrapper']}>
                    <h3 className={classes['welcome-title']}>{`Привет, ${user.name}!`}</h3>
                    <img className={classes['user-avatar']} src={user.avatar} alt="avatar" />
                    <NavLink
                        className={classNames(classes['general-link'], classes['general-link-profile'])}
                        to="">Профиль</NavLink>
                    <NavLink data-test-id={DataTestId.ExitButton}
                             className={classNames(classes['general-link'], classes['general-link-exit'])}
                             to={AppPaths.auth} onClick={handleLogout}>Выход</NavLink>
                </div>
            </div>
        </header>);
};
