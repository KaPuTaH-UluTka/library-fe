import {createSlice} from '@reduxjs/toolkit';

interface SortState {
    sortOrder: boolean
}

const initialState: SortState = {
    sortOrder: false
}

export const SortReducer = createSlice({
        name: 'sort-order',
        initialState,
        reducers: {
            setSortOrder: (state) => {
                state.sortOrder = !state.sortOrder;
            },
        }
    }
);

export default SortReducer.reducer;
export const { setSortOrder } = SortReducer.actions;
