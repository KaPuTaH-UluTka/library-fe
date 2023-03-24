import React, {useEffect, useState} from 'react';

import AddAvatarIcon from '../../../assets/addAvatar.svg';
import defaultAvatar from '../../../assets/header/defaultAvatar.jpg';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {API_URL} from '../../../store/api/api-url';
import {libraryApi} from '../../../store/api/library-api';
import {
    setAvatarUpdateResponseErrorTrue,
    setAvatarUpdateResponseSuccessTrue,
    setLoadingFalse,
    setLoadingTrue,
} from '../../../store/reducers/request-status-reducer';
import {DataTestId} from '../../../types/constants/constants';

import classes from './avatar-upload.module.scss';

export const AvatarUpload = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const [uploadedAvatar, setUploadedAvatar] = useState('');

    const [updateAvatar] = libraryApi.useUpdateAvatarMutation();

    const [uploadAvatar, {
        isError,
        reset,
        data,
        isSuccess,
        isLoading
    }] = libraryApi.useUploadAvatarMutation();

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

    useEffect(() => {
        if (isSuccess && user?.id && data) {
            const avatarId = data[0].id;

            updateAvatar({userId: user?.id, avatar: avatarId});
            dispatch(setAvatarUpdateResponseSuccessTrue());
        }
        if (isError) {
            setUploadedAvatar('');
            reset();
            dispatch(setAvatarUpdateResponseErrorTrue());
        }
        if (isLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    }, [data, dispatch, isError, isLoading, isSuccess, reset, updateAvatar, user?.id]);

    return (
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
    );
};
