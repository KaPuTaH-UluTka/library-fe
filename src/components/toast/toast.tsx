
import classNames from 'classnames';

import ErrorIcon from '../../assets/toast/errorIcon.svg';
import OkIcon from '../../assets/toast/okIcon.svg';
import {useAppDispatch} from '../../hooks/redux';
import {setErrorFalse} from '../../store/reducers/error-reducer';

import classes from './toast.module.scss'

interface ToastProps {
    error: boolean,

    message: string,

    testId: string,
}

export const Toast = ({error, message, testId}:ToastProps) => {
    const dispatch = useAppDispatch();

    const closeError = () => {
        dispatch(setErrorFalse());
    }

    return (
        <div className={classNames(classes.toast, {[classes.positive]: !error})} data-test-id={testId}>
            <div className={classes.toastInfo}>
                <img className={classes.toastIcon} src={error ? ErrorIcon : OkIcon} alt={error ? 'error' : 'ok'}/>
                <p className={classes.toastTitle}>{message}</p>
            </div>
            <button type="button" className={classes.toastBtn}
                    onClick={closeError}>+
            </button>
        </div>
    )
};
