import {Navigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {AppPaths} from '../../types/constants/constants';
import {useAppSelector} from '../../hooks/redux';

export const MainLayout = ({ children }: { children: JSX.Element }) => {
    const {token} = useAppSelector(state => state.userReducer);

    if (!token) {
        return <Navigate to={AppPaths.auth} />;
    }

        return <>
            <Header />
            {children}
            <Footer />
        </>
    };
