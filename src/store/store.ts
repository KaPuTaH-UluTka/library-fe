import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {libraryApi} from './api/library-api';
import bookReducer from './reducers/book-reducer';
import categoryReducer from './reducers/category-reducer';
import requestStatusReducer from './reducers/request-status-reducer';
import listViewReducer from './reducers/list-view-reducer';
import sortOrderReducer from './reducers/sort-order-reducer';
import userReducer from './reducers/user-reducer';

const rootReducer = combineReducers({
    listViewReducer,
    requestStatusReducer,
    categoryReducer,
    sortOrderReducer,
    bookReducer,
    userReducer,
    [libraryApi.reducerPath]: libraryApi.reducer
});

export const store = () => configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(libraryApi.middleware),
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']
