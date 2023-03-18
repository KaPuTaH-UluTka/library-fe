import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {BookCategoryInterface} from '../../types/book-category';
import {
    BookingRequest,
    BookingResponse,
} from '../../types/booking';
import {ApiPaths} from '../../types/constants/constants';
import {ReviewFields, ReviewResponse} from '../../types/review';
import {
    AuthResponse,
    ForgotPassword,
    LoginUser,
    ResetPassword,
    User
} from '../../types/user';
import {RootState} from '../store';

import {API_URL} from './api-url';

export const libraryApi = createApi({
    reducerPath: 'libraryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api`, prepareHeaders: (headers, { getState }) => {
            const {token} = (getState() as RootState).userReducer

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Book', 'AllBooks'],
    endpoints: (builder) => ({
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => ({
                url: ApiPaths.categories,
            }),
        }),
        getAllBooks: builder.query<BookCardInterface[], void>({
            keepUnusedDataFor: 0,
            query: () => ({
                url: ApiPaths.books,
            }),
            providesTags: () => ['AllBooks']
        }),
        getBookById: builder.query<BookInterface, string>({
            keepUnusedDataFor: 0,
            query: (id) => ({
                url: `${ApiPaths.books}/${id}`,
            }),
            providesTags: () => ['Book']
        }),
        createComment: builder.mutation<ReviewResponse, { data: ReviewFields }>({
            query: (comment) => ({
                url: ApiPaths.comment,
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: ['Book']
        }),
        updateComment: builder.mutation<BookInterface, { id: string, data: ReviewFields }>({
            query: ({id, data}) => ({
                url: `${ApiPaths.comment}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        createBooking: builder.mutation<BookingResponse, BookingRequest>({
            query: (data) => ({
                url: ApiPaths.booking,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Book', 'AllBooks']
        }),
        updateBooking: builder.mutation<BookingResponse, {bookingId: string, data: BookingRequest }>({
            query: ({bookingId, data}) => ({
                url: `${ApiPaths.booking}/${bookingId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Book', 'AllBooks']
        }),
        cancelBooking: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ApiPaths.booking}/${id}`,
                method: 'DElETE',
            }),
            invalidatesTags: ['Book', 'AllBooks']
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
