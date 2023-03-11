import loaderIcon from '../../assets/loader-icon/loadIcon.svg';

import classes from './loader.module.scss';
import {DataTestId} from "../../types/constants/constants";

export const Loader = () => (
        <div className={classes.loader} data-test-id={DataTestId.Loader}>
            <img src={loaderIcon} alt="loader-icon"/>
        </div>
    );
