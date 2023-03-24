import React from 'react';

import {Plug} from '../../../components/plug/plug';
import {PlugMessages} from '../../../types/constants/constants';
import {isDateExpired} from '../../../utils/date-utils';
import {BookCard} from '../../main/book-list/book-card/book-card';

import classes from './profile-handed.module.scss';
import {useAppSelector} from '../../../hooks/redux';

export const ProfileHanded = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const IsDateExpired = user && isDateExpired(user.delivery.dateHandedTo);

    return (
        <div className={classes.profileHanded}>
            {user?.delivery.book ?
                <BookCard cardView={false} book={user.delivery.book} searchValue=""
                          bookingId={user.booking.id} handedIssue={user.delivery.dateHandedTo}/> :
                <Plug title={PlugMessages.bookedBookTitle}/>}
            {IsDateExpired && <Plug error={true} title={PlugMessages.handedExpiredTitle}
                  description={PlugMessages.handedExpiredDescription}/> }
        </div>
    );
};
