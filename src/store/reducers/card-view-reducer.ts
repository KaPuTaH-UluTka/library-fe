import {createSlice} from '@reduxjs/toolkit';

interface ListState {
    cardView: boolean
}

const initialState: ListState = {
    cardView: true
}

export const CardViewReducer = createSlice({
        name: 'cardView',
        initialState,
        reducers: {
            setWindowView: (state) => {
                state.cardView = true;
            },
            setListView: (state) => {
                state.cardView = false;
            }
        }
    }
);

export default CardViewReducer.reducer;
export const { setWindowView, setListView } = CardViewReducer.actions;
