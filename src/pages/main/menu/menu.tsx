import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuTestId } from '../../../types/test-id';

import classes from './menu.module.scss';

export const Menu = (props: { burger: boolean, testId: MenuTestId, menuToggle?: (arg: boolean) => void, isMenuOpen: boolean }) => {

    const bookCategories = [{
        'category': 'business',
        'title': 'Бизнес книги',
        'count': 14
    }, { 'category': 'detectives', 'title': 'Детективы', 'count': 8 }, {
        'category': 'Детские книги', 'title': 'Бизнес книги',
        'count': 14
    }, { 'category': 'foreign literature', 'title': 'Зарубежная литература', 'count': 2 }, {
        'category': 'История', 'title': 'Бизнес книги',
        'count': 5
    }, { 'category': 'classic literature', 'title': 'Классическая литература', 'count': 12 }, {
        'category': 'Psychology books', 'title': 'Книги по психологии',
        'count': 11
    }, { 'category': 'computer literature', 'title': 'Компьютерная литература', 'count': 54 }, {
        'category': 'culture and art', 'title': 'Культура и искусство',
        'count': 5
    }, { 'category': 'science and education', 'title': 'Наука и образование', 'count': 2 }, {
        'category': 'nonfiction literature', 'title': 'Публицистическая литература',
        'count': 0
    }, { 'category': 'reference books', 'title': 'Справочники', 'count': 10 }, {
        'category': 'fantasy', 'title': 'Фантастика',
        'count': 12
    }, { 'category': 'humorous literature', 'title': 'Юмористическая литература', 'count': 8 }];

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
                    {showcaseStatus && <div
                        className={categoryStatus ? classes['general-link-chevron-active'] : classes['general-link-chevron']}
                    />}
                </NavLink>
                <ul className={categoryStatus ? classes['category-list-active'] : classes['category-list']}>
                    <li className={classes['category-list-item']}><NavLink
                        data-test-id={props.testId.booksId}
                        onClick={(e) => props.burger && booksHandler(e)}
                        className={({ isActive }) => isActive ? classes['category-list-item-link-active'] : classes['category-list-item-link']}
                        to="/books/all">Все книги</NavLink>
                    </li>

                    {bookCategories.map((el) => <li className={classes['category-list-item']}
                                                    key={el.category}>
                        <NavLink onClick={(e) => props.burger && booksHandler(e)}
                                 className={({ isActive }) => isActive ? classes['category-list-item-link-active'] : classes['category-list-item-link']}
                                 to={`/books/${el.category}`}>{el.title}<span>{el.count}</span></NavLink>
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
