import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {BookCategoryInterface} from '../../types/book-category';
import {API_URL} from '../../utils/constants';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => '/categories',
        }),
        getAllBooks: builder.query<BookCardInterface[], void>({
            query: () => '/books',
        }),
        getBookById: builder.query<BookInterface, string | null>({
            query: (id) => `/books/${id}`,
        }),
    }),
});
