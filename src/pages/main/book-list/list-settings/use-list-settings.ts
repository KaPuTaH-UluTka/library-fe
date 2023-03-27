import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {useWidth} from '../../../../hooks/use-width';
import {setSortOrder} from '../../../../store/reducers/sort-order-reducer';

export const useListSettings = ({setSearchValue}: { setSearchValue: (searchValue: string) => void }) => {
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

        setSearchValue(target.value);
    }

    const changeOrder = () => {
        dispatch(setSortOrder());
    }

    const searchState = screenWidth && screenWidth < 550 && isSearchOpen;

    return {
        screenWidth,
        handleSearch,
        isSearchOpen,
        closeSearch,
        searchState,
        openSearch,
        changeOrder,
        cardView,
        dispatch
    }
}
