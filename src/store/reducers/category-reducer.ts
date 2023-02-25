import {createSlice} from '@reduxjs/toolkit';

import {BookCategoryInterface} from '../../types/book-category';

interface CategoryState {
    currentCategory: BookCategoryInterface
    categories: BookCategoryInterface[] | null
}

const initialState: CategoryState = {
    currentCategory: {name: 'Все книги', path: 'all', id: 0},
    categories: null
}

export const CategoryReducer = createSlice({
        name: 'category',
        initialState,
        reducers: {
            setCategory: (state, category) => {
                state.currentCategory = category.payload;
            },
            setCategories: (state, categories) => {
                state.categories = categories.payload;
            }
        }
    }
);

export default CategoryReducer.reducer;
export const { setCategory, setCategories } = CategoryReducer.actions;
