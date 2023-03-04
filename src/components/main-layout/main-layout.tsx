import {Navigate} from 'react-router-dom';

import {Footer} from '../../footer/footer';
import {Header} from '../../header/header';
import {AppPaths} from '../../types/constants/constants';

export const MainLayout = ({ children }: { children: JSX.Element }) => {
    const token = false;

    if (!token) {
        return <Navigate to={AppPaths.auth} />;
    }

        return <>
            <Header />
            {children}
            <Footer />
        </>
    };
