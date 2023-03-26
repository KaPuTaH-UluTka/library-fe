import React from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from '../../components/menu/menu';
import {useWidth} from '../../hooks/use-width';
import {DataTestId} from '../../types/constants/data-test-id';

import classes from './main-page.module.scss';

export const MainPage = () => {

    const width = useWidth();

    return (<section className={classes.mainPage} data-test-id={DataTestId.MainPage}>
            {width && width > 899 && <Menu burger={false} isMenuOpen={true}/>}
            <Outlet />
        </section>
    );
};
