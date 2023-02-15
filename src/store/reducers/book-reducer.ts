import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookCategoryInterface} from '../../types/book-category';
import {BookInterface} from '../../types/upd-book';
import {API_URL} from '../../utils/constants';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => '/categories',
        }),
        getAllBooks: builder.query<BookInterface[], void>({
            query: () => '/books',
        }),
        getBookById: builder.query<BookInterface, string | null>({
            query: (id) => `/books/${id}`,
        }),
    }),
});
