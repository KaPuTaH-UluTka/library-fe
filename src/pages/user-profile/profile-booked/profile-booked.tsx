import React from 'react';

import {BookCard} from '../../../components/book-card/book-card';
import {Plug} from '../../../components/plug/plug';
import {useAppSelector} from '../../../hooks/redux';
import {DataTestId} from '../../../types/constants/data-test-id';
import {PlugMessages} from '../../../types/constants/messages';
import {isDateExpired} from '../../../utils/date-utils';

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
