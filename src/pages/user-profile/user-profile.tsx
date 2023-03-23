import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import defaultAvatar from '../../assets/header/defaultAvatar.jpg';
import AddAvatarIcon from '../../assets/addAvatar.svg';
import {CustomInput} from '../../components/custom-elements/input/custom-input';
import {Plug} from '../../components/plug/plug';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useRegistrationErrors} from '../../hooks/use-registration-errors';
import {API_URL} from '../../store/api/api-url';
import {libraryApi} from '../../store/api/library-api';
import {DataTestId, PlugMessages, ProfileSectionText} from '../../types/constants/constants';
import {User} from '../../types/user';
import {editUserProfileSchema, passwordSchema, usernameSchema} from '../../validation/validation';
import {BookCard} from '../main/book-list/book-card/book-card';

import classes from './user-profile.module.scss';
import {ProfileSectionHeader} from "./profile-section-header/profile-section-header";

export const UserProfile = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const [uploadedAvatar, setUploadedAvatar] = useState('');

    const {register, formState: {errors}, handleSubmit, watch, clearErrors} = useForm<User>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        shouldFocusError: false,
        defaultValues: {
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            email: user?.email
        },
        resolver: yupResolver(editUserProfileSchema)
    });

    const [updateUser] = libraryApi.useUpdateUserMutation();

    const [updateAvatar] = libraryApi.useUpdateAvatarMutation();

    const [uploadAvatar, {
        isError: isUploadError,
        reset: uploadReset,
        data: avatarResponse,
        isSuccess: isUploadSuccess
    }] = libraryApi.useUploadAvatarMutation();

    const submitHandler = (data: User) => {
        if (user?.id) {
            updateUser({userId: user?.id, user: data});
        }
    }

    const {errorsArr: errorsUsername} = useRegistrationErrors(usernameSchema, watch('username'), 'username');
    const {errorsArr: errorsPassword} = useRegistrationErrors(passwordSchema, watch('password'), 'password');

    const avatarHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();

            formData.append('files', e.target.files[0]);

            const file = URL.createObjectURL(e.target.files[0]);

            uploadAvatar(formData);

            setUploadedAvatar(file);
        }
    }

    const currentAvatar = (): string => {
        if (uploadedAvatar) return uploadedAvatar;

        return user?.avatar ? API_URL + user.avatar : defaultAvatar;
    }

    console.log(user);


    useEffect(() => {
        if (isUploadSuccess && user?.id && avatarResponse) {

            const avatarId = avatarResponse[0].id;

            updateAvatar({userId: user?.id, avatar: avatarId});
        }
        if (isUploadError) uploadReset();
    }, [avatarResponse, isUploadError, isUploadSuccess, updateAvatar, uploadReset, user?.id]);

    return (
        <div className={classes.profileWrapper}>
            <div className={classes.userProfile}>
                <div className={classes.userAvatarEdit}>
                    <div className={classes.userAvatarWrapper}
                         data-test-id={DataTestId.ProfileAvatar}>
                        <label className={classes.userAvatarUpload} htmlFor="avatarUpload">
                            <img className={classes.userAvatar} src={currentAvatar()} alt="avatar"/>
                            <div className={classes.userAvatarMask}>
                                <img className={classes.avatarMaskIcon} src={AddAvatarIcon} alt=""/>
                            </div>
                            <input className={classes.avatarUploadInput} id="avatarUpload"
                                   onChange={avatarHandler} type="file"/>
                        </label>
                    </div>
                    <h2 className={classes.userName}>{`${user?.firstName}\n${user?.lastName}`}</h2>
                </div>
                <div className={classes.userInfo}>
                    <ProfileSectionHeader title={ProfileSectionText.userDataTitle}
                                          description={ProfileSectionText.userDataDescription}/>
                    <form onSubmit={handleSubmit(submitHandler)} className={classes.userInfoForm}>
                        <div className={classes.formColumn}>
                            <CustomInput
                                label='username'
                                register={register('username', {required: true})}
                                error={errors.username}
                                placeholder='Придумайте логин для входа'
                                watchName={watch('username')}
                                type='text'
                                errors={errorsUsername}
                                isFullColorError={!!errors.username}
                                clearErrors={clearErrors}
                            />
                            <CustomInput
                                label='firstName'
                                register={register('firstName')}
                                error={errors.firstName}
                                placeholder='Имя'
                                watchName={watch('firstName')}
                                type='text'
                                clearErrors={clearErrors}
                            />
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
                                clearErrors={clearErrors}
                            />
                        </div>
                        <div className={classes.formColumn}>
                            <CustomInput
                                label='password'
                                register={register('password')}
                                error={errors.password}
                                placeholder='Пароль'
                                watchName={watch('password')}
                                type='password'
                                errors={errorsPassword}
                                isFullColorError={!!errors.password}
                                clearErrors={clearErrors}
                            />
                            <CustomInput
                                label='lastName'
                                register={register('lastName')}
                                error={errors.lastName}
                                placeholder='Фамилия'
                                watchName={watch('lastName')}
                                type='text'
                                clearErrors={clearErrors}
                            />

                            <CustomInput
                                label='email'
                                register={register('email')}
                                error={errors.email}
                                placeholder='E-mail'
                                watchName={watch('email')}
                                type='email'
                                clearErrors={clearErrors}
                            />
                        </div>
                    </form>
                </div>
                <div className={classes.bookedBook}>
                    <ProfileSectionHeader title={ProfileSectionText.bookedBookTitle}
                                          description={ProfileSectionText.bookedBookDescription}/>
                    <div className={classes.sectionContent}>
                        {user?.booking.book ?
                            <BookCard cardView={false} book={user.booking.book} searchValue=""
                                      bookingId={user.booking.id}/> :
                            <Plug error={false} title={PlugMessages.bookedBookTitle}/>}
                        <Plug error={true} title={PlugMessages.bookingExpiredTitle} description={PlugMessages.bookingExpiredDescription}/>
                    </div>
                </div>
                <div className={classes.handledBook}>
                    <ProfileSectionHeader title={ProfileSectionText.handledBookTitle}
                                          description={ProfileSectionText.handledBookDescription}/>
                    <div className={classes.sectionContent}>
                        {user?.delivery.book ?
                            <BookCard cardView={false} book={user.booking.book} searchValue=""
                                      bookingId={user.booking.id}/> :
                            <Plug error={false} title={PlugMessages.currentBookTitle}/>}
                    </div>
                </div>
                <div className={classes.booksHistory}>
                    <ProfileSectionHeader title={ProfileSectionText.historyTitle}
                                          description={ProfileSectionText.historyDescription}/>

                </div>
            </div>
        </div>
    )
};
