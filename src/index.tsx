import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';

import {Footer} from './footer/footer';
import {Header} from './header/header';
import {BookPage} from './pages/book/book-page';
import {Contract} from './pages/contract/contract';
import {BookList} from './pages/main/book-list/book-list';
import {MainPage} from './pages/main/main-page';
import {Terms} from './pages/terms/terms';
import {store} from './store/store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store()}>
            <HashRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                        <Route path="/" element={<Navigate to="/books/all"/>}/>
                        <Route path="/books/:category" element={<BookList/>}/>
                        <Route path="/contract" element={<Contract/>}/>
                        <Route path="/terms" element={<Terms/>}/>
                    </Route>
                    <Route path="/books/:category/:bookId" element={<BookPage/>}/>
                </Routes>
                <Footer/>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
