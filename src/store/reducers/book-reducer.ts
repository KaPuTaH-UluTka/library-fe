import {createSlice} from '@reduxjs/toolkit';

import {BookInterface} from '../../types/book';

interface BooksState {
   books: BookInterface[]
}

const initialState: BooksState = {
    books: []
}

export const BooksReducer = createSlice({
        name: 'books',
        initialState,
        reducers: {
            setBooks: (state, books) => {
                state.books = books.payload;
            },
        }
    }
);

export default BooksReducer.reducer;
export const { setBooks } = BooksReducer.actions;
