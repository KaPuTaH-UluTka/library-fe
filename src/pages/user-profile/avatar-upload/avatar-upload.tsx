import React from 'react';

import AddAvatarIcon from '../../../assets/profile-icons/addAvatar.svg';
import {DataTestId} from '../../../types/constants/data-test-id';

import {useAvatarUpload} from './use-avatar-upload';

import classes from './avatar-upload.module.scss';

export const AvatarUpload = () => {

    const {currentAvatar, avatarHandler, user} = useAvatarUpload();

    return (
        <div className={classes.userAvatarEdit} data-test-id={DataTestId.ProfileAvatar}>
            <div className={classes.userAvatarWrapper}>
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
