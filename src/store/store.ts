import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {libraryApi} from './api/library-api';
import bookReducer from './reducers/book-reducer';
import categoryReducer from './reducers/category-reducer';
import requestStatusReducer from './reducers/request-status-reducer';
import cardViewReducer from './reducers/card-view-reducer';
import sortOrderReducer from './reducers/sort-order-reducer';
import userReducer from './reducers/user-reducer';

const rootReducer = combineReducers({
    cardViewReducer,
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
