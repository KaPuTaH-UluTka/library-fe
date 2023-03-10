import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import classNames from 'classnames';

import userAvatar from '../assets/avatar.jpg';
import logoClevertec from '../assets/logoCleverland.svg';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {Menu} from '../pages/main/menu/menu';
import {logout} from '../store/reducers/user-reducer';
import {AppPaths, DataTestId} from '../types/constants/constants';

import classes from './header.module.scss';

export const Header = () => {
    const [isContextMenu, setIsContextMenu] = useState(false);
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

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

    const logoutHandler = () => dispatch(logout());

    const contextMenuHandler = () => setIsContextMenu(!isContextMenu);

    return (
        <header className={classNames(classes.header, {[classes.activeHeader]: isContextMenu })}>
            <div className={classes.headerBar}>
                <Link to="/"><img className={classes.logo} src={logoClevertec} alt="logo"/></Link>
                <div className={classes.burgerMenu}>
                    <input className={classes.menuToggle} id="menu__toggle" type="checkbox"
                           checked={isMenuOpen} onChange={() => menuToggle(!isMenuOpen)}
                    />
                    <label className={classes.menuBtn} data-test-id={DataTestId.ButtonBurger}
                           htmlFor="menu__toggle">
                        <span/>
                    </label>
                    <Menu burger={true} testId={testId} menuToggle={menuToggle}
                          isMenuOpen={isMenuOpen}/>
                </div>
                <h3 className={classes.headerTitle}>Библиотека</h3>
                <div className={classes.welcomeWrapper} onClick={contextMenuHandler}>
                    <h3 className={classes.welcomeTitle}>{`Привет, ${user?.firstName}!`}</h3>
                    <img className={classes.userAvatar} src={userAvatar} alt="avatar"/>
                </div>
            </div>
            {isContextMenu && <div className={classNames(classes.contextMenu, {[classes.activeContext]: isContextMenu })}>
                <NavLink
                    className={classNames(classes.contextLink, {[classes.activeLink]: isContextMenu })}
                    to="">Профиль</NavLink>
                <NavLink data-test-id={DataTestId.ExitButton}
                         className={classNames(classes.contextLink, {[classes.activeLink]: isContextMenu })}
                         to={AppPaths.auth} onClick={logoutHandler}>Выход</NavLink>
            </div>}
        </header>);
};
