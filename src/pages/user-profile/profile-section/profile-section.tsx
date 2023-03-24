import React from 'react';

import classes from './profile-section.module.scss';

interface ProfileSectionHeaderProps {
    title: string,
    description: string,

    children: JSX.Element,
}

export const ProfileSection = ({title, description, children}: ProfileSectionHeaderProps) => (
        <div className={classes.profileSection}>
            <h2 className={classes.sectionTitle}>{title}</h2>
            <p className={classes.sectionDescription}>{description}</p>
                {children}
        </div>
    );
