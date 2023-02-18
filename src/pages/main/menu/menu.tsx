import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import {useAppDispatch} from '../../../hooks/redux';
import {bookApi} from '../../../store/reducers/book-reducer';
import {setCategory} from '../../../store/reducers/category-reducer';
import {BookCategoryInterface} from '../../../types/book-category';
import {MenuTestId} from '../../../types/test-id';

import classes from './menu.module.scss';

export const Menu = (props: { burger: boolean, testId: MenuTestId, menuToggle?: (arg: boolean) => void, isMenuOpen: boolean }) => {

    const dispatch = useAppDispatch();

    const {data: bookCategories, isSuccess} = bookApi.useGetBookCategoriesQuery();

    const [showcaseStatus, setShowcaseStatus] = useState(!props.burger);

    const [categoryStatus, setCategoryStatus] = useState(!props.burger);

    const [termsStatus, setTermsStatus] = useState(false);

    const [contractStatus, setContractStatus] = useState(false);

    const body = document.querySelector('body') as HTMLElement;

    if (props.burger && props.isMenuOpen) {
        body.classList.add('no-scroll');
    }

    const defaultCategory = {name: 'Все книги', path: 'all', id: 0}

    const booksHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, category?: BookCategoryInterface) => {
        e.stopPropagation();
        if (!showcaseStatus) {
            setShowcaseStatus(true);
            setTermsStatus(false);
            setContractStatus(false);

            return;
        }
        if (props.burger && categoryStatus) {
            body.classList.remove('no-scroll');
            dispatch(setCategory(category));
            if (props.menuToggle) props.menuToggle(false);
        }
        setShowcaseStatus(true);
        if (categoryStatus) {
            setCategoryStatus(false);
        } else {
            setCategoryStatus(true);
        }
        dispatch(setCategory(category));
        setTermsStatus(false);
        setContractStatus(false);
    };


    const desktopBooksHandler = (category: BookCategoryInterface) => {
        dispatch(setCategory(category));
    }

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
        <div className={props.isMenuOpen ? classes['menu-wrapper'] : classes.hide}
             data-test-id={props.testId.burgerNav} onClick={(e) => closeMenu(e)}>
            <div className={classes.menu} onClick={(e) => e.stopPropagation()}>
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
                        onClick={(e) => props.burger ? booksHandler(e) : desktopBooksHandler(defaultCategory)}
                        className={({isActive}) => isActive ? classes['category-list-item-link-active'] : classes['category-list-item-link']}
                        to="/books/all">Все книги</NavLink>
                    </li>}

                    {bookCategories && bookCategories.map((el) => <li
                        className={classes['category-list-item']}
                        key={el.id}>
                        <NavLink
                            onClick={(e) => props.burger ? booksHandler(e, el) : desktopBooksHandler(el)}
                            className={({isActive}) => isActive ? classes['category-list-item-link-active'] : classes['category-list-item-link']}
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
                    <div className={classes.separator}/>
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
