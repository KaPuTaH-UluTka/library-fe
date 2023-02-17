import {createSlice} from '@reduxjs/toolkit';

interface ErrorState {
    responseError: boolean
}

const initialState: ErrorState = {
    responseError: false
}

export const ErrorReducer = createSlice({
        name: 'list-view',
        initialState,
        reducers: {
            setErrorTrue: (state) => {
                state.responseError = true;
            },
            setErrorFalse: (state) => {
                state.responseError = false;
            }
        }
    }
);

export default ErrorReducer.reducer;
export const { setErrorTrue, setErrorFalse } = ErrorReducer.actions;
