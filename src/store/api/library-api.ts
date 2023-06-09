import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BookInterface} from '../../types/book';
import {BookCardInterface} from '../../types/book-card';
import {BookCategoryInterface} from '../../types/book-category';
import {
    BookingRequest,
    BookingResponse,
} from '../../types/booking';
import {ApiPaths} from '../../types/constants/paths';
import {CommentFields, CommentResponse} from '../../types/review';
import {ImageFull} from '../../types/upload-images';
import {
    AuthResponse,
    ForgotPassword,
    LoginUser, RegisteredUser,
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
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Book', 'AllBooks', 'User'],
    endpoints: (builder) => ({
        getAllBooks: builder.query<BookCardInterface[], void>({
            keepUnusedDataFor: 0,
            query: () => ({
                url: ApiPaths.books,
            }),
            providesTags: () => ['AllBooks']
        }),
        getBookCategories: builder.query<BookCategoryInterface[], void>({
            query: () => ({
                url: ApiPaths.categories,
            }),
        }),
        getBookById: builder.query<BookInterface | BookInterface[], number>({
            keepUnusedDataFor: 0,
            query: (id) => ({
                url: `${ApiPaths.books}/${id}`,
            }),
            providesTags: () => ['Book']
        }),
        createComment: builder.mutation<CommentResponse, { data: CommentFields }>({
            query: (comment) => ({
                url: ApiPaths.comment,
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: ['Book', 'User']
        }),
        updateComment: builder.mutation<CommentResponse, { commentId: number, data: CommentFields }>({
            query: ({commentId, data}) => ({
                url: `${ApiPaths.comment}/${commentId}`,
                method: 'PUT',
                body: {data},
            }),
            invalidatesTags: ['Book', 'User']
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
            invalidatesTags: ['Book', 'AllBooks', 'User']
        }),
        createUser: builder.mutation<AuthResponse, User>({
            query: (user) => ({
                url: ApiPaths.createUser,
                method: 'POST',
                body: user
            })
        }),
        updateUser: builder.mutation<RegisteredUser, {userId: number, user: User }>({
            query: ({userId, user}) => ({
                url:`${ApiPaths.updateUser}/${userId}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        uploadAvatar: builder.mutation<ImageFull[], FormData>({
            query: (file) => ({
                url:ApiPaths.uploadAvatar,
                method: 'POST',
                body: file,
            }),
        }),
        updateAvatar: builder.mutation<RegisteredUser,{userId: number, avatar: number}>({
            query: ({userId, avatar}) => ({
                url:`${ApiPaths.updateUser}/${userId}`,
                method: 'PUT',
                body: {avatar}
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation<AuthResponse, LoginUser>({
            query: (user) => ({
                url: ApiPaths.loginUser,
                method: 'POST',
                body: user
            })
        }),
        me: builder.query<RegisteredUser, void>({
            query: () => ({
                url: ApiPaths.me,
            }),
            providesTags: () => ['User']
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
