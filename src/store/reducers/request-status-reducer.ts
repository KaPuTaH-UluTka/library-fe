import {createSlice} from '@reduxjs/toolkit';

interface RequestStatusState {
    responseError: boolean
    isRequestLoading: boolean
    isCommentResponseError: boolean
    isCommentResponseSuccess: boolean
    isBookingResponseError: boolean
    isBookingResponseSuccess: boolean
}

const initialState: RequestStatusState = {
    responseError: false,
    isRequestLoading: false,
    isCommentResponseError: false,
    isCommentResponseSuccess: false,
    isBookingResponseError: false,
    isBookingResponseSuccess: false,
}

export const RequestStatusReducer = createSlice({
        name: 'requestStatus',
        initialState,
        reducers: {
            setErrorTrue: (state) => {
                state.responseError = true;
            },
            setErrorFalse: (state) => {
                state.responseError = false;
            },
            setLoadingTrue: (state) => {
                state.isRequestLoading = true;
            },
            setLoadingFalse: (state) => {
                state.isRequestLoading = false;
            },
            setCommentResponseErrorTrue: (state) => {
                state.isCommentResponseError = true;
            },
            setCommentResponseErrorFalse: (state) => {
                state.isCommentResponseError = false;
            },
            setCommentResponseSuccessTrue: (state) => {
                state.isCommentResponseSuccess = true;
            },
            setCommentResponseSuccessFalse: (state) => {
                state.isCommentResponseSuccess = false;
            },
            setBookingResponseErrorTrue: (state) => {
                state.isBookingResponseError = true;
            },
            setBookingResponseErrorFalse: (state) => {
                state.isBookingResponseError = false;
            },
            setBookingResponseSuccessTrue: (state) => {
                state.isBookingResponseSuccess = true;
            },
            setBookingResponseSuccessFalse: (state) => {
                state.isBookingResponseSuccess = false;
            },
            setResponseStatusesFalse: (state) => {
                state.isBookingResponseSuccess = false;
                state.isBookingResponseError = false;
                state.isCommentResponseSuccess = false;
                state.isCommentResponseError = false;
            }
        }
    }
);

export default RequestStatusReducer.reducer;
export const {
    setErrorTrue,
    setErrorFalse,
    setLoadingTrue,
    setLoadingFalse,
    setCommentResponseErrorTrue,
    setCommentResponseErrorFalse,
    setBookingResponseErrorTrue,
    setBookingResponseErrorFalse,
    setCommentResponseSuccessFalse,
    setCommentResponseSuccessTrue,
    setBookingResponseSuccessTrue,
    setBookingResponseSuccessFalse,
    setResponseStatusesFalse,
} = RequestStatusReducer.actions;
