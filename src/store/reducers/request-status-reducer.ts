import {createSlice} from '@reduxjs/toolkit';

interface RequestStatusState {
    isBaseResponseError: boolean;
    isRequestLoading: boolean;
    isCommentResponseError: boolean;
    isCommentResponseSuccess: boolean;
    isBookingCreateResponseError: boolean;
    isBookingCreateResponseSuccess: boolean;
    isBookingUpdateResponseError: boolean;
    isBookingUpdateResponseSuccess: boolean;
    isBookingCancelResponseError: boolean;
    isBookingCancelResponseSuccess: boolean;
}

const initialState: RequestStatusState = {
    isBaseResponseError: false,
    isRequestLoading: false,
    isCommentResponseError: false,
    isCommentResponseSuccess: false,
    isBookingCreateResponseError: false,
    isBookingCreateResponseSuccess: false,
    isBookingUpdateResponseError: false,
    isBookingUpdateResponseSuccess: false,
    isBookingCancelResponseError: false,
    isBookingCancelResponseSuccess: false,
}

export const RequestStatusReducer = createSlice({
        name: 'requestStatus',
        initialState,
        reducers: {
            setBaseResponseErrorTrue: (state) => {
                state.isBaseResponseError = true;
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
            setCommentResponseSuccessTrue: (state) => {
                state.isCommentResponseSuccess = true;
            },
            setBookingCreateResponseErrorTrue: (state) => {
                state.isBookingCreateResponseError = true;
            },
            setBookingCreateResponseSuccessTrue: (state) => {
                state.isBookingCreateResponseSuccess = true;
            },
            setBookingUpdateResponseErrorTrue: (state) => {
                state.isBookingUpdateResponseError = true;
            },
            setBookingUpdateResponseSuccessTrue: (state) => {
                state.isBookingUpdateResponseSuccess = true;
            },
            setBookingCancelResponseErrorTrue: (state) => {
                state.isBookingCancelResponseError = true;
            },
            setBookingCancelResponseSuccessTrue: (state) => {
                state.isBookingCancelResponseSuccess = true;
            },
            setResponseStatusesFalse: (state) => {
                state.isBaseResponseError = false;
                state.isBookingCreateResponseSuccess = false;
                state.isBookingCreateResponseError = false;
                state.isBookingUpdateResponseSuccess = false;
                state.isBookingUpdateResponseError = false;
                state.isBookingCancelResponseSuccess = false;
                state.isBookingCancelResponseError = false;
                state.isCommentResponseSuccess = false;
                state.isCommentResponseError = false;
            }
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
