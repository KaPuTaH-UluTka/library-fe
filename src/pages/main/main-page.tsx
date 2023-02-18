import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import {ErrorView} from '../../components/error-view/error-view';
import {useAppSelector} from '../../hooks/redux';

import { Menu } from './menu/menu';

import classes from './main-page.module.scss';

export const MainPage = () => {
    const testId = {
        burgerNav: '',
        showcaseId: 'navigation-showcase',
        booksId: 'navigation-books',
        termsId: 'navigation-terms',
        contractId: 'navigation-contract'
    };


    const [size, setSize] = useState<{clientHeight: null | number, clientWidth: null | number}>({clientHeight: null, clientWidth: null});

    const ref = useRef<HTMLElement>(null);
    const resizeHandler = () => {
        if(ref.current){
            const { clientHeight, clientWidth } = ref.current;

            setSize({ clientHeight, clientWidth });
        }
    };


    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);


    return (<section className={classes['main-page']} ref={ref}>
            {size.clientWidth && size.clientWidth > 900 && <Menu burger={false} testId={testId} isMenuOpen={true}/>}
            <Outlet />
        </section>
    );
};
