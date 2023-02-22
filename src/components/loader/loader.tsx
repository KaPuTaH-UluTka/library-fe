import loaderIcon from '../../assets/loader-icon/loadIcon.svg';

import classes from './loader.module.scss';

export const Loader = () => (
        <div className={classes.loader} data-test-id='loader'>
            <img src={loaderIcon} alt="loader-icon"/>
        </div>
    );
