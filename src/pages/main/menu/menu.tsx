import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuTestId } from '../../../types/test-id';

import classes from './menu.module.scss';
import {bookApi} from '../../../store/reducers/book-reducer';

export const Menu = (props: { burger: boolean, testId: MenuTestId, menuToggle?: (arg: boolean) => void, isMenuOpen: boolean }) => {
    const {data: bookCategories, isSuccess} = bookApi.useGetBookCategoriesQuery();

    const [showcaseStatus, setShowcaseStatus] = useState(!props.burger);

    const [categoryStatus, setCategoryStatus] = useState(!props.burger);

    const [termsStatus, setTermsStatus] = useState(false);

    const [contractStatus, setContractStatus] = useState(false);

    const body = document.querySelector('body') as HTMLElement;

    if (props.burger && props.isMenuOpen) {
        body.classList.add('no-scroll');
    }

    const booksHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        if (!showcaseStatus) {
            setShowcaseStatus(true);
            setTermsStatus(false);
            setContractStatus(false);

            return;
        }
        if (props.burger && categoryStatus) {
            body.classList.remove('no-scroll');
            if (props.menuToggle) props.menuToggle(false);
        }
        setShowcaseStatus(true);
        if (categoryStatus) {
            setCategoryStatus(false);
        } else {
            setCategoryStatus(true);
        }
        setTermsStatus(false);
        setContractStatus(false);
    };

    const termsHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        if (props.burger) {
            body.classList.remove('no-scroll');
        }
        setCategoryStatus(false);
        setShowcaseStatus(false);
        setContractStatus(false);
        setTermsStatus(true);
        if (props.menuToggle) props.menuToggle(false);
    };

    const contractHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
        if (props.burger) {
            body.classList.remove('no-scroll');
        }
        setCategoryStatus(false);
        setShowcaseStatus(false);
        setTermsStatus(false);
        setContractStatus(true);
        if (props.menuToggle) props.menuToggle(false);
    };


    const closeMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (props.menuToggle) {
            body.classList.remove('no-scroll');
            props.menuToggle(false);
        }
    };


    return (
        <div  className={props.isMenuOpen ? classes['menu-wrapper'] : classes.hide} data-test-id={props.testId.burgerNav} onClick={(e) => closeMenu(e)}>
            <div className={ classes.menu} onClick={(e) => e.stopPropagation()}>
                <NavLink data-test-id={props.testId.showcaseId}
                         className={showcaseStatus ? `${classes['general-link']} ${classes.active}` : classes['general-link']}
                         onClick={(e) => booksHandler(e)} to="/">Витрина книг
                    {isSuccess && showcaseStatus && <div
                        className={categoryStatus ? classes['general-link-chevron-active'] : classes['general-link-chevron']}
                    />}
                </NavLink>
                <ul className={categoryStatus ? classes['category-list-active'] : classes['category-list']}>
                    {isSuccess && <li className={classes['category-list-item']}><NavLink
                        data-test-id={props.testId.booksId}
                        onClick={(e) => props.burger && booksHandler(e)}
                        className={({ isActive }) => isActive ? classes['category-list-item-link-active'] : classes['category-list-item-link']}
                        to="/books/all">Все книги</NavLink>
                    </li>}

                    {bookCategories && bookCategories.map((el) => <li className={classes['category-list-item']}
                                                    key={el.id}>
                        <NavLink onClick={(e) => props.burger && booksHandler(e)}
                                 className={({ isActive }) => isActive ? classes['category-list-item-link-active'] : classes['category-list-item-link']}
                                 to={`/books/${el.path}`}>{el.name}<span>1</span></NavLink>
                    </li>)}
                </ul>
                <NavLink data-test-id={props.testId.termsId}
                         className={termsStatus ? `${classes['general-link']} ${classes.active}` : classes['general-link']}
                         onClick={termsHandler} to="/terms">Правила
                    пользования</NavLink>
                <NavLink data-test-id={props.testId.contractId}
                         className={contractStatus ? `${classes['general-link']} ${classes.active}` : classes['general-link']}
                         onClick={contractHandler} to="/contract">Договор
                    оферты</NavLink>
                {props.burger && <React.Fragment>
                    <div className={classes.separator} />
                    <NavLink
                        className={`${classes['general-link']} ${classes['general-link-profile']}`}
                        to="">Профиль</NavLink>
                    <NavLink
                        className={`${classes['general-link']} ${classes['general-link-exit']}`}
                        to="">Выход</NavLink></React.Fragment>}
            </div>
        </div>
    );
};
