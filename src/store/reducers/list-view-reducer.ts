import {createSlice} from '@reduxjs/toolkit';

interface ListState {
    listView: boolean
}

const initialState: ListState = {
    listView: true
}

export const ListViewReducer = createSlice({
        name: 'list-view',
        initialState,
        reducers: {
            setWindowView: (state) => {
                state.listView = true;
            },
            setListView: (state) => {
                state.listView = false;
            }
        }
    }
);

export default ListViewReducer.reducer;
export const { setWindowView, setListView } = ListViewReducer.actions;
