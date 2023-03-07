import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';

import {AuthLayout} from './components/auth-layout/auth-layout';
import {MainLayout} from './components/main-layout/main-layout';
import {ForgotPass} from './pages/authorization/forgot-pass/forgot-pass';
import {Login} from './pages/authorization/login/login';
import {Registration} from './pages/authorization/registration/registration';
import {BookPage} from './pages/book/book-page';
import {Contract} from './pages/contract/contract';
import {BookList} from './pages/main/book-list/book-list';
import {MainPage} from './pages/main/main-page';
import {Terms} from './pages/terms/terms';
import {store} from './store/store';
import {AppPaths} from './types/constants/constants';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store()}>
            <HashRouter>
                <Routes>
                    <Route path={AppPaths.main} element={<MainLayout><MainPage/></MainLayout>}>
                        <Route path={AppPaths.main} element={<Navigate to="/books/all"/>}/>
                        <Route path={AppPaths.booksCategory} element={<BookList/>}/>
                        <Route path={AppPaths.contract} element={<Contract/>}/>
                        <Route path={AppPaths.terms} element={<Terms/>}/>
                    </Route>
                    <Route path={AppPaths.book}
                           element={
                               <MainLayout>
                                   <BookPage/>
                               </MainLayout>
                           }/>
                    <Route path={AppPaths.registration} element={<AuthLayout><Registration/></AuthLayout>}/>
                    <Route path={AppPaths.auth} element={<AuthLayout><Login/></AuthLayout>}/>
                    <Route path={AppPaths.forgotPass}  element={<AuthLayout><ForgotPass/></AuthLayout>}/>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
