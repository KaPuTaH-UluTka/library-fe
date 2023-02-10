import React, { useEffect, useRef, useState } from 'react';

import ListGrayIcon from '../../../../assets/book-list-settings/list-gray.svg';
import ListWhiteIcon from '../../../../assets/book-list-settings/list-white.svg';
import searchIcon from '../../../../assets/book-list-settings/search.svg';
import WindowGrayIcon from '../../../../assets/book-list-settings/window-gray.svg';
import WindowWhiteIcon from '../../../../assets/book-list-settings/window-white.svg';

import classes from './list-settings.module.scss';

export const ListSettings = (props: { listState: boolean, setListState: (arg0: boolean) => void }) => {

    const [isSearchOpen, searchOpenToggle] = useState(false);

    const [size, setSize] = useState<{ clientHeight: null | number, clientWidth: null | number }>({
        clientHeight: null,
        clientWidth: null
    });

    const ref = useRef<HTMLDivElement>(null);
    const resizeHandler = () => {
        if (ref.current) {
            const { clientHeight, clientWidth } = ref.current;

            setSize({ clientHeight, clientWidth });
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [size.clientWidth]);

    const searchState = size.clientWidth && size.clientWidth < 550 && isSearchOpen;
    const openSearch = () => {
        searchOpenToggle(true);
    };

    const closeSearch = () => {
        searchOpenToggle(false);
    };

    return (
        <div className={classes.settings} ref={ref}>
            <div className={classes['search-and-sort']}>
                {size.clientWidth && size.clientWidth < 550 ? <React.Fragment>
                    <form className={classes['search-form']}>
                        <input className={isSearchOpen ? classes.search : classes.hide}
                               type="search" data-test-id="input-search"
                               defaultValue="Поиск книги или автора..." />
                        <button type="button" data-test-id="button-search-close"
                                onClick={closeSearch}
                                className={isSearchOpen ? classes['search-btn-close'] : classes.hide}>
                            +
                        </button>
                    </form>
                    <button type="button" data-test-id="button-search-open"
                            className={searchState ? classes.hide : classes['search-btn-open']}
                            onClick={openSearch}>
                        <img src={searchIcon} alt="search-icon" />
                    </button>
                </React.Fragment> : <form className={classes['search-form']}>
                    <input className={classes.search} type="search" data-test-id="input-search"
                           defaultValue="Поиск книги или автора..." />
                </form>}

                <select className={searchState ? classes.hide : classes.sort} name="sort" id="sort">
                    <option value="rating-down">По рейтингу</option>
                </select>
            </div>
            <div className={searchState ? classes.hide : classes['list-style']}>

                <button
                    className={props.listState ? `${classes.gradient} ${classes['change-view-btn']}` : classes['change-view-btn']}
                    onClick={() => props.setListState(true)} type="button"
                    data-test-id="button-menu-view-window"
                ><img src={props.listState ? WindowWhiteIcon : WindowGrayIcon} alt="window-icon" />
                </button>

                <button
                    className={props.listState ? classes['change-view-btn'] : `${classes.gradient} ${classes['change-view-btn']}`}
                    onClick={() => props.setListState(false)} type="button"
                    data-test-id="button-menu-view-list"
                ><img src={props.listState ? ListGrayIcon : ListWhiteIcon} alt="list-icon" />
                </button>

            </div>
        </div>
    );
};

