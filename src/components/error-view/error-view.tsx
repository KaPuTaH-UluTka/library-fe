
import ErrorIcon from '../../assets/error-icon/errorIcon.svg';
import {useAppDispatch} from '../../hooks/redux';
import {setErrorFalse} from '../../store/reducers/error-reducer';

import classes from './error-view.module.scss'

export const ErrorView = () => {
    const dispatch = useAppDispatch();

    const closeError =() => {
        dispatch(setErrorFalse());
    }

    return (
        <div className={classes.error} data-test-id='error'>
            <div className={classes['error-info']}>
                <img className={classes['error-icon']} src={ErrorIcon} alt=""/>
                <p className={classes['error-title']}>Что-то пошло не так. Обновите страницу через
                    некоторое время.</p>
            </div>
            <button type="button" className={classes['error-close']}
                    onClick={closeError}>+
            </button>
        </div>
    )
};
