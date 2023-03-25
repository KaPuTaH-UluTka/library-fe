import React from 'react';

import {Plug} from '../../../components/plug/plug';
import {useAppSelector} from '../../../hooks/redux';
import {DataTestId, PlugMessages} from '../../../types/constants/constants';
import {isDateExpired} from '../../../utils/date-utils';
import {BookCard} from '../../main/book-list/book-card/book-card';

import classes from './profile-booked.module.scss';

export const ProfileBooked = () => {

    const {user} = useAppSelector(state => state.userReducer);

    const IsDateExpired = user && isDateExpired(user.booking.dateOrder);

    return (
        <div className={classes.profileBooked}>
            {user?.booking.book ?
                <BookCard cardView={false} book={user.booking.book} searchValue=""
                          bookingId={user.booking.id}/> :
                <Plug title={PlugMessages.bookedBookTitle} dataTestId={DataTestId.EmptyBlueCard}/>}
            {IsDateExpired && <Plug error={true} title={PlugMessages.bookingExpiredTitle}
                  description={PlugMessages.bookingExpiredDescription} dataTestId={DataTestId.Expired}/> }
        </div>
    );
};
