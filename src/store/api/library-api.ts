import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {BookCategoryInterface} from '../../types/book-category';
import {BookingFields, BookingResponse} from '../../types/booking';
import {ApiPaths} from '../../types/constants/constants';
import {ReviewFields, ReviewResponse} from '../../types/review';
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
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api`
    }),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => ({
                url: ApiPaths.categories,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
        getAllBooks: builder.query<BookCardInterface[], void>({
            keepUnusedDataFor: 0,
            query: () => ({
                url: ApiPaths.books,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
        getBookById: builder.query<BookInterface, string>({
            keepUnusedDataFor: 0,
            query: (id) => ({
                url: `${ApiPaths.books}/${id}`,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
            providesTags: () => ['Book']
        }),
        createComment: builder.mutation<ReviewResponse, { data: ReviewFields }>({
            query: (comment) => ({
                url: ApiPaths.comment,
                method: 'POST',
                body: comment,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
            invalidatesTags: ['Book']
        }),
        updateComment: builder.mutation<BookInterface, { id: string, comment: BookingFields }>({
            query: ({id, comment}) => ({
                url: `${ApiPaths.comment}/${id}`,
                method: 'PUT',
                body: comment,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
        createBooking: builder.mutation<BookingResponse, BookingFields>({
            query: (bookingOrder) => ({
                url: ApiPaths.booking,
                method: 'POST',
                body: bookingOrder,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
            invalidatesTags: ['Book']
        }),
        updateBooking: builder.mutation<BookingResponse, { id: string, bookingOrder: BookingFields }>({
            query: ({id, bookingOrder}) => ({
                url: `${ApiPaths.booking}/${id}`,
                method: 'PUT',
                body: bookingOrder,
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
        deleteBooking: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ApiPaths.booking}/${id}`,
                method: 'DElETE',
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
        createUser: builder.mutation<AuthResponse, User>({
            query: (user) => ({
                url: ApiPaths.createUser,
                method: 'POST',
                body: user
            })
        }),
        loginUser: builder.mutation<AuthResponse, LoginUser>({
            query: (user) => ({
                url: ApiPaths.loginUser,
                method: 'POST',
                body: user
            })
        }),
        forgotPassword: builder.mutation<{ ok: boolean }, ForgotPassword>({
            query: (email) => ({
                url: ApiPaths.forgotPassword,
                method: 'POST',
                body: email
            })
        }),
        resetPassword: builder.mutation<AuthResponse, ResetPassword>({
            query: (resetData) => ({
                url: ApiPaths.resetPassword,
                method: 'POST',
                body: resetData
            })
        })
    }),
});
