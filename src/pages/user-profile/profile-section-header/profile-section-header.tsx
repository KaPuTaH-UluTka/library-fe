import React from 'react';

import classes from './profile-section-header.module.scss';

interface ProfileSectionHeaderProps {
    title: string,
    description: string,
}

export const ProfileSectionHeader = ({title, description}: ProfileSectionHeaderProps) => (
        <>
            <h2 className={classes.sectionTitle}>{title}</h2>
            <p className={classes.sectionDescription}>{description}</p>
        </>
    );
