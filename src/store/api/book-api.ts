import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {BookCategoryInterface} from '../../types/book-category';
import {ApiPaths} from '../../types/constants/constants';

import {API_URL} from './api-url';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => ApiPaths.categories,
        }),
        getAllBooks: builder.query<BookCardInterface[], void>({
            keepUnusedDataFor: 0,
            query: () => ApiPaths.books,
        }),
        getBookById: builder.query<BookInterface, string | null>({
            keepUnusedDataFor: 0,
            query: (id) => `${ApiPaths.books}/${id}`,
        }),
    }),
});
