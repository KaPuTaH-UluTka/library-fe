import React, {useEffect, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import classNames from 'classnames';

import defaultAvatar from '../assets/header/defaultAvatar.jpg';
import logoClevertec from '../assets/header/logoCleverland.svg';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {Menu} from '../pages/main/menu/menu';
import {logout} from '../store/reducers/user-reducer';
import {AppPaths, DataTestId} from '../types/constants/constants';

import classes from './header.module.scss';
import {API_URL} from "../store/api/api-url";

export const Header = () => {
    const [isContextMenu, setIsContextMenu] = useState(false);

    const {pathname} = useLocation();

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.userReducer);

    const [isMenuOpen, menuToggle] = useState(false);

    const logoutHandler = () => dispatch(logout());

    const contextMenuHandler = () => setIsContextMenu(!isContextMenu);

    return (
        <header className={classNames(classes.header, {[classes.activeHeader]: isContextMenu})}>
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
                    <Menu burger={true} menuToggle={menuToggle}
                          isMenuOpen={isMenuOpen}/>
                </div>
                <h3 className={classes.headerTitle}>{pathname === AppPaths.userProfile ? 'Личный кабинет' : 'Библиотека'}</h3>
                <div className={classes.welcomeWrapper} onClick={contextMenuHandler}>
                    <h3 className={classes.welcomeTitle}>{`Привет, ${user?.firstName}!`}</h3>
                    <img className={classes.userAvatar} src={user?.avatar ? API_URL + user.avatar : defaultAvatar} alt="avatar"/>
                </div>
            </div>
            <div
                className={classNames(classes.contextMenu, {[classes.activeContext]: isContextMenu})}>
                <NavLink data-test-id={DataTestId.ProfileButton}
                    className={classNames(classes.contextLink, {[classes.activeLink]: isContextMenu})}
                    to={AppPaths.userProfile} onClick={contextMenuHandler}>Профиль</NavLink>
                <NavLink data-test-id={DataTestId.ExitButton}
                         className={classNames(classes.contextLink, {[classes.activeLink]: isContextMenu})}
                         to={AppPaths.auth} onClick={logoutHandler}>Выход</NavLink>
            </div>
        </header>);
};
