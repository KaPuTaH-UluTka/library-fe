import React from 'react';
import classNames from 'classnames';

import ListGrayIcon from '../../../../assets/book-list-settings/list-gray.svg';
import ListWhiteIcon from '../../../../assets/book-list-settings/list-white.svg';
import SortIcon from '../../../../assets/book-list-settings/rating-sort.svg';
import searchIcon from '../../../../assets/book-list-settings/search.svg';
import WindowGrayIcon from '../../../../assets/book-list-settings/window-gray.svg';
import WindowWhiteIcon from '../../../../assets/book-list-settings/window-white.svg';
import {
    setListView,
    setWindowView
} from '../../../../store/reducers/card-view-reducer';
import {DataTestId} from '../../../../types/constants/data-test-id';

import {useListSettings} from './use-list-settings';

import classes from './list-settings.module.scss';

export interface ListSettingsProps {
    sortOrder: boolean,
    searchValue: string,
    setSearchValue: (searchValue: string) => void
}

export const ListSettings = ({sortOrder, searchValue, setSearchValue}: ListSettingsProps) => {
    const {
        screenWidth,
        handleSearch,
        isSearchOpen,
        closeSearch,
        searchState,
        openSearch,
        changeOrder,
        cardView,
        dispatch
    } = useListSettings({setSearchValue})

    return (
        <div className={classes.settings}>
            <div className={classes.searchAndSort}>
                {screenWidth && screenWidth < 550 ? <>
                        <form className={classes.searchForm} onChange={handleSearch}>
                            <input
                                className={isSearchOpen ? classNames(classes.search, {[classes.searchActive]: searchValue}) : classes.hide}
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
                            className={classNames(classes.search, {[classes.searchActive]: searchValue})}
                            type="search" data-test-id={DataTestId.InputSearch}
                            placeholder="Поиск книги или автора…"/>
                    </form>}

                <button className={searchState ? classes.hide : classes.sort} type="button"
                        data-test-id={DataTestId.SortRatingButton}
                        onClick={changeOrder}>
                    <img className={sortOrder ? classes.sortIcon : classes.sortIconRotated}
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

