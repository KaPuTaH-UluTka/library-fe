import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Menu } from './menu/menu';

import classes from './main-page.module.scss';

export const MainPage = () => {

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


    return (<section className={classes.mainPage} ref={ref}>
            {size.clientWidth && size.clientWidth > 899 && <Menu burger={false} isMenuOpen={true}/>}
            <Outlet />
        </section>
    );
};
