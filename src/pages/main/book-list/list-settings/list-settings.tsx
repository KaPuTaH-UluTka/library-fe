import React, {useState} from 'react';
import classNames from 'classnames';

import ListGrayIcon from '../../../../assets/book-list-settings/list-gray.svg';
import ListWhiteIcon from '../../../../assets/book-list-settings/list-white.svg';
import SortIcon from '../../../../assets/book-list-settings/rating-sort.svg';
import searchIcon from '../../../../assets/book-list-settings/search.svg';
import WindowGrayIcon from '../../../../assets/book-list-settings/window-gray.svg';
import WindowWhiteIcon from '../../../../assets/book-list-settings/window-white.svg';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {useWidth} from '../../../../hooks/use-width';
import {
    setListView,
    setWindowView
} from '../../../../store/reducers/card-view-reducer';
import {setSortOrder} from '../../../../store/reducers/sort-order-reducer';
import {DataTestId} from '../../../../types/constants/data-test-id';

import classes from './list-settings.module.scss';

export const ListSettings = (props: {sortOrder: boolean, searchValue: string, setSearchValue: (searchValue: string) => void}) => {
    const dispatch = useAppDispatch();
    const {cardView} = useAppSelector(state => state.cardViewReducer);

    const screenWidth = useWidth();

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

    const searchState = window.innerWidth < 550 && isSearchOpen;

    return (
        <div className={classes.settings}>
            <div className={classes.searchAndSort}>
                {screenWidth && screenWidth < 550 ? <>
                        <form className={classes.searchForm} onChange={handleSearch}>
                            <input
                                className={isSearchOpen ? classNames(classes.search, {[classes.searchActive]: props.searchValue}) : classes.hide}
                                type="search" data-test-id={DataTestId.InputSearch}
                                placeholder="Поиск книги или автора…"/>
                            <button type="button" data-test-id={DataTestId.ButtonSearchClose}
                                    onClick={closeSearch}
                                    className={isSearchOpen ? classes.searchBtnClose : classes.hide}>
                                +
                            </button>
                        </form>
                        <button type="button" data-test-id={DataTestId.ButtonSearchOpen}
                                className={searchState ? classes.hide : classes.searchBtnOpen}
                                onClick={openSearch}>
                            <img src={searchIcon} alt="search-icon"/>
                        </button>
                    </> :
                    <form className={classes.searchForm} onChange={handleSearch}>
                        <input
                            className={classNames(classes.search, {[classes.searchActive]: props.searchValue})}
                            type="search" data-test-id={DataTestId.InputSearch}
                            placeholder="Поиск книги или автора…"/>
                    </form>}

                <button className={searchState ? classes.hide : classes.sort} type="button"
                        data-test-id={DataTestId.SortRatingButton}
                        onClick={changeOrder}>
                    <img className={props.sortOrder ? classes.sortIcon : classes.sortIconRotated}
                         src={SortIcon} alt="sort-icon"/>По рейтингу
                </button>
            </div>
            <div className={searchState ? classes.hide : classes.listStyle}>

                <button
                    className={cardView ? classNames(classes.gradient, classes.changeViewBtn) : classes.changeViewBtn}
                    onClick={() => dispatch(setWindowView())} type="button"
                    data-test-id={DataTestId.ButtonMenuViewWindow}
                ><img src={cardView ? WindowWhiteIcon : WindowGrayIcon} alt="window-icon"/>
                </button>

                <button
                    className={cardView ? classes.changeViewBtn : classNames(classes.gradient, classes.changeViewBtn)}
                    onClick={() => dispatch(setListView())} type="button"
                    data-test-id={DataTestId.ButtonMenuViewList}
                ><img src={cardView ? ListGrayIcon : ListWhiteIcon} alt="list-icon"/>
                </button>

            </div>
        </div>
    );
};

