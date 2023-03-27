import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';

import {DataTestId} from '../../types/constants/data-test-id';
import {AppPaths} from '../../types/constants/paths';

import {useMenu} from './use-menu';

import classes from './menu.module.scss';

interface MenuProps {
    burger: boolean,
    menuToggle?: (arg: boolean) => void,
    isMenuOpen: boolean
}

export const Menu = ({burger, menuToggle, isMenuOpen}: MenuProps) => {

    const testId = burger ? {
        burgerNav: DataTestId.BurgerNavigation,
        navigationLink: DataTestId.BurgerNavigationLink,
        navigationLinkCount: DataTestId.BurgerNavigationLinkCount,
        showcaseId: DataTestId.BurgerShowcase,
        booksId: DataTestId.BurgerBooks,
        termsId: DataTestId.BurgerTerms,
        contractId: DataTestId.BurgerContract
    } : {
        burgerNav: '',
        navigationLink: DataTestId.NavigationLink,
        navigationLinkCount: DataTestId.NavigationLinkCount,
        showcaseId: DataTestId.NavigationShowcase,
        booksId: DataTestId.NavigationBooks,
        termsId: DataTestId.NavigationTerms,
        contractId: DataTestId.NavigationContract
    };

    const {
        closeMenu,
        showcaseStatus,
        termsStatus,
        contractStatus,
        categoryStatus,
        showcaseHandler,
        booksHandler,
        desktopBooksHandler,
        contractHandler,
        termsHandler,
        categories,
        bookInCategory,
        defaultCategory,
        handleLogout
    } = useMenu({burger, menuToggle, isMenuOpen});


    return (
        <div className={isMenuOpen ? classes.menuWrapper : classes.hide}
             data-test-id={testId.burgerNav} onClick={closeMenu}>
            <div className={classes.menu} onClick={(e) => e.stopPropagation()}>
                <NavLink data-test-id={testId.showcaseId}
                         className={showcaseStatus ? classNames(classes.generalLink, classes.active) : classes.generalLink}
                         onClick={showcaseHandler} to={AppPaths.booksAll}>Витрина книг
                    {showcaseStatus && <div
                        className={categoryStatus ? classes.generalLinkChevronActive : classes.generalLinkChevron}
                    />}
                </NavLink>
                <ul className={categoryStatus ? classes.categoryListActive : classes.categoryList}>
                    <li className={classes.categoryListItem}><NavLink
                        data-test-id={testId.booksId}
                        onClick={(e) => burger ? booksHandler(e) : desktopBooksHandler(defaultCategory)}
                        className={({isActive}) => isActive ? classes.categoryListItemLinkActive : classes.categoryListItemLink}
                        to={AppPaths.booksAll}>Все книги</NavLink>
                    </li>

                    {categories && categories.map((el) => <li
                        className={classes.categoryListItem}
                        key={el.id}>
                        <NavLink
                            onClick={(e) => burger ? booksHandler(e, el) : desktopBooksHandler(el)}
                            className={({isActive}) => isActive ? classes.categoryListItemLinkActive : classes.categoryListItemLink}
                            to={`${AppPaths.books}/${el.path}`}><span
                            data-test-id={testId.navigationLink + el.path}>{el.name}</span>
                            <span data-test-id={testId.navigationLinkCount + el.path}
                                  className={classes.categoryListItemLinkCount}>{bookInCategory && el.name && bookInCategory[el.name] ? bookInCategory[el.name] : 0}</span>
                        </NavLink></li>)}
                </ul>
                <NavLink data-test-id={testId.termsId}
                         className={termsStatus ? classNames(classes.generalLink, classes.active) : classes.generalLink}
                         onClick={termsHandler} to={AppPaths.terms}>Правила
                    пользования</NavLink>
                <NavLink data-test-id={testId.contractId}
                         className={contractStatus ? classNames(classes.generalLink, classes.active) : classes.generalLink}
                         onClick={contractHandler} to={AppPaths.contract}>Договор
                    оферты</NavLink>
                {burger && <>
                    <div className={classes.separator}/>
                    <NavLink
                        className={classNames(classes.generalLink, classes.generalLinkProfile)}
                        to={AppPaths.userProfile}>Профиль</NavLink>
                    <NavLink data-test-id={DataTestId.ExitButton}
                             className={classNames(classes.generalLink, classes.generalLinkExit)}
                             to={AppPaths.auth} onClick={handleLogout}>Выход</NavLink></>}
            </div>
        </div>
    );
};
