import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {libraryApi} from '../../../store/api/library-api';
import {setCategories, setCategory} from '../../../store/reducers/category-reducer';
import {logout} from '../../../store/reducers/user-reducer';
import {BookCategoryInterface} from '../../../types/book-category';
import {AppPaths, DataTestId} from '../../../types/constants/constants';
import {countCategories} from '../../../utils/categories-counter';

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

    const dispatch = useAppDispatch();

    const {categories} = useAppSelector(state => state.categoryReducer);

    const {books} = useAppSelector(state => state.bookReducer);

    const {data: bookCategories, isSuccess} = libraryApi.useGetBookCategoriesQuery();

    const [showcaseStatus, setShowcaseStatus] = useState(true);

    const [categoryStatus, setCategoryStatus] = useState(true);

    const [termsStatus, setTermsStatus] = useState(false);

    const [contractStatus, setContractStatus] = useState(false);

    const body = document.querySelector('body') as HTMLElement;

    if (burger && isMenuOpen) {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }

    const defaultCategory = {name: 'Все книги', path: 'all', id: 0}

    const booksHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, category?: BookCategoryInterface) => {
        e.stopPropagation();
        if (!showcaseStatus) {
            setCategoryStatus(true);
            setShowcaseStatus(true);
            setTermsStatus(false);
            setContractStatus(false);

            return;
        }
        if (burger && categoryStatus) {
            body.classList.remove('no-scroll');
            if (category) dispatch(setCategory(category));
            if (menuToggle) menuToggle(false);
        }
        setShowcaseStatus(true);
        if (categoryStatus) {
            setCategoryStatus(false);
        } else {
            setCategoryStatus(true);
        }

        if (category) dispatch(setCategory(category));
        setTermsStatus(false);
        setContractStatus(false);
    };

    const desktopBooksHandler = (category: BookCategoryInterface) => {
        dispatch(setCategory(category));
    }

    const termsHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        if (burger) {
            body.classList.remove('no-scroll');
        }
        setCategoryStatus(false);
        setShowcaseStatus(false);
        setContractStatus(false);
        setTermsStatus(true);
        if (menuToggle) menuToggle(false);
    };

    const contractHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        if (burger) {
            body.classList.remove('no-scroll');
        }
        setCategoryStatus(false);
        setShowcaseStatus(false);
        setTermsStatus(false);
        setContractStatus(true);
        if (menuToggle) menuToggle(false);
    };


    const closeMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (menuToggle) {
            body.classList.remove('no-scroll');
            menuToggle(false);
        }
    };

    let bookInCategory: { [key: string]: number } | null = null;

    useEffect(() => {
        if (!categories) dispatch(setCategories(bookCategories));
    });

    if (books.length > 0) {
        bookInCategory = countCategories(books);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={isMenuOpen ? classes.menuWrapper : classes.hide}
             data-test-id={testId.burgerNav} onClick={closeMenu}>
            <div className={classes.menu} onClick={(e) => e.stopPropagation()}>
                <NavLink data-test-id={testId.showcaseId}
                         className={showcaseStatus ? classNames(classes.generalLink, classes.active) : classes.generalLink}
                         onClick={booksHandler} to={AppPaths.booksAll}>Витрина книг
                    {isSuccess && showcaseStatus && <div
                        className={categoryStatus ? classes.generalLinkChevronActive : classes.generalLinkChevron}
                    />}
                </NavLink>
                <ul className={categoryStatus ? classes.categoryListActive : classes.categoryList}>
                    {isSuccess && <li className={classes.categoryListItem}><NavLink
                        data-test-id={testId.booksId}
                        onClick={(e) => burger ? booksHandler(e) : desktopBooksHandler(defaultCategory)}
                        className={({isActive}) => isActive ? classes.categoryListItemLinkActive : classes.categoryListItemLink}
                        to={AppPaths.booksAll}>Все книги</NavLink>
                    </li>}

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
