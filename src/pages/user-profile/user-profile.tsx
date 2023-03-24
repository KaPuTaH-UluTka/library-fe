import React from 'react';

import {ProfileSectionText} from '../../types/constants/constants';

import {AvatarUpload} from './avatar-upload/avatar-upload';
import {ProfileBooked} from './profile-booked/profile-booked';
import {ProfileForm} from './profile-form/profile-form';
import {ProfileHanded} from './profile-handed/profile-handed';
import {ProfileHistory} from './profile-history/profile-history';
import {ProfileSection} from './profile-section/profile-section';

import classes from './user-profile.module.scss';

export const UserProfile = () => (
        <div className={classes.profileWrapper}>
            <div className={classes.userProfile}>
                <AvatarUpload/>
                <ProfileSection title={ProfileSectionText.userDataTitle}
                                description={ProfileSectionText.userDataDescription}>
                    <ProfileForm/>
                </ProfileSection>
                <ProfileSection title={ProfileSectionText.bookedBookTitle}
                                description={ProfileSectionText.bookedBookDescription}>
                    <ProfileBooked/>
                </ProfileSection>
                <ProfileSection title={ProfileSectionText.handledBookTitle}
                                description={ProfileSectionText.handledBookDescription}>
                    <ProfileHanded />
                </ProfileSection>
                <ProfileSection title={ProfileSectionText.historyTitle}
                                description={ProfileSectionText.historyDescription}>
                    <ProfileHistory/>
                </ProfileSection>
            </div>
        </div>
    );
