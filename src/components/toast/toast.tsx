import {useCallback, useEffect} from 'react';
import classNames from 'classnames';

import ErrorIcon from '../../assets/toast/errorIcon.svg';
import OkIcon from '../../assets/toast/okIcon.svg';
import {useAppDispatch} from '../../hooks/redux';
import {setResponseStatusesFalse} from '../../store/reducers/request-status-reducer';
import {DataTestId} from '../../types/constants/constants';

import classes from './toast.module.scss'

interface ToastProps {
    error: boolean,
    message: string,

}

export const Toast = ({error, message}: ToastProps) => {

    const dispatch = useAppDispatch();

    const closeError = useCallback(() => {
        dispatch(setResponseStatusesFalse());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            closeError();
        }, 4000)
    }, [closeError, dispatch]);

    return (
        <div className={classNames(classes.toast, {[classes.positive]: !error})}
             data-test-id={DataTestId.Error}>
            <div className={classes.toastInfo}>
                <img className={classes.toastIcon} src={error ? ErrorIcon : OkIcon}
                     alt={error ? 'error' : 'ok'}/>
                <p className={classes.toastTitle}>{message}</p>
            </div>
            <button type="button" className={classes.toastBtn} data-test-id={DataTestId.AlertClose}
                    onClick={closeError}>+
            </button>
        </div>
    )
};
