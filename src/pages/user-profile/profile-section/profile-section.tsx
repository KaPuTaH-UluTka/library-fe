import React from 'react';

import classes from './profile-section.module.scss';

interface ProfileSectionHeaderProps {
    title: string,
    description: string,
    children: JSX.Element,
     dataTestId?: string
}

export const ProfileSection = ({title, description, children, dataTestId }: ProfileSectionHeaderProps) => (
        <div className={classes.profileSection} data-test-id={dataTestId}>
            <h2 className={classes.sectionTitle}>{title}</h2>
            <p className={classes.sectionDescription}>{description}</p>
                {children}
        </div>
    );
