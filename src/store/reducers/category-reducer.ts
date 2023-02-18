import {createSlice} from '@reduxjs/toolkit';

import {BookCategoryInterface} from '../../types/book-category';

interface CategoryState {
    currentCategory: BookCategoryInterface
}

const initialState: CategoryState = {
    currentCategory: {name: 'Все книги', path: 'all', id: 0}
}

export const CategoryReducer = createSlice({
        name: 'list-view',
        initialState,
        reducers: {
            setCategory: (state, category) => {
                state.currentCategory = category.payload;
            }
        }
    }
);

export default CategoryReducer.reducer;
export const { setCategory } = CategoryReducer.actions;
