import loaderIcon from '../../assets/loader-icon/loadIcon.svg';
import {DataTestId} from '../../types/constants/data-test-id';

import classes from './loader.module.scss';

export const Loader = () => (
        <div className={classes.loader} data-test-id={DataTestId.Loader} onClick={e => e.stopPropagation()}>
            <img src={loaderIcon} alt="loader-icon"/>
        </div>
    );
