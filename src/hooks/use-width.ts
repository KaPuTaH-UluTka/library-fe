import {useEffect, useState} from 'react';

export const useWidth = () => {
    const [width, setWidth] = useState<null | number>();
    const resizeHandler = () => {
        const { innerWidth } = window;

        setWidth(innerWidth);
    };


    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return width;
}
