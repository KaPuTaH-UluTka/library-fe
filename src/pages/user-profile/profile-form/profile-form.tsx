import React from 'react';

import {CustomButton} from '../../../components/custom-elements/button/custom-button';
import {CustomInput} from '../../../components/custom-elements/input/custom-input';
import {DataTestId} from '../../../types/constants/data-test-id';
import {BtnType, BtnVariant, Size} from '../../../types/custom-element';

import {useProfileForm} from './use-profile-form';

import classes from './profile-form.module.scss';

export const ProfileForm = () => {
    const {handleSubmit,submitHandler,register,errors,watch,errorsUsername,isInputsDisabled,errorsPassword,editHandler} = useProfileForm();

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={classes.profileForm}
              data-test-id={DataTestId.ProfileForm}>
            <div className={classes.rowWrapper}>
                <div className={classes.inputRow}>
                    <CustomInput
                        label='username'
                        register={register('login', {required: true})}
                        error={errors.login}
                        placeholder='Придумайте логин для входа'
                        watchName={watch('login')}
                        type='text'
                        errors={errorsUsername}
                        isFullColorError={!!errors.login}
                        isDisabled={isInputsDisabled}
                    />
                    <CustomInput
                        label='password'
                        register={register('password')}
                        error={errors.password}
                        placeholder='Пароль'
                        watchName={watch('password')}
                        type='password'
                        errors={errorsPassword}
                        isFullColorError={!!errors.password}
                        isDisabled={isInputsDisabled}
                    />
                </div>
                <div className={classes.inputRow}>
                    <CustomInput
                        label='firstName'
                        register={register('firstName')}
                        error={errors.firstName}
                        placeholder='Имя'
                        watchName={watch('firstName')}
                        type='text'
                        isDisabled={isInputsDisabled}
                    />
                    <CustomInput
                        label='lastName'
                        register={register('lastName')}
                        error={errors.lastName}
                        placeholder='Фамилия'
                        watchName={watch('lastName')}
                        type='text'
                        isDisabled={isInputsDisabled}
                    />
                </div>
                <div className={classes.inputRow}>
                    <CustomInput
                        label='phone'
                        register={register('phone')}
                        messageHelper='В формате +375 (xx) xxx-xx-xx'
                        error={errors.phone}
                        placeholder='Номер телефона'
                        watchName={watch('phone')}
                        type='text'
                        mask='+375 (99) 999-99-99'
                        maskPlaceholder='x'
                        fromProfile={true}
                        isDisabled={isInputsDisabled}
                    />
                    <CustomInput
                        label='email'
                        register={register('email')}
                        error={errors.email}
                        placeholder='E-mail'
                        watchName={watch('email')}
                        type='email'
                        isDisabled={isInputsDisabled}
                    />
                </div>
            </div>
            <div className={classes.btnWrapper}>
                <CustomButton type={BtnType.button} text="Редактировать" size={Size.big}
                              variant={BtnVariant.secondary} dataTestId={DataTestId.EditButton}
                              clickHandler={editHandler}/>
                <CustomButton type={BtnType.submit} text="Сохранить изменения" size={Size.big}
                              variant={BtnVariant.primary} isDisabled={isInputsDisabled}
                              dataTestId={DataTestId.SaveButton}
                              clickHandler={() => submitHandler}/>
            </div>
        </form>
    );
};
