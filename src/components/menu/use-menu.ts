import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {setCategory} from '../../store/reducers/category-reducer';
import {logout} from '../../store/reducers/user-reducer';
import {BookCategoryInterface} from '../../types/book-category';
import {countCategories} from '../../utils/categories-counter';

interface MenuProps {
    burger: boolean,
    menuToggle?: (arg: boolean) => void,
    isMenuOpen: boolean
}

export const useMenu = ({burger, menuToggle, isMenuOpen}: MenuProps) => {
    const dispatch = useAppDispatch();

    const {categories} = useAppSelector(state => state.categoryReducer);

    const {books} = useAppSelector(state => state.bookReducer);

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

        if (burger && categoryStatus) {
            body.classList.remove('no-scroll');
            if (category) dispatch(setCategory(category));
            if (menuToggle) menuToggle(false);
        }

        if (categoryStatus) {
            setCategoryStatus(false);
        } else {
            setCategoryStatus(true);
        }

        if (category) dispatch(setCategory(category));
        setTermsStatus(false);
        setContractStatus(false);
    };

    const showcaseHandler = () => {
        if (showcaseStatus) {
            setShowcaseStatus(false);
            setCategoryStatus(false);
        } else {
            setCategoryStatus(true);
            setShowcaseStatus(true);
            setTermsStatus(false);
            setContractStatus(false);
        }
    }

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

    });

    if (books.length > 0) {
        bookInCategory = countCategories(books);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return {
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
    }
}
