import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {bookApi} from './reducers/book-reducer';
import listViewReducer from './reducers/list-view-reducer';

const rootReducer = combineReducers({
    listViewReducer,
    [bookApi.reducerPath]: bookApi.reducer
});

export const store = () => configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(bookApi.middleware),
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']
