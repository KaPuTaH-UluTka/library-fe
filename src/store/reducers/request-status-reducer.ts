import {createSlice} from '@reduxjs/toolkit';

import {ToastMessages} from '../../types/constants/constants';

interface RequestStatusState {
    isRequestLoading: boolean;
    isRequestFetching: boolean;
    isResponseError: boolean;
    isResponseSuccess: boolean;
    responseErrorText: string;
}

const initialState: RequestStatusState = {
    isRequestLoading: false,
    isRequestFetching: false,
    isResponseError: false,
    isResponseSuccess: false,
    responseErrorText: '',
}

export const RequestStatusReducer = createSlice({
        name: 'requestStatus',
        initialState,
        reducers: {
            setBaseResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.responseError;
            },
            setLoadingTrue: (state) => {
                state.isRequestLoading = true;
            },
            setLoadingFalse: (state) => {
                state.isRequestLoading = false;
            },
            setFetchingTrue: (state) => {
                state.isRequestFetching = true;
            },
            setFetchingFalse: (state) => {
                state.isRequestFetching = false;
            },
            setCommentResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.commentError;
            },
            setCommentResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.commentSuccess;
            },
            setCommentUpdateResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.generalUpdateError;
            },
            setCommentUpdateResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.commentUpdateSuccess;
            },
            setUserUpdateResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.generalUpdateError;
            },
            setUserUpdateResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.generalUpdateSuccess;
            },
            setAvatarUpdateResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.avatarError;
            },
            setAvatarUpdateResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.avatarSuccess;
            },
            setBookingCreateResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.bookingCreateError;
            },
            setBookingCreateResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.bookingCreateSuccess;
            },
            setBookingUpdateResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.generalUpdateError;
            },
            setBookingUpdateResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.generalUpdateSuccess;
            },
            setBookingCancelResponseErrorTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseError = true;
                state.responseErrorText = ToastMessages.bookingCancelError;
            },
            setBookingCancelResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.bookingCancelSuccess;
            },
            setResponseStatusesFalse: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.responseErrorText = '';
            },
        }
    }
);

export default RequestStatusReducer.reducer;
export const {
    setBaseResponseErrorTrue,
    setLoadingTrue,
    setLoadingFalse,
    setFetchingTrue,
    setFetchingFalse,
    setCommentResponseErrorTrue,
    setCommentResponseSuccessTrue,
    setCommentUpdateResponseErrorTrue,
    setCommentUpdateResponseSuccessTrue,
    setAvatarUpdateResponseErrorTrue,
    setAvatarUpdateResponseSuccessTrue,
    setUserUpdateResponseErrorTrue,
    setUserUpdateResponseSuccessTrue,
    setBookingCreateResponseErrorTrue,
    setBookingCreateResponseSuccessTrue,
    setBookingUpdateResponseErrorTrue,
    setBookingUpdateResponseSuccessTrue,
    setBookingCancelResponseSuccessTrue,
    setBookingCancelResponseErrorTrue,
    setResponseStatusesFalse,
} = RequestStatusReducer.actions;
