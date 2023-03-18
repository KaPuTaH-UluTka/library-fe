import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';

import ListGrayIcon from '../../../../assets/book-list-settings/list-gray.svg';
import ListWhiteIcon from '../../../../assets/book-list-settings/list-white.svg';
import SortIcon from '../../../../assets/book-list-settings/rating-sort.svg';
import searchIcon from '../../../../assets/book-list-settings/search.svg';
import WindowGrayIcon from '../../../../assets/book-list-settings/window-gray.svg';
import WindowWhiteIcon from '../../../../assets/book-list-settings/window-white.svg';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {
    setListView,
    setWindowView
} from '../../../../store/reducers/list-view-reducer';
import {setSortOrder} from '../../../../store/reducers/sort-order-reducer';

import classes from './list-settings.module.scss';

export const ListSettings = (props: {sortOrder: boolean, searchValue: string, setSearchValue: (searchValue: string) => void}) => {
    const dispatch = useAppDispatch();
    const {listView} = useAppSelector(state => state.listViewReducer);

    const [isSearchOpen, searchOpenToggle] = useState(false);

    const openSearch = () => {
        searchOpenToggle(true);
    };

    const closeSearch = () => {
        searchOpenToggle(false);
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        const target = event.target as HTMLInputElement;

        props.setSearchValue(target.value);
    }

    const changeOrder = () => {
        dispatch(setSortOrder());
    }

    const [size, setSize] = useState<{ clientHeight: null | number, clientWidth: null | number }>({
        clientHeight: null,
        clientWidth: null
    });

    const searchState = size.clientWidth && size.clientWidth < 550 && isSearchOpen;

    const ref = useRef<HTMLDivElement>(null);
    const resizeHandler = () => {
        if (ref.current) {
            const {clientHeight, clientWidth} = ref.current;

            setSize({clientHeight, clientWidth});
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [size.clientWidth]);


    return (
        <div className={classes.settings} ref={ref}>
            <div className={classes['search-and-sort']}>
                {size.clientWidth && size.clientWidth < 550 ? <React.Fragment>
                        <form className={classes['search-form']} onChange={handleSearch}>
                            <input
                                className={isSearchOpen ? classNames(classes.search, {[classes['search-active']]: props.searchValue}) : classes.hide}
                                type="search" data-test-id="input-search"
                                placeholder="Поиск книги или автора…"/>
                            <button type="button" data-test-id="button-search-close"
                                    onClick={closeSearch}
                                    className={isSearchOpen ? classes['search-btn-close'] : classes.hide}>
                                +
                            </button>
                        </form>
                        <button type="button" data-test-id="button-search-open"
                                className={searchState ? classes.hide : classes['search-btn-open']}
                                onClick={openSearch}>
                            <img src={searchIcon} alt="search-icon"/>
                        </button>
                    </React.Fragment> :
                    <form className={classes['search-form']} onChange={handleSearch}>
                        <input
                            className={classNames(classes.search, {[classes['search-active']]: props.searchValue})}
                            type="search" data-test-id="input-search"
                            placeholder="Поиск книги или автора…"/>
                    </form>}

                <button className={searchState ? classes.hide : classes.sort} type="button"
                        data-test-id='sort-rating-button'
                        onClick={changeOrder}>
                    <img className={props.sortOrder ? classes['sort-icon'] : classes['sort-icon-rotated']}
                         src={SortIcon} alt="sort-icon"/>По рейтингу
                </button>
            </div>
            <div className={searchState ? classes.hide : classes['list-style']}>

                <button
                    className={listView ? classNames(classes.gradient, classes['change-view-btn']) : classes['change-view-btn']}
                    onClick={() => dispatch(setWindowView())} type="button"
                    data-test-id="button-menu-view-window"
                ><img src={listView ? WindowWhiteIcon : WindowGrayIcon} alt="window-icon"/>
                </button>

                <button
                    className={listView ? classes['change-view-btn'] : classNames(classes.gradient, classes['change-view-btn'])}
                    onClick={() => dispatch(setListView())} type="button"
                    data-test-id="button-menu-view-list"
                ><img src={listView ? ListGrayIcon : ListWhiteIcon} alt="list-icon"/>
                </button>

            </div>
        </div>
    );
};

