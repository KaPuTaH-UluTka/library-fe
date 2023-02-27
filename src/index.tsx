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
import {Login} from './pages/welcome/login/login';
import {Registration} from './pages/welcome/registration/registration';
import {Welcome} from './pages/welcome/welcome';
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
                    <Route path="/users" element={<Welcome/>}>
                        <Route path="registration" element={<Registration/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
