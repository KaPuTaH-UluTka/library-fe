import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import classes from './registration.module.scss';

export const Registration = () => {
    const [stageOne, setStageOne] = useState(true);
    const [stageTwo, setStageTwo] = useState(false);
    const [stageThree, setStageThree] = useState(false);
    const [stageCounter, setStageCounter] = useState(1);

    const toSecondStage = () => {
        setStageOne(false);
        setStageTwo(true);
        setStageCounter(stageCounter + 1);
    }

    const toThirdStage = () => {
        setStageTwo(false);
        setStageThree(true);
        setStageCounter(stageCounter + 1);
    }

    const registration = () => {

    }

    return (
        <div className={classes['registration-wrapper']}>
            <div className={classes.registration}>
                <h2 className={classes['registration-title']}>Регистрация</h2>
                <p className={classes['registration-counter']}>{`${stageCounter} шаг из 3`}</p>
                <form className={classes['registration-form']}>
                    {stageOne && <><input
                        className={classNames(classes['registration-form-input'], classes['registration-form-login'])}
                        placeholder="Придумайте логин для входа" type="text"/>
                        <input
                            className={classNames(classes['registration-form-input'], classes['registration-form-password'])}
                            placeholder="Пароль" type="password"/></>}
                    {stageTwo && <><input
                        className={classNames(classes['registration-form-input'], classes['registration-form-name'])}
                        placeholder="Имя" type="text"/>
                        <input
                            className={classNames(classes['registration-form-input'], classes['registration-form-surname'])}
                            placeholder="Фамилия" type="text"/></>}
                    {stageThree && <><input
                        className={classNames(classes['registration-form-input'], classes['registration-form-phone'])}
                        placeholder="Номер телефона" type="tel"/>
                        <input
                            className={classNames(classes['registration-form-input'], classes['registration-form-mail'])}
                            placeholder="E-mail" type="email"/></>}
                    {stageOne && <button type="submit" className={classes['registration-form-btn']}
                                         onClick={toSecondStage}>Следующий шаг</button>}
                    {stageTwo && <button type="submit" className={classes['registration-form-btn']}
                                         onClick={toThirdStage}>Последний шаг</button>}
                    {stageThree &&
                        <button type="submit" className={classes['registration-form-btn']}
                                onClick={registration}>Зарегистрироваться</button>}
                </form>
                <p className={classes['registration-account-exist']}>Есть учётная запись?</p>
                <Link className={classes['registration-login-link']} to="/users/login">Войти</Link>
            </div>
        </div>
    );
};
