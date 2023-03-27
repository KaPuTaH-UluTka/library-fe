import React, {useEffect, useState} from 'react';

import defaultAvatar from '../../../assets/header/defaultAvatar.jpg';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {API_URL} from '../../../store/api/api-url';
import {libraryApi} from '../../../store/api/library-api';
import {
    setAvatarUpdateResponseErrorTrue,
    setAvatarUpdateResponseSuccessTrue, setLoadingFalse, setLoadingTrue
} from '../../../store/reducers/request-status-reducer';

export const useAvatarUpload = () => {
    const {user} = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const [uploadedAvatar, setUploadedAvatar] = useState('');

    const [updateAvatar, {
        isError: isUpdateError, isSuccess: isUpdateSuccess,
        isLoading: isUpdateLoading, data: updateData
    }] = libraryApi.useUpdateAvatarMutation();

    const [uploadAvatar, {
        isError: isUploadError,
        reset,
        data: uploadData,
        isSuccess: isUploadSuccess,
        isLoading: isUploadLoading
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
        if (isUploadSuccess && !updateData) {
            if (user?.id && uploadData) {
                const avatarId = uploadData[0].id;

                updateAvatar({userId: user?.id, avatar: avatarId});

            }
        }
        if (isUpdateSuccess) {
            dispatch(setAvatarUpdateResponseSuccessTrue());
        }
        if (isUpdateError || isUploadError) {
            setUploadedAvatar('');
            reset();
            dispatch(setAvatarUpdateResponseErrorTrue());
        }
        if (isUploadLoading || isUpdateLoading) {
            dispatch(setLoadingTrue());
        } else {
            dispatch(setLoadingFalse());
        }
    }, [dispatch, isUpdateError, isUpdateLoading, isUpdateSuccess, isUploadError, isUploadLoading, isUploadSuccess, reset, updateAvatar, updateData, uploadData, user]);

    return {currentAvatar, avatarHandler, user}
}
