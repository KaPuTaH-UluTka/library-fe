import {createSlice} from '@reduxjs/toolkit';

import {ToastMessages} from '../../types/constants/constants';

interface RequestStatusState {
    isRequestLoading: boolean;
    isResponseError: boolean;
    isResponseSuccess: boolean;
    responseErrorText: string;
}

const initialState: RequestStatusState = {
    isRequestLoading: false,
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
                state.responseErrorText = ToastMessages.bookingUpdateError;
            },
            setBookingUpdateResponseSuccessTrue: (state) => {
                state.isResponseError = false;
                state.isResponseSuccess = false;
                state.isResponseSuccess = true;
                state.responseErrorText = ToastMessages.bookingUpdateSuccess;
            },
            // setBookingUpdateResponseErrorTrue: (state) => {
            //     state.isBookingUpdateResponseError = true;
            // },
            // setBookingUpdateResponseSuccessTrue: (state) => {
            //     state.isBookingUpdateResponseSuccess = true;
            // },
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
    setCommentResponseErrorTrue,
    setCommentResponseSuccessTrue,
    setBookingCreateResponseErrorTrue,
    setBookingCreateResponseSuccessTrue,
    setBookingUpdateResponseErrorTrue,
    setBookingUpdateResponseSuccessTrue,
    setBookingCancelResponseSuccessTrue,
    setBookingCancelResponseErrorTrue,
    setResponseStatusesFalse,
} = RequestStatusReducer.actions;
