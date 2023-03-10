import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {BookCategoryInterface} from '../../types/book-category';
import {ApiPaths} from '../../types/constants/constants';
import {
    AuthResponse,
    ForgotPassword,
    LoginUser,
    ResetPassword,
    User
} from '../../types/user';

import {API_URL} from './api-url';

export const libraryApi = createApi({
    reducerPath: 'libraryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api`
            }),
    endpoints: (builder) => ({
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => ({url: ApiPaths.categories, headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}}),
        }),
        getAllBooks: builder.query<BookCardInterface[], void>({
            keepUnusedDataFor: 0,
            query: () => ({url: ApiPaths.books, headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}}),
        }),
        getBookById: builder.query<BookInterface, string | null>({
            keepUnusedDataFor: 0,
            query: (id) => ({url: `${ApiPaths.books}/${id}`, headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}}),
        }),
        createUser: builder.mutation<AuthResponse,User>({
            query:(user) => ({
                url : ApiPaths.createUser,
                method : 'POST',
                body : user
            })
        }),
        loginUser: builder.mutation<AuthResponse,LoginUser>({
            query:(user) => ({
                url : ApiPaths.loginUser,
                method : 'POST',
                body : user
            })
        }),
        forgotPassword: builder.mutation<{ok: boolean}, ForgotPassword>({
            query:(email) => ({
                url : ApiPaths.forgotPassword,
                method : 'POST',
                body : email
            })
        }),
        resetPassword: builder.mutation<AuthResponse, ResetPassword>({
            query:(resetData) => ({
                url : ApiPaths.resetPassword,
                method : 'POST',
                body : resetData
            })
        })
    }),
});
